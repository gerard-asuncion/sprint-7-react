import { Routes, Route } from 'react-router-dom'
import MainApp from './pages/MainApp'
import MovieDetail from './pages/MovieDetail'

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
			<Route path="/movie/:id"element={<MovieDetail />} />
    </Routes>
  )
}

export default App
