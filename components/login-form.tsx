'use client'
import { signInEmail } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./ui/spinner";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string) || "";
    const senha = (formData.get("senha") as string) || "";

    try {
      setLoading(true);
      await signInEmail({ email, password: senha });
      setLoading(false);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("login error", err);
      setLoading(false);
      setError(err?.message || String(err) || "Erro inesperado no login");
    }

  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input name="email" />
      <Input name="senha" />
      <Button type="submit" disabled={loading}>
        {loading ? <Spinner /> : "Login"}
      </Button>
      {error && <div className="text-sm text-red-600">{error}</div>}
    </form>
  );
}