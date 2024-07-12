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

export const updateMessage = async (message) => {
    try {
        const res = await api.put(`/messages/${message._id}`, message)
        return res.data
    } catch (error) {
        console.error('Error updating message:', error);
        throw error
    }
}

export const createMessage = async (message) => {
    try {
        const res = await api.post(`/messages`, message)
        return res.data
    } catch (error) {
        console.error('Error creating message:', error);
        throw error
    }
}

export const getCategories = async () => {
    try {
        const res = await api.get('/messages/categories')
        return res.data
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error
    }
}

export const deleteMessage = async (id) => {
    try {
        const res = await api.delete(`/messages/${id}`)
        return res.data
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error
    }
}
