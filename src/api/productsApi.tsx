import axios from 'axios';

const baseURL = `http://192.168.1.71:8080/api`;

const productsApi = axios.create({ baseURL });

export default productsApi;