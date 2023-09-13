// const axios = require('axios').default;
// const createApi = ({authorization}) => {
//   let headers = {
//     'Content-Type': 'application/json'
//   }
//   if (authorization) headers['Authorization'] = authorization
//   return axios.create({
//     timeout: 15000,
//     headers,
//   })
// }
// module.exports = {
//   createApi
// }
import axios from 'axios';
const createApi = ({ authorization }) => {
    let headers = {
        'Content-Type': 'application/json'
    };
    if (authorization)
        headers['Authorization'] = authorization;
    return axios.create({
        timeout: 15000,
        headers,
    });
};
export { createApi };
