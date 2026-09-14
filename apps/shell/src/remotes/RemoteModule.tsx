import { PlugZap, RefreshCw } from 'lucide-react'
import { Component, lazy, Suspense, useState, type ComponentType, type ReactNode } from 'react'

interface RemoteModuleProps<P extends object> {
  load: () => Promise<{ default: ComponentType<P> }>
  name: string
  fallback: ReactNode
  props: P
}

export function RemoteModule<P extends object>({
  load,
  name,
  fallback,
  props,
}: RemoteModuleProps<P>) {
  const [attempt, setAttempt] = useState(0)
  const [Remote] = useState(() => lazy(load))

  return (
    <RemoteBoundary key={attempt} name={name} onRetry={() => setAttempt((value) => value + 1)}>
      <Suspense fallback={fallback}>
        <Remote {...props} />
      </Suspense>
    </RemoteBoundary>
  )
}

interface RemoteBoundaryProps {
  name: string
  onRetry: () => void
  children: ReactNode
}

interface RemoteBoundaryState {
  failed: boolean
}

class RemoteBoundary extends Component<RemoteBoundaryProps, RemoteBoundaryState> {
  state: RemoteBoundaryState = { failed: false }

  static getDerivedStateFromError(): RemoteBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error) {
    console.error(`No se pudo cargar el microfrontend "${this.props.name}"`, error)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-3 rounded-3xl bg-surface p-10 text-center shadow-card ring-1 ring-line"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-accent-2">
          <PlugZap className="h-7 w-7" />
        </span>
        <p className="font-display text-xl font-bold">Módulo no disponible</p>
        <p className="max-w-sm text-sm text-muted">
          No se pudo conectar con el microfrontend <strong>{this.props.name}</strong>. Verifica que
          esté levantado e inténtalo de nuevo.
        </p>
        <button
          type="button"
          onClick={this.props.onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-canvas transition-transform hover:-translate-y-0.5"
        >
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </button>
      </div>
    )
  }
}
