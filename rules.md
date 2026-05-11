# Reglas de Arquitectura – Frontend DDD con Bounded Contexts

> Basado en el proyecto `learning-center` (Vue 3 + Pinia + Vue Router + PrimeVue + Axios).
> Aplicable a cualquier proyecto frontend que quiera adoptar este patrón.

---

## ¿Qué tipo de arquitectura es?

**Frontend DDD (Domain-Driven Design) con Bounded Contexts por módulo.**

Es una adaptación del patrón clásico de Eric Evans para el frontend. Cada módulo de negocio tiene sus propias 4 capas aisladas. A diferencia de una arquitectura por tipo de archivo (`components/`, `services/`, `stores/`), aquí **el dominio de negocio dicta la estructura**, no la tecnología.

---

## Estructura de carpetas

### Top-level en `src/`

```
src/
├── {bounded-context-1}/
├── {bounded-context-2}/
├── ...
├── shared/
├── locales/
├── app.vue
├── main.js
├── router.js
├── pinia.js
├── i18n.js
└── style.css
```

- Cada carpeta de bounded context representa **un dominio de negocio**.
- `shared/` es único y contiene solo código verdaderamente transversal.
- `locales/` contiene los archivos de internacionalización (`en.json`, `es.json`).
- `router.js` y `pinia.js` son archivos de inicialización global; no contienen lógica de negocio.

---

## Las 4 capas de cada Bounded Context

Cada módulo tiene exactamente estas 4 subcarpetas, con una dirección de dependencia estricta:

```
{context}/
├── domain/
├── application/
├── infrastructure/
└── presentation/
```

### Regla de dependencia (obligatoria)

```
presentation → application → infrastructure → domain
```

Las capas inferiores **nunca** conocen a las superiores. `domain` no importa nada de `application`, `infrastructure` ni `presentation`.

---

## Detalle de cada capa

### `domain/`

- Contiene la lógica de negocio **pura**, sin dependencias de Vue, Axios, Pinia ni ningún framework.
- Es el núcleo del módulo; debe poder ejecutarse en cualquier entorno JavaScript.

**Archivos permitidos:**

| Tipo | Patrón de nombre | Descripción |
|---|---|---|
| Entidad | `{nombre}.entity.js` | Clase o factory con propiedades y métodos de negocio |
| Command | `{accion}.command.js` | Objeto que representa una intención del usuario |

**Ejemplo de entidad:**
```js
// user.entity.js
export class User {
  constructor({ id, username, email, roles }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  hasRole(role) {
    return this.roles.includes(role);
  }
}
```

**Ejemplo de command:**
```js
// sign-in.command.js
export class SignInCommand {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }
}
```

---

### `application/`

- Contiene **un único archivo**: el store de Pinia del módulo.
- Orquesta el dominio e infraestructura; expone estado reactivo y acciones al exterior.
- Puede importar desde `domain/` e `infrastructure/`.

**Archivos permitidos:**

| Tipo | Patrón de nombre | Descripción |
|---|---|---|
| Store | `{context}.store.js` | Pinia store del módulo |

**Ejemplo:**
```js
// iam.store.js
import { defineStore } from 'pinia';
import { IamApi } from '../infrastructure/iam-api.js';
import { SignInAssembler } from '../infrastructure/sign-in.assembler.js';
import { SignInCommand } from '../domain/sign-in.command.js';

export const useIamStore = defineStore('iam', {
  state: () => ({ currentUser: null, isAuthenticated: false }),
  actions: {
    async signIn(username, password) {
      const command = new SignInCommand({ username, password });
      const resource = await IamApi.signIn(command);
      this.currentUser = SignInAssembler.toEntity(resource);
      this.isAuthenticated = true;
    }
  }
});
```

---

### `infrastructure/`

- Todo lo que toca el mundo exterior: HTTP, guards de ruta, interceptores de Axios.
- Transforma datos entre el formato de la API y el formato del dominio.

**Archivos permitidos:**

| Tipo | Patrón de nombre | Descripción |
|---|---|---|
| API | `{context}-api.js` | Llamadas HTTP del módulo (extiende `base-api`) |
| Assembler | `{entidad}.assembler.js` | Transforma DTO ↔ entidad de dominio |
| Resource | `{entidad}.resource.js` | Define la forma del DTO de la API |
| Guard | `{nombre}.guard.js` | Guard de Vue Router (ej. autenticación) |
| Interceptor | `{context}.interceptor.js` | Interceptor de Axios (ej. añadir token JWT) |

