import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://us-central1-almasila-kart3.cloudfunctions.net/api'
    // 'http://127.0.0.1:5001/almasila-kart3/us-central1/api' //The API "Cloud Function" URL
});

export default instance;