import './App.css'
import CreateMessage from './components/CreateMessage'
import MessageList from './components/MessageList'
import UpdateMessage from './components/UpdateMessage'
import { Route, Routes } from 'react-router-dom'

function App() {
  /*
  TODO secure routes
  * */

  return (
    <Routes>
      <Route path="/messages" element={<MessageList />} />
      <Route path="/messages/create" element={<CreateMessage />} />
      <Route path="/messages/:id/update" element={<UpdateMessage />} />
    </Routes>

  )
}

export default App
