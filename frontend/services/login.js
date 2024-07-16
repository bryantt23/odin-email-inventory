import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/json'
    },
});

export const login = async (password) => {
    try {
        const res = await api.post('/login', { password }); // Ensure correct endpoint
        return res.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const checkLoginStatus = async () => {
    try {
        const res = await api.get('/check-auth'); // Ensure correct endpoint
        return res.data;
    } catch (error) {
        console.error('Error checking login status:', error);
        throw error;
    }
};