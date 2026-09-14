export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }

  get isNotFound() {
    return this.status === 404
  }
}

export async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${POKEAPI_BASE_URL}${path}`, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, `Request to ${path} failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}
