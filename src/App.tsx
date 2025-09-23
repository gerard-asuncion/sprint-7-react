import { Routes, Route } from 'react-router-dom'
import MainApp from './pages/MainApp'
import MoviePage from './pages/MoviePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
			<Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  )
}

export default App
