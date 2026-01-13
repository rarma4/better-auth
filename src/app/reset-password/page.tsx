import { Suspense } from "react";
import { ResetPasswordForm } from "./_components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Redefinir senha</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Digite sua nova senha abaixo
          </p>
        </div>
        <Suspense fallback={<div className="text-center">Carregando...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
