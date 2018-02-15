const http = require('http');
const express = require('express');
const app = express();
const body_parser = require('body-parser');
var sprites = require('./model/Database/sprites');
global.__basedir = __dirname;

sprites.init();

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

app.use(require('./controller'));

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

const server = http.createServer(app);
server.listen(80);
console.log("Server started");