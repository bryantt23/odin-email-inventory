import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getMessages = async () => {
    try {
        const res = await api.get('/messages')
        return res.data.messages
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error
    }
}

export const getMessage = async (id) => {
    try {
        const res = await api.get(`/messages/${id}`)
        return res.data
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error
    }
}

export const archiveMessage = async (id) => {
    try {
        const res = await api.put(`/messages/${id}/archive/`)
        return res.data
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error
    }
}