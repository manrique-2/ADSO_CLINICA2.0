import { NextRequest, NextResponse } from "next/server"
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies"
import { BASE_API } from "@/lib/config";



export async function POST(request: NextRequest) { 
	// Validate input early
	const body = await request.json().catch(() => ({}));
	const { email, password } = body;

	if (!email || !password) {
		return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
	}

	console.log("🟢 Enviando a backend:", { email, password });

	let res: Response;
	try {
		res = await fetch(`${BASE_API}/api/login/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
	} catch (err: any) {
		// Network / DNS / connection errors
		console.error("🔴 Network error when calling backend:", err);
		return NextResponse.json({ error: `Network error: ${err?.message || String(err)}` }, { status: 502 });
	}

	console.log("🔴 Código de respuesta:", res.status);

	if (!res.ok) {
		// Try to parse a helpful message from the backend
		let message = `Request failed with status ${res.status}`;
		try {
			const errData = await res.json().catch(() => null);
			if (errData) {
				if (typeof errData === "string") {
					message = errData;
				} else if (errData.detail) {
					message = String(errData.detail);
				} else if (errData.error) {
					message = String(errData.error);
				} else if (errData.message) {
					message = String(errData.message);
				} else if (errData.non_field_errors) {
					message = Array.isArray(errData.non_field_errors) ? errData.non_field_errors.join(" ") : String(errData.non_field_errors);
				} else {
					// Build a flattened list of field errors if present
					const parts: string[] = [];
					for (const key in errData) {
						if (Object.prototype.hasOwnProperty.call(errData, key)) {
							const val = errData[key];
							if (Array.isArray(val)) parts.push(`${key}: ${val.join(" ")}`);
							else parts.push(`${key}: ${String(val)}`);
						}
					}
					if (parts.length) message = parts.join(" | ");
				}
			} else {
				// If JSON parsing failed, try plain text
				const text = await res.text().catch(() => "");
				if (text) message = text;
				else if (res.statusText) message = res.statusText;
			}
		} catch (parseErr) {
			const text = await res.text().catch(() => "");
			if (text) message = text;
		}

		return NextResponse.json({ error: message }, { status: res.status });
	}

	// Successful response
	const data = await res.json().catch(() => ({}));

        // Create response
    const response = NextResponse.json({ success: true });

    // Set cookies onto the response
    setAccessToken(response, data.access);
    setRefreshToken(response, data.refresh);

    return response;
}
