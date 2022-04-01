import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Landing from './pages/Landing.js'
import Register from './pages/Register.js'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
