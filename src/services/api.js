//Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=45fe8a13e5a3f180e0a1f826ccbe168b&language=pt-br


import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/' //A base da api que nunca muda
});

export default api;