**Ejemplo de assembler:**
```js
// sign-in.assembler.js
import { User } from '../domain/user.entity.js';

export class SignInAssembler {
  static toEntity(resource) {
    return new User({
      id: resource.id,
      username: resource.username,
      email: resource.email,
      roles: resource.roles,
    });
  }
}
```

**Ejemplo de resource (forma del DTO):**
```js
// sign-in.resource.js
export class SignInResource {
  constructor({ id, username, email, roles }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
```

---

### `presentation/`

- Todo lo visual: vistas, componentes locales y rutas del módulo.
- Solo interactúa con el store de `application/`. **Nunca** importa directamente desde `domain/` ni `infrastructure/`.

**Estructura interna:**

```
presentation/
├── {context}-routes.js
├── views/
│   ├── {vista}.vue
│   └── ...
└── components/
    ├── {componente}.vue
    └── ...
```

**Archivos permitidos:**

| Tipo | Patrón de nombre | Descripción |
|---|---|---|
| Rutas | `{context}-routes.js` | Define las rutas del módulo como array de objetos |
| Vista | `{accion}-{tipo}.vue` | Página completa (ej. `sign-in-form.vue`) |
| Componente | `{nombre}.vue` | Componente reutilizable dentro del módulo |

**Ejemplo de rutas:**
```js
// iam-routes.js
export default [
  { path: '/sign-in', component: () => import('./views/sign-in-form.vue') },
  { path: '/sign-up', component: () => import('./views/sign-up-form.vue') },
];
```

**Registro en router.js global:**
```js
// router.js
import iamRoutes from './iam/presentation/iam-routes.js';
import publishingRoutes from './publishing/presentation/publishing-routes.js';

const routes = [
  ...iamRoutes,
  ...publishingRoutes,
];
```

---

## El módulo `shared/`

Solo dos subcarpetas permitidas. Puede ser importado por cualquier bounded context.

```
shared/
├── infrastructure/
│   ├── base-api.js        ← clase base HTTP para todos los APIs
│   └── base-endpoint.js   ← constantes de URLs base
└── presentation/
    ├── components/        ← componentes globales (layout, footer, language-switcher)
    └── views/             ← vistas globales (home, about, 404)
```

**`base-api.js`** es la única clase que instancia Axios directamente. Todos los `{context}-api.js` la extienden o la usan como dependencia.

---

## Convenciones de naming

Todo en **kebab-case**, sin excepciones.

| Tipo de archivo | Patrón | Ejemplo |
|---|---|---|
| Entidad | `{nombre}.entity.js` | `user.entity.js` |
| Command | `{accion}.command.js` | `sign-in.command.js` |
| Store | `{context}.store.js` | `iam.store.js` |
| API | `{context}-api.js` | `iam-api.js` |
| Assembler | `{entidad}.assembler.js` | `user.assembler.js` |
| Resource | `{entidad}.resource.js` | `sign-in.resource.js` |
| Guard | `{nombre}.guard.js` | `authentication.guard.js` |
| Interceptor | `{context}.interceptor.js` | `iam.interceptor.js` |
| Rutas | `{context}-routes.js` | `iam-routes.js` |
| Vista (form) | `{entidad}-form.vue` | `sign-in-form.vue` |
| Vista (list) | `{entidad}-list.vue` | `tutorial-list.vue` |
| Componente | `{descripcion}.vue` | `authentication-section.vue` |

---

## Reglas de comunicación entre módulos

1. **Los bounded contexts no se importan entre sí directamente.** Si `publishing` necesita saber si el usuario está autenticado, lo lee del store de `iam`, no importa archivos de `iam/domain/` ni `iam/infrastructure/`.
2. **La comunicación entre contextos ocurre a través de stores (Pinia) o del router.**
3. **`shared/` es de solo lectura para los contextos:** los contextos importan desde `shared/`, nunca al revés.

---

## Stack tecnológico del patrón

