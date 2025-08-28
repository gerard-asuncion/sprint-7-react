import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainApp from './pages/MainApp'

function App() {

  return (
    <Routes>
      <Route path="/app" element={<MainApp />} />
    </Routes>
  )
}

export default App
