const http = require('http');
const express = require('express');
const app = express();
const Sprite = require('./model/Classes/Sprite');

require('./model/Database/sprites')['test'] = new Sprite("C:\\users\\stijn\\WebstormProjects\\SpriteClass\\resources\\testFull.png");

app.use(require('./controller'));

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

const server = http.createServer(app);
server.listen(80);