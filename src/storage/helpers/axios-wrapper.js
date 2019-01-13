import axios from 'axios';

export const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,HEAD,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};

export const customInstance = (url, headers) => axios.create({
    baseURL: url,
    headers: headers,
});

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: defaultHeaders,
});

export default instance;
