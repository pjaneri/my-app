// Create the Better Auth client lazily and via dynamic import so that
// the `better-auth/react` package is not evaluated at module import time
// (which can cause errors during server-side rendering if a relative
// base URL is used).
/**
 * Lightweight client helpers that call our internal Next API proxy
 * directly using fetch. This avoids importing the `better-auth/react`
 * package in the client bundle and bypasses baseURL parsing issues.
 */
type SignUpPayload = { name: string; email: string; password: string };
type SignInPayload = { email: string; password: string };

async function safeFetch(path: string, body?: any) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = origin ? `${origin}${path}` : path;
    const res = await fetch(url, {
        method: body ? "POST" : "GET",
        headers: { "content-type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
    });
    const text = await res.text();
    let json: any = null;
    try {
        json = text ? JSON.parse(text) : null;
    } catch (e) {
        // not json
    }
    if (!res.ok) {
        const err = new Error(json?.error?.message || text || `HTTP ${res.status}`);
        (err as any).status = res.status;
        (err as any).response = json;
        throw err;
    }
    return json ?? text;
}

export async function signUpEmail(payload: SignUpPayload) {
    return safeFetch("/api/auth/sign-up/email", payload);
}

export async function signInEmail(payload: SignInPayload) {
    return safeFetch("/api/auth/sign-in/email", payload);
}

export default { signUpEmail, signInEmail };