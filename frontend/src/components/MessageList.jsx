import React, { useEffect, useState } from 'react'
import { getMessages } from '../../services/messages'
import "./MessageList.css"
import Message from './Message'

function MessageList() {
    const [selectedOption, setSelectedOption] = useState("tinder")
    const [messagesFromApi, setMessagesFromApi] = useState(null)
    const [messages, setMessages] = useState([])
    useEffect(() => {
        async function fetchData() {
            const res = await getMessages()
            setMessagesFromApi(res)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (messagesFromApi !== null) {
            setMessages(messagesFromApi[`${selectedOption}Messages`])
        }
    }, [selectedOption, messagesFromApi])

    return (
        <div>

            <h1>Messages List</h1>
            <p>Welcome to Messages List</p>
            <p><a href="/messages/create">Add a Message</a></p>

            <div className="grid-container">
                <select
                    className="message-filter"
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="tinder">Tinder</option>
                    <option value="job">Job</option>
                    <option value="all">All Messages</option>
                </select>

                <label>
                    <input type="checkbox" className="show-archived" />Show Archived
                </label>

                <div className="message-list">
                    {
                        messages.map(message => <Message key={message._id} message={message} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageList