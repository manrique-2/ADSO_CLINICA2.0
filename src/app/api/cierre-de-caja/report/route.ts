import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";
import puppeteer, { LaunchOptions, Page, Browser, Target, ConsoleMessage } from "puppeteer";

function renderHtml(data: any, date: string): string {
  const ingresos = data.ingresos || [];
  const egresos = data.egresos || [];
  const total_ingresos = data.total_ingresos ?? 0;
  const total_egresos = data.total_egresos ?? 0;
  const balance = data.balance ?? 0;

  const ingresosRows = ingresos.map((i: any) => `
    <tr>
      <td class="td">${i.paciente || "-"}</td>
      <td class="td">${i.medico || "-"}</td>
      <td class="td right">S/ ${Number(i.monto || 0).toFixed(2)}</td>
      <td class="td">${i.metodo || "-"}</td>
    </tr>
  `).join("");

  const egresosRows = egresos.map((e: any) => `
    <tr>
      <td class="td">${e.medico || "-"}</td>
      <td class="td right">S/ ${Number(e.monto || 0).toFixed(2)}</td>
    </tr>
  `).join("");

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

const PUPPETEER_CONFIG: LaunchOptions = {
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium",
  headless: true,
  // dumpio redirige stdout/stderr de Chromium a los logs del proceso Node.
  // En producción esto genera mucho ruido; lo desactivamos para logs más limpios.
  dumpio: false,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--disable-gpu",
  ],
  timeout: 60000,
};

const PAGE_OPTIONS: Parameters<Page["setContent"]>[1] = {
  waitUntil: "networkidle0",
  timeout: 60000,
};

async function generatePDF(data: any, date: string) {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch(PUPPETEER_CONFIG);
  } catch (err) {
    console.error("Error launching puppeteer:", err);
    throw err;
  }

  if (!browser) throw new Error("Browser failed to launch");

  // Mejor logging para detectar desconexiones/crashes
  browser.on("disconnected", () => console.error("Puppeteer browser disconnected"));
  browser.on("targetdestroyed", (t: Target) => console.warn("Target destroyed:", t && typeof t.url === "function" ? t.url() : t));

  const page = await browser.newPage();

  // No reenviamos todos los console.log del navegador en producción para evitar ruido.
  // Si necesitas debug, activa dumpio o agrega un LOG_DEBUG env var para habilitar esta sección.
  page.on("error", (err: Error | unknown) => console.error("Page error:", err));

  try {
    await page.setContent(renderHtml(data, date), PAGE_OPTIONS);
    // Espera corta para asegurar que estilos/imagenes se apliquen
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 20, bottom: 20, left: 20, right: 20 },
    });

    return pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);
  } finally {
    try {
      await browser.close();
    } catch (e) {
      console.error("Error closing browser:", e);
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const apiPath = `/api/cierre-de-caja?page=1&date=${encodeURIComponent(date)}`;

    let data: any;
    try {
      const res = await authFetchWithCookies(apiPath);
      const text = await (res as any).text();
      data = text.trim() ? JSON.parse(text) : {};
    } catch {
      data = {};
    }

    const pdfBuffer = await generatePDF(data, date);
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=cierre-${date}.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generando PDF (GET):", error);
    return NextResponse.json({ detail: "Error al generar PDF" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const date = body.date || new Date().toISOString().split("T")[0];
    const data = body.data || {};

    const pdfBuffer = await generatePDF(data, date);
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=cierre-${date}.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generando PDF (POST):", error);
    return NextResponse.json({ detail: "Error al generar PDF" }, { status: 500 });
  }
}
