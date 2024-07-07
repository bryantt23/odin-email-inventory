import React, { useEffect, useState } from 'react'
import { deleteMessage } from '../../services/messages'
// import "./Message.css"
// import Link from 'react-router-dom'

function Message({ message }) {
    return (
        <div className="row-container">
            <div className='grid-item category'>{message.category}</div>

            <div className='grid-item text'>{message.text}</div>

            <div className="grid-item actions">
                <button className="message-action" data-message-text="Hi how are you? How goes Badoo? 😀">Copy Text</button>
                {/* <a className="message-action" href="/messages/66856983fa807d875b215358/update">Update</a> */}
                <button className="message-action" onClick={() => deleteMessage(message._id)}>Delete</button>
                <label><input type="checkbox" />Archived</label>
            </div>

        </div>
    )
}

export default Message