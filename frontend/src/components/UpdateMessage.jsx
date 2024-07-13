import React, { useEffect, useState } from 'react'
import { getMessage, updateMessage } from '../../services/messages'
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UpdateMessage() {
  let { id } = useParams()
  const [message, setMessage] = useState([])
  const [text, setText] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMessage(id)
        setMessage(res.message)
        setText(res.message.text)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedMessage = { ...message, text }
      await updateMessage(updatedMessage)
      navigate('/messages')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Update Message</h1>
      <p>Welcome to Update Message</p>
      <Link to="/messages">Show All Messages</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            disabled={true}
            value={"message.category"}>
            <option value={message.category}>{message.category}</option>
          </select>
        </div>

        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            name="text"
            className="custom-textarea"
            required minLength="2"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
export default UpdateMessage