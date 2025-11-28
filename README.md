# Turnero Frontend (Angular 20, zoneless)

SPA para reservar turnos sobre la API NestJS. Standalone, sin zone.js, usando signals, PrimeNG 20 y PrimeFlex 4.

## Requisitos
- Node 20.19+ (Angular CLI 20 lo exige).
- npm 10+.
- Backend corriendo en `http://localhost:3000` (configurable en `src/environments/environment*.ts` con `apiBaseUrl`).

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm start
```
Navegar a `http://localhost:4200/`.

## Build
```bash
npm run build
```
Salida en `dist/frontend`. Usa reemplazo de `environment.ts` por `environment.production.ts`.

## Estructura relevante
- `src/app/components/*`: componentes standalone (login, shell, recursos, recurso-detalle, mis-turnos) con HTML/SCSS separados.
- `src/app/auth`: servicio de autenticación, guard e interceptor JWT.
- `src/app/services`: acceso a API (recursos, turnos).
- `src/app/core`: config (`api.config.ts`), modelos y entorno zoneless.
- `src/environments`: `environment.ts` y `environment.production.ts` con `apiBaseUrl`.

## Flujo principal
1) Login (`/login`) → guarda `access_token` y usuario en `AuthService`.
2) Navegación protegida por `authGuard` hacia `/recursos`, `/recursos/:id` y `/mis-turnos`.
3) Recursos: lista con filtros por tipo y cards.
4) Detalle de recurso: elegir fecha, ver slots disponibles (`/recursos/:id/slots-disponibles`), reservar turno.
5) Mis turnos: tabla con cancelación de turno.

## Estilo/UI
- Tema PrimeNG `aura-light-blue`, PrimeFlex y PrimeIcons agregados en `angular.json`.
- PrimeFlex se usa directamente en las plantillas (clases utilitarias), SCSS por componente para ajustes opcionales.
