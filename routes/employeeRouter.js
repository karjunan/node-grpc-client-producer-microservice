const express = require('express');
const Employee = require('./employeeModel')
var headers = require('hashmap');
// const grpc_client = require('../client');
const GRPC_PORT = 8000;
const grpc = require('grpc');
const PROTO_PATH = 'messages.proto';

//proto file path 
const serviceDef = grpc.load(PROTO_PATH);
const creds = grpc.credentials.createInsecure()
// const client = new serviceDef.EmployeeConsumerService(`localhost:${GRPC_PORT}`, creds);
// const grpc_client = new serviceDef.EmployeeProducerService(`10.0.102.166:${GRPC_PORT}`, creds);
// const client = new serviceDef.EmployeeConsumerService(`172.24.235.1:${GRPC_PORT}`, creds);
// const GRPC_HOST = process.env.GRPC_SERVER_IP;
const grpc_client = new serviceDef.KafkaService(`localhost:${GRPC_PORT}`, creds);


function routes() {
    const employeeRouter = express.Router();
    employeeRouter.route('/save')
    .post((req,res) => {
      const employee = new Employee(req.body);
      var headers = {};
      var avroSchema = {
        "namespace": "com.grpc.server.avro",
        "type": "record",
        "name": "Message",
        "fields": [
          {"name": "value",  "type": "string"}
        ]
      };
      headers['correlationId'] = "1234";
      headers['transcationId'] = "5678";
      headers['avroSchema'] = JSON.stringify(avroSchema);

      var request = {topic: ["t1","t2"],value:"Completed Integration", header:headers};
       
    //   emp['id'] = employee.id;

      console.log(request);
        grpc_client.Save(request, function(err, response) {
         if (err) {
          
             console.log("Logging Error" + err);
             return res.json(err.details);
         } else {
            const message= "Persisted Successfully";
            console.log("Logging Success " + response);
            return res.json(message);
         }
     });
       
    });

    return employeeRouter;
}

module.exports = routes;