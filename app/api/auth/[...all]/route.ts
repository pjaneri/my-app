import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth.handler);

export async function GET(request: Request) {
	try {
		console.log("[proxy] GET", request.url);
	} catch (e) {
		/* ignore */
	}
	try {
		return await handler.GET(request);
	} catch (err: any) {
		console.error('[proxy] GET error', err);
		const body = { message: err?.message || 'Internal proxy error', stack: err?.stack };
		return new Response(JSON.stringify(body), { status: 500, headers: { 'Content-Type': 'application/json' } });
	}
}

export async function POST(request: Request) {
	try {
		console.log("[proxy] POST", request.url);
	} catch (e) {
		/* ignore */
	}
	try {
		return await handler.POST(request);
	} catch (err: any) {
		console.error('[proxy] POST error', err);
		const body = { message: err?.message || 'Internal proxy error', stack: err?.stack };
		return new Response(JSON.stringify(body), { status: 500, headers: { 'Content-Type': 'application/json' } });
	}
}