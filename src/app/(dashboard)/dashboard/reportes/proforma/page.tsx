"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

// Tratamiento resumido para la proforma
type TreatmentLite = {
  id: number;
  name: string;
  price: number;
};

type SelectedTreatment = TreatmentLite & {
  quantity: number;
};

export default function ProformaPage() {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();

  // Lista completa de tratamientos (desde la API)
  const [allTreatments, setAllTreatments] = useState<TreatmentLite[]>([]);
  const [loadingTreatments, setLoadingTreatments] = useState(false);
  const [errorTreatments, setErrorTreatments] = useState<string | null>(null);

  // Estado de la proforma
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SelectedTreatment[]>([]);

  // 🔹 1. Cargar tratamientos desde /api/tratamientos una sola vez
  useEffect(() => {
    const load = async () => {
      setLoadingTreatments(true);
      setErrorTreatments(null);

      try {
        // Traemos la primera página de tratamientos
        const res = await fetchWithAuthRedirect("/api/tratamientos?page=1");
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const json = await res.json();

        const mapped: TreatmentLite[] = (json.results ?? []).map((t: any) => ({
          id: t.id,
          name: t.nombre,
          price: Number(t.precioBase ?? 0),
        }));

        setAllTreatments(mapped);
      } catch (err) {
        console.error("❌ Error cargando tratamientos para proforma:", err);
        setErrorTreatments(
          "No se pudo cargar la lista de tratamientos. Revisa tu sesión o conexión."
        );
      } finally {
        setLoadingTreatments(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo al montar

  // 🔹 2. Filtrar tratamientos según lo que escribes en el buscador
  const filteredTreatments = useMemo(
    () =>
      allTreatments.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      ),
    [allTreatments, search]
  );

  // 🔹 3. Agregar tratamiento a la “cajita” de la proforma
  const handleAdd = (t: TreatmentLite) => {
    setSelected((prev) => {
      const existing = prev.find((p) => p.id === t.id);
      if (existing) {
        return prev.map((p) =>
          p.id === t.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...t, quantity: 1 }];
    });
  };

  // 🔹 4. Cambiar cantidad
  const handleChangeQty = (id: number, qty: number) => {
    if (qty <= 0) {
      setSelected((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    setSelected((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  // 🔹 5. Total general
  const total = useMemo(
    () => selected.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [selected]
  );

  // 🔹 6. Generar PDF con jsPDF
  const handleGeneratePdf = () => {
    if (selected.length === 0) return;

    const doc = new jsPDF();

    // Título
    doc.setFontSize(16);
    doc.text("Proforma de tratamientos", 10, 20);

    // Fecha
    doc.setFontSize(11);
    const fecha = new Date().toLocaleDateString();
    doc.text(`Fecha: ${fecha}`, 10, 28);

    // Encabezados de tabla
    let y = 40;
    doc.setFontSize(12);
    doc.text("Tratamiento", 10, y);
    doc.text("Cant.", 120, y);
    doc.text("Monto", 160, y, { align: "right" });

    y += 8;

    // Filas
    selected.forEach((item) => {
      const totalItem = item.quantity * item.price;

      doc.text(item.name, 10, y);
      doc.text(String(item.quantity), 120, y);
      doc.text(`S/ ${totalItem.toFixed(2)}`, 160, y, { align: "right" });

      y += 7;
    });

    // Total general
    y += 5;
    doc.setFontSize(13);
    doc.text(`Total: S/ ${total.toFixed(2)}`, 160, y, { align: "right" });

    // Descargar el archivo
    doc.save("proforma-tratamientos.pdf");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Proforma / Presupuesto</h1>

      {/* BUSCADOR */}
      <section className="space-y-2 max-w-xl">
        <label className="block text-sm font-medium">
          Buscar tratamiento
        </label>
        <input
          className="border rounded px-2 py-1 w-full"
          placeholder="Escribe el nombre del tratamiento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loadingTreatments && (
          <p className="text-sm text-gray-500 mt-1">
            Cargando tratamientos...
          </p>
        )}
        {errorTreatments && (
          <p className="text-sm text-red-500 mt-1">{errorTreatments}</p>
        )}

        {/* Lista de sugerencias debajo del buscador */}
        {search && !loadingTreatments && filteredTreatments.length > 0 && (
          <ul className="border rounded bg-white divide-y mt-2">
            {filteredTreatments.map((t) => (
              <li
                key={t.id}
                className="px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 flex justify-between"
                onClick={() => handleAdd(t)}
              >
                <span>{t.name}</span>
                <span>S/ {t.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        {search && !loadingTreatments && filteredTreatments.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">
            No se encontraron tratamientos con ese nombre.
          </p>
        )}
      </section>

      {/* TABLA DE LA PROFORMA */}
      <section className="space-y-2">
        <h2 className="font-semibold">Tratamientos en la proforma</h2>

        {selected.length === 0 ? (
          <p className="text-sm text-gray-500">
            Aún no has agregado tratamientos.
          </p>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">
                  Nombre del tratamiento
                </th>
                <th className="border px-2 py-1 text-center">Cantidad</th>
                <th className="border px-2 py-1 text-right">Monto total</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((item) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1 text-center">
                    <input
                      type="number"
                      min={1}
                      className="w-16 border rounded px-1 py-0.5 text-center"
                      value={item.quantity}
                      onChange={(e) =>
                        handleChangeQty(item.id, Number(e.target.value) || 0)
                      }
                    />
                  </td>
                  <td className="border px-2 py-1 text-right">
                    S/ {(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td className="border px-2 py-1" colSpan={2}>
                  Total
                </td>
                <td className="border px-2 py-1 text-right">
                  S/ {total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </section>

      <button
        onClick={handleGeneratePdf}
        disabled={selected.length === 0}
        className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        Generar PDF
      </button>
    </div>
  );
}
