const fs = require('fs');
const path = require('path');

const requestFilms = async (res) => {
    const file = path.join(`${__dirname}/test.json`);
    console.log(file);

       await fs.readFile(file, (err, content) => {
        if(err){
            res.writeHead(404);
            res.write('file not found');
            res.end();
        }else {
            res.writeHead(200);
            result = JSON.parse(content);
            console.log('test');
            res.write('success');
            res.end();
        }
    })
    console.log('finish');
    res.statusCode = 200;
    res.end('tesssst');
    // if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: { data: {}, status: 200 } };
};

module.exports = {requestFilms};