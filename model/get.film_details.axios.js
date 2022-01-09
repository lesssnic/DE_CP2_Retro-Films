const axios = require('axios');
const {link} = require('../constants/link');

const getFilmDetails = async(id) => {
    try{
        const {data} = await axios.get(`${link.URL}/${id}`,{ params: {
            api_key : link.API_KEY}
            });
        return {result: data};
    }catch (err) {
        return {error: err};
    }
}
const getGenresAxios = async() => {
    try{
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`,{ params: {
                api_key : link.API_KEY}
        });
        return {result: data};
    }catch (err) {
        return {error: err};
    }
}
const getLangAxios = async() => {
    try{
        const {data} = await axios.get(`https://api.themoviedb.org/3/configuration/languages`,{ params: {
                api_key : link.API_KEY}
        });
        return {result: data};
    }catch (err) {
        return {error: err};
    }
}

const getReviewAxios = async(id) => {
    try{
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`,{ params: {
                api_key : link.API_KEY}
        });
        return {result: data};
    }catch (err) {
        return {error: err};
    }
}

module.exports = {getFilmDetails, getGenresAxios, getLangAxios, getReviewAxios};


