'use strict';

const PROTO_PATH = 'messages.proto';
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const process = require('process');

// var protoLoader = require('@grpc/proto-loader');
const Employee = require('./routes/employeeModel')

//Router configuration
const employeeRouter = require('./routes/employeeRouter')();

//Application port and ip
const PORT = 3050;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api',employeeRouter);

app.get('/', (req, res) => {
  res.send(' Producer Microservice Started !! ');
});

app.listen(PORT,() => {
    console.log("Running on port " + PORT);
});


