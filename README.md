
# Movies Directory (Sprint 7 - React)

Aquesta aplicació web, desenvolupada amb React, permet als usuaris explorar un directori de pel·lícules populars, veure'n els detalls i gestionar la seva sessió d'usuari. L'autenticació es gestiona amb **Supabase** i l'estat global de l'aplicació amb **Redux Toolkit**.

## 🚀 Tecnologies Utilitzades

* **Framework Principal**: React 19 amb Vite
* **Llenguatge**: TypeScript
* **Estils**: Tailwind CSS
* **Gestió d'Estat**: Redux Toolkit
* **Autenticació**: Supabase
* **Routing**: React Router DOM
* **Crides a l'API**: Axios
* **Testing**: Jest i React Testing Library

## 📋 Requisits

* Node.js (versió 18.x o superior)
* NPM (s'instal·la amb Node.js)
* Compte a Supabase
* Clau d'API de The Movie Database (TMDB)

## 🔧 Instal·lació i Desplegament

1.  **Clona el repositori:**
    ```bash
    git clone https://github.com/gerard-asuncion/sprint-7-react.git
    ```

2.  **Navega a la carpeta del projecte:**
    ```bash
    cd sprint-7-react
    ```

3.  **Instal·la les dependències:**
    ```bash
    npm install
    ```

4.  **Configura les variables d'entorn:**
    Crea un arxiu `.env` a l'arrel del projecte i afegeix les teves claus:
    ```
    VITE_APP_SUPABASE_URL=LA_TEVA_URL_DE_SUPABASE
    VITE_APP_SUPABASE_ANON_KEY=LA_TEVA_CLAU_ANON_DE_SUPABASE
    VITE_TMDB_API_KEY=LA_TEVA_CLAU_DE_TMDB
    ```

5.  **Executa el projecte:**
    ```bash
    npm run dev
    ```

6.  **Executa els tests:**
    ```bash
    npm test
    ```

7.  **Revisa errors:**
    ```bash
    npm run lint
    ```

8.  **Crea la versió final de l'aplicació, llesta per a producció:**
    ```bash
    npm run build
    ```

## 📁 Estructura de Carpetes

```
.
├── .editorconfig
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── jest.config.js
├── jest.setup.js
├── package-lock.json
├── package.json
├── public/
│   └── film-icon.svg
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MovieDetail.tsx
│   │   ├── MoviesGrid.tsx
│   │   └── ProtectedRoute.tsx
│   ├── hooks/
│   │   ├── useAuthRedirect.ts
│   │   ├── useMovieDetail.ts
│   │   ├── useMoviesGrid.ts
│   │   └── useSignOut.ts
│   ├── index.css
│   ├── lib/
│   │   └── supabase.ts
│   ├── main.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── MainPage.tsx
│   │   └── MoviePage.tsx
│   ├── providers/
│   │   ├── AuthContext.tsx
│   │   └── AuthProvider.tsx
│   ├── store/
│   │   ├── __tests__/
│   │   │   ├── moviesDetailSlice.test.ts
│   │   │   └── moviesSlice.test.ts
│   │   ├── moviesDetailSlice.ts
│   │   ├── moviesSlice.ts
│   │   └── store.tsx
│   ├── types/
│   │   └── types.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Contribucions

  Les contribucions són benvingudes! Per favor, segueix els següents passos per a contribuir:

  Fes un fork del repositori Crea una nova branca git checkout -b feature/NovaFuncionalitat Fes els teus canvis i commiteja'ls: git commit -m 'Afegeix Nova Funcionalitat' Puja els canvis a la teva branca: git push origin feature/NovaFuncionalitat Fes un pull request
