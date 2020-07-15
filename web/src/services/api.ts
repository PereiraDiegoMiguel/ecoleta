import axios from 'axios';

// conectar ao backend
const api =axios.create({
    baseURL: 'http://localhost:3333'

});

export default api;