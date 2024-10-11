"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, telephone }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const fieldErrors: { [key: string]: string } = {};
          data.errors.forEach((error: { field: string; message: string }) => {
            fieldErrors[error.field] = error.message;
          });
          setErrors(fieldErrors);
        } else {
          throw new Error(data.error || "Failed to register");
        }
        return;
      }

      // Automatically log the user in after registration
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/dashboard");
    } catch (error: any) {
      setErrors({ general: error.message || "An unexpected error occurred" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsPending(true);

    await handleSignUp();

    setIsPending(false);
  };

  const isFormValid = name && email && telephone && password && acceptTerms;

  return (
    <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center text-neutral-900">
        Crie a sua conta
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Insira abaixo suas informações para criar sua conta
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-neutral-900 text-sm px-3 py-2 border bg-white border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-neutral-900 text-sm px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telefone
          </label>
          <input
            id="telephone"
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full text-neutral-900 text-sm px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-neutral-900 text-sm px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="h-4 w-4 checkbox border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block leading-4 text-sm text-gray-900">
            Aceito os termos e condições. {" "}
            <span className="underline">
              {" "}
              Você concorda com nossos termos e condições de uso
            </span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isPending || !isFormValid}
          className="w-full btn bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {errors.general && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {errors.general}
        </p>
      )}
    </div>
  );
}
