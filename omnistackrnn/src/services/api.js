import axios from 'axios';

const api = axios.create({
    baseURL: 'exp://tx-i8k.anonymous.omnistackrnn.exp.direct:80'
});

export default api;