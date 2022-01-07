const fs = require('fs');
const path = require('path');
const baseRepository = require('../database/repositories/base.repository');
const {getFilmDetails} = require('../model/get.film_details.axios');
const {readFile} = require('fs/promises');

const getContentType = (url) => {
    switch(path.extname(url)) {
        case '':
            return '';
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        default:
            return 'application/octate-stream';
    }
}
const getIndex = async (url, contentType, res) => {
    const file = path.join(`${__dirname}/../swagger/${url}`);
    const extension = getContentType(url);
    if(!extension) {
        res.statusCode = 404;
        res.end(JSON.stringify('Route Not Found'));
    }else{
        try {
            const result = await readFile(file);
            return {result: {data: result.toString(), status: 200, type: extension}}
        } catch (err) {
            return {error: { status: 404, data: { err } }};
        }

    }
};

const writeBase = async (url, contentType, res) => {
    const file = path.join(`${__dirname}/../swagger/${url}`);
    const extension = getContentType(url);
    if(!extension) {
        res.statusCode = 404;
        res.end(JSON.stringify('Route Not Found'));
    }else{
        fs.readFile(file, async (err, content) => {
            if(err){
                res.writeHead(404);
                res.write('file not found');
                res.end();
            }else {
                res.writeHead(200, {'Content-type': extension});
                // const base = JSON.parse(content);
                // let fill = base.filter(item => item.popularity > 50);
                // fill = fill.splice(400,100);
                //fill.forEach(item=>baseRepository.writeBase(item));
                // fill.forEach(async (item) => {
                //     const {result , error} = await getFilmDetails(item.id);
                //                              await baseRepository.updateBase(result);
                // });
                res.write('movie');
                res.end();
            }
        })
    }
};
const writeBaseAdd = async (url, contentType, res) => {
    const file = path.join(`${__dirname}/../swagger/${url}`);
    const extension = getContentType(url);
    if(!extension) {
        res.statusCode = 404;
        res.end(JSON.stringify('Route Not Found'));
    }else{
        let {result} = await baseRepository.getBase();
        console.log(result.length);
        result = result.splice(0,100);
        result.forEach(async item => {
            const {result , error} = await getFilmDetails(item.id);

             await baseRepository.updateBase(result)
            res.write('movie');
            res.end();
        })
        //await baseRepository.updateBase(result);
    }
};


module.exports = {getIndex, writeBase, writeBaseAdd, getContentType};
