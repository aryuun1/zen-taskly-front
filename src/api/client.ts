const BASE_URL = '/api'

function getToken(): string | null {
  return localStorage.getItem('token')
}

type RequestBody = Record<string, unknown>

async function request<T>(
  method: string,
  path: string,
  body?: RequestBody,
  auth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data as T
}

export const api = {
  get: <T>(path: string, auth = true) => request<T>('GET', path, undefined, auth),
  post: <T>(path: string, body: RequestBody, auth = false) => request<T>('POST', path, body, auth),
  put: <T>(path: string, body: RequestBody, auth = true) => request<T>('PUT', path, body, auth),
  delete: <T>(path: string, auth = true) => request<T>('DELETE', path, undefined, auth),
}
