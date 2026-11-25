import axios from 'axios';

// Tipos copiados de API.md
export interface Game {
  id: number;
  name: string;
  category: string;
  recommendedPlayers: number;
  availableUnits: number;
}

export interface Page<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export const api = axios.create({ baseURL: 'http://localhost:3004' });

// Bearer en las rutas de negocio (1.2c). No se manda a /auth/: si queda un token
// vencido en localStorage, el backend rechazaría con 401 el login y el registro
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && !config.url?.includes('/auth/')) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 en una ruta de negocio: limpia la sesión y vuelve al login (4.1).
// El 401 del login (credenciales incorrectas) se excluye para que LoginPage muestre su mensaje.
api.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && !error.config?.url?.includes('/auth/')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Los errores de la API llegan como { code, message }
export function apiError(err: unknown) {
  if (axios.isAxiosError<{ code: string; message: string }>(err) && err.response) {
    return { code: err.response.data?.code, message: err.response.data?.message ?? 'Ocurrió un error.' };
  }
  return { code: undefined, message: 'No se pudo conectar con el servidor.' };
}
