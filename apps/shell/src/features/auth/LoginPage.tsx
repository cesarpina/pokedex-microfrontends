import { ArrowRight, Lock, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { AmbientBackground } from '@/components/AmbientBackground'
import { Pokeball } from '@/components/Pokeball'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TextField } from '@/components/TextField'
import { useSessionStore } from './session-store'

const MIN_PASSWORD_LENGTH = 4

interface FormErrors {
  username?: string
  password?: string
}

function validate(username: string, password: string): FormErrors {
  const errors: FormErrors = {}
  if (!username.trim()) errors.username = 'Ingresa tu nombre de usuario.'
  if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`
  }
  return errors
}

export function LoginPage() {
  const user = useSessionStore((state) => state.user)
  const login = useSessionStore((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    const from = (location.state as { from?: string } | null)?.from ?? '/'
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const validation = validate(username, password)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    login(username.trim())
    navigate('/', { replace: true })
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10">
      <AmbientBackground />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative w-full max-w-md rounded-3xl p-8 shadow-card sm:p-10"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <motion.div
            initial={{ rotate: -90, scale: 0.6 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 }}
          >
            <Pokeball className="h-16 w-16" />
          </motion.div>
          <h1 className="font-display text-5xl font-extrabold tracking-[0.2em] uppercase">
            Pokedex
          </h1>
          <p className="text-sm text-muted">Inicia sesión para explorar la Pokédex.</p>
          <ThemeToggle label="Cambiar tema" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <TextField
            id="username"
            label="Usuario"
            icon={<User className="h-4 w-4" />}
            value={username}
            autoComplete="username"
            onChange={(event) => setUsername(event.target.value)}
            error={errors.username}
          />
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            icon={<Lock className="h-4 w-4" />}
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
          />

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-5 py-3.5 font-display text-lg font-bold text-canvas shadow-lg transition-shadow hover:shadow-glow disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? 'Ingresando…' : 'Ingresar'}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Demo: cualquier usuario y una contraseña de 4+ caracteres.
        </p>
      </motion.div>
    </div>
  )
}
