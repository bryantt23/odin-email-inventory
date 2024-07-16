import './App.css'
import CreateMessage from './components/CreateMessage'
import MessageList from './components/MessageList'
import UpdateMessage from './components/UpdateMessage'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { checkLoginStatus, login } from '../services/login'
import { useState, useEffect } from 'react'

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
  useEffect(() => {
    async function fetchData() {
      const status = await checkLoginStatus()
      if (status.isAuthenticated) {
        setIsLoggedIn(true)
      }
      else {
        setIsLoggedIn(false)
      }
    }
    fetchData();
  }, [])

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