| Responsabilidad | Herramienta | Dónde vive |
|---|---|---|
| Estado reactivo | Pinia | `{context}/application/{context}.store.js` |
| HTTP | Axios | `shared/infrastructure/base-api.js` |
| Routing global | Vue Router | `src/router.js` (carga rutas locales de cada módulo) |
| UI components | PrimeVue + PrimeFlex | `{context}/presentation/` |
| Internacionalización | vue-i18n | `src/locales/en.json`, `es.json` |
| Mock server (dev) | json-server | `server/db.json` + `server/routes.json` |
| Build tool | Vite | `vite.config.js` |

---

## Paquetes npm y cómo se implementan

### Instalación completa del proyecto

```bash
npm create vite@latest {nombre-proyecto} -- --template vue
cd {nombre-proyecto}
npm install vue-router@5 pinia@3 axios primevue@4 @primeuix/themes primeflex primeicons vue-i18n@11
npm install -D json-server
```

---

### Vue 3 — Framework base

**Versión:** `vue@^3.5`

El framework principal. No requiere configuración especial, solo se inicializa en `main.js`.

```js
// main.js
import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);
// ... plugins se registran aquí
app.mount('#app');
```

---

### Vue Router 5 — Routing

**Versión:** `vue-router@^5`  
**Archivo de configuración:** `src/router.js`

Se crea una instancia del router en `router.js` cargando las rutas locales de cada bounded context. Usa `createWebHistory` para URLs limpias.

```js
// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import iamRoutes from './iam/presentation/iam-routes.js';
import publishingRoutes from './publishing/presentation/publishing-routes.js';
import sharedRoutes from './shared/presentation/views/shared-routes.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...iamRoutes,
    ...publishingRoutes,
    ...sharedRoutes,
  ],
});

export default router;
```

```js
// main.js
import router from './router.js';
app.use(router);
```

**Uso en presentation (rutas lazy-load):**
```js
// iam/presentation/iam-routes.js
export default [
  {
    path: '/sign-in',
    component: () => import('./views/sign-in-form.vue'),
    meta: { requiresAuth: false },
  },
];
```

**Guards de ruta** van en `{context}/infrastructure/authentication.guard.js` y se registran en `router.js`:
```js
// authentication.guard.js
import { useIamStore } from '../../application/iam.store.js';

export const authenticationGuard = (to, from, next) => {
  const iamStore = useIamStore();
  if (to.meta.requiresAuth && !iamStore.isAuthenticated) {
    next('/sign-in');
  } else {
    next();
  }
};
```

```js
// router.js
import { authenticationGuard } from './iam/infrastructure/authentication.guard.js';
router.beforeEach(authenticationGuard);
```

---

### Pinia 3 — Estado global

**Versión:** `pinia@^3`  
**Archivo de configuración:** `src/pinia.js`

Un store por bounded context. Se inicializa como plugin de Vue en `main.js`.

```js
// src/pinia.js
import { createPinia } from 'pinia';
export const pinia = createPinia();
```

```js
// main.js
import { pinia } from './pinia.js';
app.use(pinia);
```

**Estructura del store por módulo** (Options API de Pinia):
```js
// {context}/application/{context}.store.js
import { defineStore } from 'pinia';

export const usePublishingStore = defineStore('publishing', {
  state: () => ({
    tutorials: [],
    categories: [],
    loading: false,
  }),
  getters: {
    getTutorialById: (state) => (id) =>
      state.tutorials.find((t) => t.id === id),
  },
  actions: {
    async fetchTutorials() {
      this.loading = true;
      try {
        const data = await PublishingApi.getTutorials();
        this.tutorials = data.map(TutorialAssembler.toEntity);
      } finally {
        this.loading = false;
      }
    },
  },
});
```

**Consumo en un componente Vue:**
```vue
<script setup>
import { usePublishingStore } from '../../application/publishing.store.js';
const store = usePublishingStore();
store.fetchTutorials();
</script>
```

---

### Axios — HTTP client

**Versión:** `axios@^1.15`  
**Dónde vive:** `shared/infrastructure/base-api.js` (única instancia de Axios en todo el proyecto)

`base-api.js` crea y exporta una instancia de Axios configurada con la URL base. Todos los `{context}-api.js` la importan desde aquí.

```js
// shared/infrastructure/base-api.js
import axios from 'axios';
import { API_BASE_URL } from './base-endpoint.js';

const httpClient = axios.create({ baseURL: API_BASE_URL });
export default httpClient;
```

