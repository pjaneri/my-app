'use client'
import { signUpEmail } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./ui/spinner";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const senha = (formData.get("senha") as string) || "";

    try {
      setLoading(true);
      await signUpEmail({ name, email, password: senha });
      setLoading(false);
      router.push("/login");
    } catch (err: any) {
      console.error("register error", err);
      setLoading(false);
      setError(err?.message || String(err) || "Erro inesperado no registro");
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <Input name="name" />
      <Input name="email" />
      <Input name="senha" />
      <Button type="submit" disabled={loading}>
        {loading ? <Spinner /> : "Criar conta"}
      </Button>
      {error && <div className="text-sm text-red-600">{error}</div>}
    </form>
  );
}