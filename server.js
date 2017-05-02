//Dependencias
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

///BANCO
var mongoose = require('mongoose');
mongoose.connect('mongodb://phlelism:bleek84101048@cluster0-shard-00-00-2ehrn.mongodb.net:27017,cluster0-shard-00-01-2ehrn.mongodb.net:27017,cluster0-shard-00-02-2ehrn.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var Restaurante = require('./server/models/restaurante');

//Rotas
const api = require('./server/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Dist
app.use(express.static(path.join(__dirname, 'dist')));

//Seta Rotas
app.use('/api', api);

//Retorna a index para todas as outras rotas
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html')); 
});

/**
 * Pega porta e guarda no Express
 */

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Cria o servidor HTTP.
 */
const server = http.createServer(app);

/**
 * Escuta a porta
 */

server.listen(port, () => console.log(`Aplicação rodando no localhost:${port}`));

