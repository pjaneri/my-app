import RegisterForm from "@/components/register-form";

export const metadata = {
  title: "Criar conta",
};

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Criar conta</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
