'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./ui/spinner";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const senha = (formData.get("senha") as string) || "";

    authClient.signUp.email(
      {
        name: name,
        email: email,
        password: senha,
      },
      {
        onSuccess: () => router.push("/login"),
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError: (ctx: any) => setError(ctx?.error?.message || "Erro no cadastro"),
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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