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

module.exports = {getFilmDetails};