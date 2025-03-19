import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const instance = axios.create({
    baseURL:'http://localhost:8000',
    timeout: 2000
})

export default instance;