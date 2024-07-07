import React, { useEffect, useState } from 'react'
import { getMessages } from '../../services/messages'
// import "./Message.css"

function Message({ message }) {


    return (
        <div>
            {JSON.stringify(message)}

        </div>
    )
}

export default Message