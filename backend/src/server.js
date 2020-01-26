const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

mongoose.connect('mongodb+srv:/...', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const app = express();
const server = http.Server(app);
const io = socketio(server);
const connectedUsers = {}; //usar redis

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id; 
});

app.use((request, response, next) => {
    request.io = io;
    request.connectedUsers = connectedUsers;
    return next();
});

//request.query => Acessar os parâmetros da query
//request.params => Acessar parâmetros de edição
//request.body => Parâmetros de inclusão

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);