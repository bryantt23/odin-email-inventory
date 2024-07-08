import './App.css'
import MessageList from './components/MessageList'
import UpdateMessage from './components/UpdateMessage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<MessageList />} />
      <Route path="/messages/:id/update" element={<UpdateMessage />} />
    </Routes>

  )
}

export default App
