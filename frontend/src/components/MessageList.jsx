import React, { useEffect, useState } from 'react'
import { getMessages } from '../../services/messages'
import "./MessageList.css"
import Message from './Message'
import { Link } from 'react-router-dom'

function MessageList() {
    const [selectedOption, setSelectedOption] = useState(() => {
        return localStorage.getItem('selectedFilter') || 'tinder'
    })
    const [messagesFromApi, setMessagesFromApi] = useState(null)
    const [messages, setMessages] = useState([])
    const [showArchived, setShowArchived] = useState(() => {
        const storedValue = localStorage.getItem('showArchived')
        return storedValue ? JSON.parse(storedValue) : false
    })
    const [messagesHaveChanged, setMessagesHaveChange] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await getMessages()
            setMessagesFromApi(res)
        }
        fetchData()
    }, [messagesHaveChanged])

    useEffect(() => {
        if (selectedOption) {
            localStorage.setItem('selectedFilter', selectedOption.toLowerCase());
        }

        if (messagesFromApi !== null) {
            setMessages(messagesFromApi[`${selectedOption}Messages`])
        }
        /*
        if show archived, then show everything
        if not show archived, only show non archived
        */
        if (!showArchived) {
            setMessages(messages => messages.filter(message => !message.isArchived))
        }
        localStorage.setItem('showArchived', JSON.stringify(showArchived));

    }, [selectedOption, messagesFromApi, showArchived])

    const handleMessageChange = () => {
        setMessagesHaveChange(prev => !prev)
    }

    return (
        <div>
            <h1>Messages List</h1>
            <p>Welcome to Messages List</p>
            <p><Link to="/messages/create">Add a Message</Link></p>

            <div className="grid-container">
                <select
                    className="message-filter"
                    onChange={(e) => setSelectedOption(e.target.value)}
                    value={selectedOption}
                >
                    <option value="tinder">Tinder</option>
                    <option value="job">Job</option>
                    <option value="all">All Messages</option>
                </select>

                <label>
                    <input type="checkbox"
                        className="show-archived"
                        checked={showArchived}
                        onChange={() => setShowArchived(!showArchived)}
                    />Show Archived
                </label>

                <div className="message-list">
                    {
                        messages.map(message => <Message key={message._id} message={message} onMessageChange={handleMessageChange} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageList