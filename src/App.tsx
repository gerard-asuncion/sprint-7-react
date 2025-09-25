import { Routes, Route } from 'react-router-dom';
import MainApp from './pages/MainApp';
import MoviePage from './pages/MoviePage';
import LoginPage from './pages/LoginPage'; // Importa la nueva página de login
import ProtectedRoute from './components/ProtectedRoute'; // Importa la ruta protegida

function App() {
  return (
    <Routes>
      {/* Ruta Pública: Cualquiera puede acceder a la página de login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas Privadas: Anidadas dentro del guardián */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainApp />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Route>
    </Routes>
  );
}

export default App;
