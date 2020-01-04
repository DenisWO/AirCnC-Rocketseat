const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-qcnik.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

//request.query => Acessar os parâmetros da query
//request.params => Acessar parâmetros de edição
//request.body => Parâmetros de inclusão

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);