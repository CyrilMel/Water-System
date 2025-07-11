import axios from "axios";

const instance = axios.create({
    baseURL:'https://shopaqua.onrender.com',
    timeout: 2000
})

export default instance;