```js
// shared/infrastructure/base-endpoint.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
```

**API de cada bounded context:**
```js
// {context}/infrastructure/{context}-api.js
import httpClient from '../../shared/infrastructure/base-api.js';

export class PublishingApi {
  static async getTutorials() {
    const response = await httpClient.get('/tutorials');
    return response.data;
  }

  static async createTutorial(command) {
    const response = await httpClient.post('/tutorials', command);
    return response.data;
  }
}
```

**Interceptor de Axios** (ej. añadir JWT a cada request):
```js
// iam/infrastructure/iam.interceptor.js
import httpClient from '../../shared/infrastructure/base-api.js';

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

El interceptor se registra llamándolo una vez en `main.js`:
```js
// main.js
import './iam/infrastructure/iam.interceptor.js';
```

---

### PrimeVue 4 — Componentes UI

**Versión:** `primevue@^4` + `@primeuix/themes@^2`  
**Dónde se configura:** `main.js`

PrimeVue se registra globalmente con un tema de `@primeuix/themes`. Solo se usa en la capa `presentation/` de cada bounded context.

```js
// main.js
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'; // o Lara, Nora, Material

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode', // clase CSS para activar dark mode
    },
  },
});
```

**Importación de componentes individuales en vistas:**
```vue
<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
</script>

<template>
  <DataTable :value="store.tutorials">
    <Column field="title" header="Title" />
    <Column field="category" header="Category" />
  </DataTable>
  <Button label="Nuevo" icon="pi pi-plus" @click="onCreate" />
</template>
```

> Los componentes de PrimeVue **no se registran globalmente**; se importan solo donde se necesitan para mantener el bundle liviano.

---

### PrimeFlex 4 — Utilidades CSS

**Versión:** `primeflex@^4`  
**Dónde se importa:** `src/style.css` o `src/main.js` (una sola vez, globalmente)

PrimeFlex es el sistema de utilidades CSS de PrimeVue (similar a Tailwind). Se importa una vez y sus clases están disponibles en todo el proyecto.

```css
/* src/style.css */
@import 'primeflex/primeflex.css';
```

**Uso en templates:**
```html
<!-- layout con flex -->
<div class="flex align-items-center justify-content-between gap-3">
  <span class="text-xl font-bold">Título</span>
  <Button label="Acción" />
</div>

<!-- grid responsive -->
<div class="grid">
  <div class="col-12 md:col-6 lg:col-4">...</div>
</div>

<!-- spacing, sizing -->
<div class="p-4 m-2 w-full surface-card border-round">...</div>
```

---

### PrimeIcons — Iconografía

**Versión:** `primeicons@^7`  
**Dónde se importa:** `src/style.css` (una sola vez)

```css
/* src/style.css */
@import 'primeicons/primeicons.css';
```

**Uso:** prefijo `pi pi-{nombre}` en cualquier elemento o prop `icon` de PrimeVue.

```html
<Button icon="pi pi-save" label="Guardar" />
<i class="pi pi-user text-2xl" />
```

Referencia completa de íconos: [primevue.org/icons](https://primevue.org/icons)

---

### vue-i18n 11 — Internacionalización

**Versión:** `vue-i18n@^11`  
**Archivo de configuración:** `src/i18n.js`  
**Archivos de traducción:** `src/locales/en.json`, `src/locales/es.json`

```js
// src/i18n.js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';

const i18n = createI18n({
  legacy: false,        // usar Composition API
  locale: 'en',        // idioma por defecto
  fallbackLocale: 'en',
  messages: { en, es },
});

export default i18n;
```

```js
// main.js
import i18n from './i18n.js';
app.use(i18n);
```

**Estructura de archivos de traducción:**
```json
// src/locales/en.json
{
  "iam": {
    "sign-in": {
      "title": "Sign In",
      "username": "Username",
      "password": "Password",
      "submit": "Login"
    }
  },
  "publishing": {
    "tutorials": {
      "title": "Tutorials",
      "new": "New Tutorial"
    }
  }
}
```

**Uso en componentes:**
```vue
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <h1>{{ t('iam.sign-in.title') }}</h1>
  <Button :label="t('iam.sign-in.submit')" />
