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
    git clone [https://github.com/gerard-asuncion/sprint-7-react.git](https://github.com/gerard-asuncion/sprint-7-react.git)
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

## 📁 Estructura de Carpetes

```
/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── jest.config.js
├── package.json
└── tsconfig.json
