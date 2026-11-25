# PC Frontend · Simulacro 04 · Versión mínima

Misma solución que `pc-04-prestamo-juegos-frontend`, recortada a lo indispensable para la rúbrica de 12 puntos: sin AuthContext, hooks ni componentes decorativos.

## Cómo correrlo

```bash
# backend (desde simulacros-pc-frontend-2026-2)
docker compose up --build -d prestamo-juegos

# frontend
npm install
npm run dev   # abrir http://localhost:5173 (no 127.0.0.1: CORS)
```

Cuenta de prueba: `estudiante@example.test` / `Practica123`.

## Archivos

```
src/
├── main.tsx
├── index.css                 # @import "tailwindcss";
├── api.ts                    # axios, Bearer, 401 → /login, tipos y apiError
├── App.tsx                   # rutas + guard con botón de cerrar sesión
├── components/
│   ├── GameCard.tsx          # 4 campos; se usa en el listado y en el detalle
│   └── Pagination.tsx        # Anterior · Página X de Y · Siguiente
└── pages/
    ├── RegisterPage.tsx      # /register (validación con atributos nativos)
    ├── LoginPage.tsx         # /login
    ├── GamesPage.tsx         # /games  (useEffect con [page])
    └── GameDetailPage.tsx    # /games/:id (validación de días + préstamo + OUT_OF_STOCK)
```

## Dónde está cada criterio

| Rúbrica | Archivo |
|---|---|
| 1.1 Registro | `RegisterPage.tsx` |
| 1.2 Login, token y Bearer | `LoginPage.tsx`, `api.ts` |
| 1.3 Guard y cierre de sesión | `App.tsx` (`ProtectedLayout`) |
| 2.x Listado, paginación, carga y vacío | `GamesPage.tsx`, `Pagination.tsx`, `GameCard.tsx` |
| 3.x Detalle, validación y operación | `GameDetailPage.tsx` |
| 4.1 `401` | `api.ts` (interceptor de response, excluye `/auth/`) |
| 4.2 `OUT_OF_STOCK` | `GameDetailPage.tsx` |
| 4.3 Props tipadas y Tailwind | `GameCard.tsx`, `Pagination.tsx` |
