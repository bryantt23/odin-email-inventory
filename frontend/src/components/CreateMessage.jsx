import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createMessage, getCategories } from '../../services/messages';

function CreateMessage() {
  const [text, setText] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategories()
        setCategories(res)
        if (res.length > 0) {
          setSelectedCategory(res[0])
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const message = { text, category: selectedCategory }
      await createMessage(message)
      navigate('/messages')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Create a Message</h1>
      <p>Welcome to Create a Message</p>
      <Link to="/messages">Show All Messages</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}>
            {categories.map(category => <option key={category} value={category}>{category}</option>
            )}
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
export default CreateMessage