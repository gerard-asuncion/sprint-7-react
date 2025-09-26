
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

7.  **Revisa errors:**
    ```bash
    npm run lint
    ```

8.  **Crea la versió final de l'aplicació, llesta per a producció:**
    ```bash
    npm build
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
```

## ✨ Fragments de Codi d'Exemple

#### Hook per al detall d'una pel·lícula (`useMovieDetail.ts`)

Aquest *custom hook* encapsula tota la lògica per obtenir les dades d'una pel·lícula.

```typescript
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, clearMovieDetail } from '../store/moviesDetailSlice';
import type { RootState, AppDispatch } from '../store/store';

export const useMovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { details, director, loading, error } = useSelector(
    (state: RootState) => state.movieDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
    }

    return () => {
      dispatch(clearMovieDetail());
    };
  }, [dispatch, id]);

  return { id, details, director, loading, error };
};
```

#### Slice de Redux per a la llista de pel·lícules (`moviesSlice.ts`)

Aquest *slice* de Redux gestiona l'estat de la graella de pel·lícules amb `createAsyncThunk`.

```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Movie, MoviesState } from '../types/types'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = createAsyncThunk<
{ results: Movie[]; total_pages: number }, number, { rejectValue: string }>(
  'movies/fetchMovies',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get('[https://api.themoviedb.org/3/movie/popular](https://api.themoviedb.org/3/movie/popular)', {
        params: {
          api_key: API_KEY,
          language: 'es-ES',
          page,
        },
      });
      return response.data;
    } catch (error: unknown) {
      // ...manejo de errores...
    }
  }
);
```

#### Test d'un component (`Header.test.tsx`)

Exemple de test unitari per al component `Header` que verifica el renderitzat condicional.

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Header from '../Header';

describe('Header', () => {
  it('debería mostrar solo el título en la página principal', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </Memory-Router>
    );
    expect(screen.getByText('MOVIES DIRECTORY')).toBeInTheDocument();
    expect(screen.queryByText('return to main menu')).not.toBeInTheDocument();
  });
});
```
