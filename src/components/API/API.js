import axios from 'axios';
const default_API = 'https://pixabay.com/api/';
const KEY = '30110883-082a3209dc2bc0d9dd6730db6';


 const API = (imgName,page) =>{
    const response = axios.get(`${default_API}?key=${KEY}&page=${page}&q=${imgName}&per_page=12`)
   return response
}
export default API