'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

export default function LoginForm() {
  const { status } = useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (result?.error) {
      setErrorMessage(result.error)
      console.log('SignIn Error:', result.error)
    } else {
      router.push('/dashboard')
      console.log('SignIn Result:', result)
    }
  }

  const isFormValid = email && password

  return (
    <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl text-neutral-900 font-bold mb-6 text-center">Faça o login</h2>
      <p className="text-sm text-balance text-gray-600 mb-6 text-center">
        Insira abaixo suas credenciais para acessar sua conta
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm bg-white text-neutral-900 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Digite seu email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-sm bg-white text-neutral-900 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || status === "loading" || !isFormValid}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          {loading || status === "loading" ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {errorMessage === "Configuration"
            ? "E-mail ou Senha incorretos."
            : errorMessage}
        </p>
      )}
    </div>
  )
}