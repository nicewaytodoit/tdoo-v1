import axios from 'axios';


console.log('@@@ Hajde1:', process.env.NODE_ENV);
console.log('@@@ Hajde2:', process.env.REACT_APP_API_URL);
console.log('@@@ Hajde3:', process.env.REACT_APP_SECRET_CODE);
console.log('@@@ Hajde4:', process.env.REACT_APP_URLS);
console.log('@@@ Hajde5:', process.env.REACT_APP_BLAH);

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,DELETE,HEAD,PUT,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
});

export default instance;
