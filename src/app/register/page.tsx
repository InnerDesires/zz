'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram } from 'lucide-react'
import { Icons } from "@/components/icons"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const t = useTranslations('Register')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  if (session) {
    redirect("/")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають')
      return
    }

    try {
      // First, create the user account using the correct API route
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        // If registration is successful, sign in the user using signIn
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setError(result.error)
        } else {
          router.push('/')
        }
      } else {
        const data = await res.json()
        setError(data.message || 'Помилка реєстрації')
      }
    } catch (err) {
      console.error('Register error:', err)
      setError('Щось пішло не так. Спробуйте ще раз.')
    }
  }

  const handleOAuthSignIn = async (provider: string) => {
    try {
      await signIn(provider.toLowerCase(), {
        callbackUrl: '/',
      })
    } catch (error) {
      console.error('OAuth error:', error)
      setError('Помилка автентифікації через соціальну мережу')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <Button
            onClick={() => handleOAuthSignIn('Google')}
            className="w-full bg-[#EA4335] text-white hover:bg-[#EA4335]/80"
          >
            {t('continueWith', { provider: 'Google' })}
            <Icons.google />
          </Button>
          <Button
            onClick={() => handleOAuthSignIn('Facebook')}
            className="w-full bg-[#3b5998] text-white hover:bg-[#3b5998]/80"
            disabled={true}
          >
            {t('continueWith', { provider: 'Facebook' })}
            <Facebook />
          </Button>
          <Button
            onClick={() => handleOAuthSignIn('Instagram')}
            className="w-full bg-[#C13584] text-white hover:bg-[#833AB4]/80"
            disabled={true}
          >
            {t('continueWith', { provider: 'Instagram' })}
            <Instagram />
          </Button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t('orRegisterWith')}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded">
            {t(`errors.${error}`) || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email')}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {t('confirmPassword')}
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            {t('submit')}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="w-full text-sm text-center text-gray-500">
          {t('haveAccount')} <Link href="/login" className="text-blue-500">{t('signIn')}</Link>
        </p>
      </CardFooter>
    </Card>
  )
}

