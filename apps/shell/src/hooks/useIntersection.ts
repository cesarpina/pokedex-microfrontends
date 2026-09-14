import { useEffect, useRef } from 'react'

export function useIntersection<T extends HTMLElement>(
  onIntersect: () => void,
  options: IntersectionObserverInit & { enabled?: boolean } = {},
) {
  const ref = useRef<T>(null)
  const callback = useRef(onIntersect)
  const { enabled = true, root, rootMargin = '0px', threshold = 0 } = options

  useEffect(() => {
    callback.current = onIntersect
  })

  useEffect(() => {
    const element = ref.current
    if (!enabled || !element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) callback.current()
      },
      { root, rootMargin, threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [enabled, root, rootMargin, threshold])

  return ref
}
