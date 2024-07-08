import React, { useEffect, useState } from 'react'
import { archiveMessage } from '../../services/messages'
// import "./Message.css"
import { Link } from 'react-router-dom'


// Function to copy text to clipboard
function copyText(text) {
    navigator.clipboard
        .writeText(text)
        .then(function () {
            console.log('Text copied to clipboard');
        })
        .catch(function (error) {
            console.error('Error in copying text: ', error);
        });
}

function Message({ message }) {
    const [isArchived, setIsArchived] = useState(message.isArchived)

    const handleArchive = () => {
        const callArchiveApi = async () => {
            try {
                const res = await archiveMessage(message._id)
                console.log("🚀 ~ callArchiveApi ~ res:", res)
                if (res.success) {
                    setIsArchived(!isArchived)
                }
            } catch (error) {
                console.error(error)
            }
        }
        callArchiveApi()
    }

    return (
        <div className="row-container">
            <div className='grid-item category'>{message.category}</div>

            <div className='grid-item text'>{message.text}</div>

            <div className="grid-item actions">
                <button className="message-action"
                    onClick={() => copyText(message.text)}
                >Copy Text</button>
                <Link
                    className="message-action"
                    to={`/messages/${message._id}/update`}
                >
                    Update
                </Link>
                <label><input type="checkbox"
                    checked={isArchived}
                    onChange={handleArchive}
                />Archived</label>
            </div>

        </div >
    )
}

export default Message