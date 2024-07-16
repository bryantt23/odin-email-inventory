import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { login } from '../services/login'
import './App.css'
import CreateMessage from './components/CreateMessage'
import Login from './components/Login'
import MessageList from './components/MessageList'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateMessage from './components/UpdateMessage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (password) => {
    try {
      const res = await login(password)
      if (res.isAuthenticated) {
        setIsLoggedIn(true)
        navigate('/messages')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/messages" element={<MessageList />} />
        <Route path="/messages/create" element={<CreateMessage />} />
        <Route path="/messages/:id/update" element={<UpdateMessage />} />
      </Route>
      <Route path="*" element={<Navigate to={isLoggedIn ? "/message" : "/login"} replace />} />
    </Routes>
  )
}

export default App
