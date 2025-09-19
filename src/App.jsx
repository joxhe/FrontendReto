import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./components/Login/login"
import Register from "./components/register/register"
import Dashboard from './components/dashboard/dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App