</template>
```

> Las claves de traducción siguen la misma estructura de bounded contexts: `{context}.{subdominio}.{clave}`.

---

### json-server — Mock API (desarrollo)

**Versión:** `json-server@^0.17` (devDependency)  
**Archivos:** `server/db.json`, `server/routes.json`, `server/start.sh`

Simula una REST API completa durante el desarrollo sin necesidad de backend real.

```json
// server/db.json
{
  "users": [
    { "id": 1, "username": "admin", "email": "admin@test.com", "roles": ["ADMIN"] }
  ],
  "tutorials": [
    { "id": 1, "title": "Vue 3 Basics", "categoryId": 1 }
  ],
  "categories": [
    { "id": 1, "name": "Frontend" }
  ]
}
```

```json
// server/routes.json  — aliases de rutas personalizadas
{
  "/api/*": "/$1"
}
```

```bash
# server/start.sh
json-server --watch db.json --routes routes.json --port 3000
```

**Script en package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "server": "node server/start.sh",
    "dev:full": "concurrently \"npm run server\" \"npm run dev\""
  }
}
```

**Variables de entorno por ambiente:**
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000

# .env.production
VITE_API_BASE_URL=https://api.midominio.com
```

---

### Vite — Build tool

**Versión:** `vite@^8` + `@vitejs/plugin-vue@^6`  
**Archivo de configuración:** `vite.config.js`

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

El alias `@` permite importar desde `src/` sin rutas relativas largas:
```js
// en lugar de: import { useIamStore } from '../../../iam/application/iam.store.js'
import { useIamStore } from '@/iam/application/iam.store.js';
```

---

### Inicialización completa en `main.js`

Este es el orden correcto de registro de todos los plugins:

```js
// src/main.js
import { createApp } from 'vue';
import App from './app.vue';

import router from './router.js';
import { pinia } from './pinia.js';
import i18n from './i18n.js';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

// Registrar interceptores (solo importar, se auto-registran)
import './iam/infrastructure/iam.interceptor.js';

// Estilos globales
import './style.css';

const app = createApp(App);

app.use(pinia);       // Pinia antes que el router (los guards usan stores)
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  theme: { preset: Aura },
});

app.mount('#app');
```

---

## Checklist para agregar un nuevo Bounded Context

Cuando se necesita agregar un nuevo módulo (ej. `enrollment`, `billing`, `notifications`):

- [ ] Crear `src/{context}/` con las 4 subcarpetas: `domain/`, `application/`, `infrastructure/`, `presentation/`.
- [ ] Definir entidades en `domain/{entidad}.entity.js`.
- [ ] Crear commands en `domain/{accion}.command.js` si aplica.
- [ ] Crear `infrastructure/{context}-api.js` que use `base-api` de shared.
- [ ] Crear assemblers para cada entidad: `infrastructure/{entidad}.assembler.js`.
- [ ] Crear resources si se necesita tipar los DTOs: `infrastructure/{entidad}.resource.js`.
- [ ] Crear el store en `application/{context}.store.js`.
- [ ] Crear vistas en `presentation/views/`.
- [ ] Crear `presentation/{context}-routes.js` con las rutas del módulo.
- [ ] Importar y registrar las rutas en `src/router.js`.
- [ ] **Verificar:** ¿el módulo importa algo directamente de otro bounded context? Si sí, refactorizar.

---

## Lo que NO se debe hacer

| ❌ Prohibido | ✅ Correcto |
|---|---|
| Importar `domain/` desde `presentation/` | Usar el store como intermediario |
| Importar desde otro bounded context directamente | Comunicarse vía stores o router |
| Poner llamadas Axios fuera de `infrastructure/` | Centralizar HTTP en `{context}-api.js` |
| Crear lógica de negocio en el store | Moverla a una entidad o command en `domain/` |
| Poner componentes globales en un bounded context | Moverlos a `shared/presentation/components/` |
| Crear múltiples stores por módulo | Un único `{context}.store.js` por bounded context |
| Usar PascalCase o snake_case en nombres de archivo | Usar siempre kebab-case |



vamos a usar estricatamente git flow 
esa forma de trabajar


HABRA 1 SOLO SOTRE PARA CADA BONUDED CONTEXT
UNA SOLA API EN UN BOUNDED CONTEXT(PUEDEN HABER VARIOS ENDPOINT)

tenemos que usar char js