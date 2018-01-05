'use strict';

const config = require('./serverConfig')();
const express = require('express');
const compression = require('compression');
const path = require('path');
const helmet = require('helmet');
const http = require('http');

const app = express();

app.use(compression());
app.use(helmet());
app.use('/client', express.static(path.resolve(__dirname, './client')));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
console.log(__dirname+'/index.html');
const createServer =() => {
    const server = http.createServer(app);
    const port = config.port;
    const ip = config.ip;
    server.listen(port, ip, ()=>{
        console.log('Server listening at %s://%s', ip, port);
    })
}

createServer();
