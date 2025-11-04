import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";
import { BASE_API } from "@/lib/config";
import puppeteer from "puppeteer";

function renderHtml(data: any, date: string) {
  const ingresos = data.ingresos || [];
  const egresos = data.egresos || [];
    const total_ingresos = data.total_ingresos ?? 0;
    const total_egresos = data.total_egresos ?? 0;
    const balance = data.balance ?? 0;

    const ingresosRows = ingresos
      .map(
        (i: any) => `
        <tr>
          <td class="td">${i.paciente || "-"}</td>
          <td class="td">${i.medico || "-"}</td>
          <td class="td right">S/ ${Number(i.monto || 0).toFixed(2)}</td>
          <td class="td">${i.metodo || "-"}</td>
        </tr>`
      )
      .join("");

  const egresosRows = egresos
      .map(
        (e: any) => `
        <tr>
          <td class="td">${e.medico || "-"}</td>
          <td class="td right">S/ ${Number(e.monto || 0).toFixed(2)}</td>
        </tr>`
      )
      .join("");

    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Cierre de caja - ${date}</title>
        <style>
          :root{--accent:#0f9d58;--muted:#6b7280;--border:#e5e7eb}
          body{font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;margin:28px;color:#111;background:white}
          .header{display:flex;align-items:center;gap:16px}
          .brand{width:56px;height:56px;border-radius:8px;background:linear-gradient(135deg,var(--accent),#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
          h1{font-size:28px;margin:0;color:var(--accent)}
          .meta{margin-top:8px;color:var(--muted);font-size:13px}
          .card{margin-top:18px;padding:14px;border-radius:8px;border:1px solid var(--border);background:#fbfbfd;display:flex;gap:24px}
          .summary-item{flex:1}
          .summary-item b{display:block;font-size:14px}
          table{border-collapse:collapse;width:100%;margin-top:16px;font-size:13px}
          thead th{background:#f8fafc;padding:10px 12px;text-align:left;border-bottom:1px solid var(--border);color:#111}
          tbody tr:nth-child(odd){background:#ffffff}
          tbody tr:nth-child(even){background:#fbfbfb}
          .td{padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:middle}
          .right{text-align:right}
          h2{margin-top:22px;margin-bottom:8px;font-size:18px}
          .footer{margin-top:24px;color:var(--muted);font-size:12px;text-align:right}
          /* responsive small tweaks */
          @media print{ body{margin:12px} .card{box-shadow:none} }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">C</div>
          <div>
            <h1>Cierre de caja</h1>
            <div class="meta">Fecha: <strong>${date}</strong></div>
          </div>
        </div>

        <div class="card">
          <div class="summary-item">
            <div style="color:var(--muted);font-size:12px">Total ingresos</div>
            <div style="font-size:16px;font-weight:600">S/ ${Number(total_ingresos).toFixed(2)}</div>
          </div>
          <div class="summary-item">
            <div style="color:var(--muted);font-size:12px">Total egresos</div>
            <div style="font-size:16px;font-weight:600">S/ ${Number(total_egresos).toFixed(2)}</div>
          </div>
          <div class="summary-item">
            <div style="color:var(--muted);font-size:12px">Balance</div>
            <div style="font-size:16px;font-weight:600;color:${balance < 0 ? '#dc2626' : '#0f9d58'}">S/ ${Number(balance).toFixed(2)}</div>
          </div>
        </div>

        <h2>Ingresos</h2>
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th class="right">Monto</th>
              <th>Método</th>
            </tr>
          </thead>
          <tbody>
            ${ingresosRows || '<tr><td class="td" colspan="4" style="text-align:center;padding:18px">No hay ingresos</td></tr>'}
          </tbody>
        </table>

        <h2>Egresos</h2>
        <table>
          <thead>
            <tr>
              <th>Médico</th>
              <th class="right">Monto</th>
            </tr>
          </thead>
          <tbody>
            ${egresosRows || '<tr><td class="td" colspan="2" style="text-align:center;padding:18px">No hay egresos</td></tr>'}
          </tbody>
        </table>

        <div class="footer">Reporte generado: ${new Date().toLocaleString()}</div>
      </body>
    </html>
    `;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  const apiPath = `/api/cierre-de-caja?page=1&date=${encodeURIComponent(date)}`;
      let data: any = null;
      try {
        const res = await authFetchWithCookies(apiPath);
        try {

          const text = await (res as any).text();
          if (text && text.trim() !== "") {
            try {
              data = JSON.parse(text);
            } catch (err) {
              console.error("Error parsing JSON text from authFetchWithCookies:", err);
              data = { ingresos: [], egresos: [], total_ingresos: 0, total_egresos: 0, balance: 0 };
            }
          } else {
            try {
              const cookieHeader = req.headers.get("cookie") || "";
              const backendUrl = `${BASE_API}${apiPath}`;
              const backendRes = await fetch(backendUrl, {
                headers: {
                  Cookie: cookieHeader,
                  Accept: "application/json",
                },
                cache: "no-store",
              });

              if (backendRes.ok) {
                data = await backendRes.json();
              } else {
                console.error("Fallback backend returned non-OK status:", backendRes.status);
                data = { ingresos: [], egresos: [], total_ingresos: 0, total_egresos: 0, balance: 0 };
              }
            } catch (err) {
              console.error("Error en fallback directo al backend:", err);
              data = { ingresos: [], egresos: [], total_ingresos: 0, total_egresos: 0, balance: 0 };
            }
          }
        } catch (err) {
          console.error("No se pudo leer body desde authFetchWithCookies:", err);
          data = { ingresos: [], egresos: [], total_ingresos: 0, total_egresos: 0, balance: 0 };
        }
      } catch (err) {
        console.error("Error llamando authFetchWithCookies para cierre-de-caja:", err);
        data = { ingresos: [], egresos: [], total_ingresos: 0, total_egresos: 0, balance: 0 };
      }


    if (!data.ingresos && data.data) {
      data = data.data;
    }
    if (!data.ingresos && data.results) {
      data = data.results;
    }

    // Si todavía no hay ingresos, intentar buscar arrays útiles dentro del objeto
    if ((!data.ingresos || data.ingresos.length === 0) && typeof data === "object") {
      const arrays = Object.entries(data).filter(([, v]) => Array.isArray(v));
      const found: any = { ingresos: [], egresos: [] };
      for (const [key, val] of arrays) {
        const arr = val as any[];
        if (arr.length === 0) continue;
        const sample = arr[0];
        if (sample && ("paciente" in sample || "metodo" in sample || "monto" in sample)) {
          if (!found.ingresos.length) found.ingresos = arr;
        } else if (sample && ("medico" in sample || "monto" in sample)) {
          if (!found.egresos.length) found.egresos = arr;
        }
      }
      // merge found arrays if any
      if (found.ingresos.length) data.ingresos = found.ingresos;
      if (found.egresos.length) data.egresos = found.egresos;
    }

    // Generar HTML simple para el PDF
    const html = renderHtml(data, date);

    // Lanzar puppeteer y generar PDF
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", printBackground: true, margin: { top: 20, bottom: 20, left: 20, right: 20 } });
    await browser.close();

    // Convert Buffer (Uint8Array) to ArrayBuffer slice compatible with Response body
    const arrayBuffer = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);

    return new NextResponse(arrayBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=cierre-${date}.pdf`,
      },
    });
  } catch (error: any) {
    console.error("Error generando PDF cierre de caja:", error);
    return NextResponse.json({ detail: "Error al generar PDF" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const date = body.date || new Date().toISOString().split("T")[0];
    const data = body.data || { ingresos: [], egresos: [], total_ingresos: 0, total_egresos: 0, balance: 0 };

    // Generar HTML con los datos recibidos del cliente
    const html = renderHtml(data, date);

    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", printBackground: true, margin: { top: 20, bottom: 20, left: 20, right: 20 } });
    await browser.close();

    const arrayBuffer = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);

    return new NextResponse(arrayBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=cierre-${date}.pdf`,
      },
    });
  } catch (error: any) {
    console.error("Error generando PDF (POST):", error);
    return NextResponse.json({ detail: "Error al generar PDF" }, { status: 500 });
  }
}
