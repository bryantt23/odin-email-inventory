import React, { useEffect, useState } from 'react'
import { archiveMessage } from '../../services/messages'
// import "./Message.css"
// import Link from 'react-router-dom'

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
                <button className="message-action" data-message-text="Hi how are you? How goes Badoo? 😀">Copy Text</button>
                {/* <a className="message-action" href="/messages/66856983fa807d875b215358/update">Update</a> */}
                <label><input type="checkbox"
                    checked={isArchived}
                    onChange={handleArchive}
                />Archived</label>
            </div>

        </div>
    )
}

export default Message