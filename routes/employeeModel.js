const mongoose = require('mongoose');

const{ Schema } = mongoose;

const employeeModel = new Schema({
    id: {type: Number},
    badgeNumber: {type:Number},
    firstName: {type:String},
    lastName:{type:String}
},{ _id : false });

module.exports = mongoose.model('Employee', employeeModel);