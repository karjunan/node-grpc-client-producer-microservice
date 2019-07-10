'use strict';

const PROTO_PATH = 'messages.proto';
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const process = require('process');
const grpc = require('grpc');


//Router configuration
const employeeRouter = require('./routes/employeeRouter')();

//Application port and ip
const PORT = 3050;
// const HOST = '0.0.0.0';


// port configuration for GRPC connectivity
const GRPC_PORT = 53016
// const GRPC_PORT = 9000;

//proto file path 
const serviceDef = grpc.load(PROTO_PATH);

const app = express();
const creds = grpc.credentials.createInsecure()
// const client = new serviceDef.EmployeeConsumerService(`localhost:${GRPC_PORT}`, creds);
const client = new serviceDef.EmployeeProducerService(`10.0.102.166:${GRPC_PORT}`, creds);
// const client = new serviceDef.EmployeeConsumerService(`172.24.235.1:${GRPC_PORT}`, creds);
const GRPC_HOST = process.env.GRPC_SERVER_IP;
console.log("GRPC- HOST " + GRPC_HOST);
// const client = new serviceDef.EmployeeConsumerService(`${GRPC_HOST}`, creds);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api',employeeRouter);

app.get('/', (req, res) => {
  res.send(' Producer Microservice Started !! ');
});

app.listen(PORT,() => {
    console.log("Running on port " + PORT);
});

module.exports.client=client;

