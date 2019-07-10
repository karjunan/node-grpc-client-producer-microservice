const express = require('express');
const client = require('../client'); 
const Employee = require('./employeeModel')


function routes() {
    const employeeRouter = express.Router();
    employeeRouter.route('/save')
    .post((req,res) => {
      console.log("Req =>  " + req);
      var employee = new Employee(req.body);
      console.log(employee);
      delete employee['_id']
      console.log("After => deleteing id => " + employee);
      // const call = client.saveAll();
      // call.on('data', function(emp) {
      //    console.log(emp.employee);
      // });
      // employees.forEach(function (emp) {
      //    call.write({employee: emp});
      // });
      // call.end();
       return res.json(employee);
    });

    return employeeRouter;
}

module.exports = routes;