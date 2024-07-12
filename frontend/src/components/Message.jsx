import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { archiveMessage, deleteMessage } from '../../services/messages';

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
    const navigate = useNavigate()

    const handleArchive = () => {
        const callArchiveApi = async () => {
            try {
                const res = await archiveMessage(message._id)
                if (res.success) {
                    setIsArchived(!isArchived)
                }
            } catch (error) {
                console.error(error)
            }
        }
        callArchiveApi()
    }

    const handleDelete = async () => {
        const shouldDelete = confirm('Are you sure you want to delete this message?');
        if (shouldDelete) {
            try {
                await deleteMessage(message._id)
                navigate(0)
            } catch (error) {
                console.error(error)
            }
        }
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
                <button className="message-action"
                    onClick={handleDelete}
                >Delete</button>
                <label><input type="checkbox"
                    checked={isArchived}
                    onChange={handleArchive}
                />Archived</label>
            </div>

        </div >
    )
}

export default Message