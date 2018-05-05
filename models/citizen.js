const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

// Default Elements
  function defaultElement(){
    //super
    Schema.apply(this, arguments);

    //add defaults elements
    this.add({
        first_name:{type: String,required: false},
        last_name:{type: String, required: false},
          email:{
            type: String,
            required: true
          },
          username:{
            type: String,
            required: true
          },
          password:{
            type: String,
            required: true
          },
          birth_date:{
            type: Date,
            required: false,
            Default:Date.now()
          },
          gender:{
            type: String,
            required: false
          },
          location:{
            type: String,
            required: false
          },
          registering_date:{
            type: Date,
            Default: Date.now()
          }
    });
};
util.inherits(defaultElement, Schema);
// Citizen Schema
const CitizenSchema = new defaultElement();
 CitizenSchema.add({

 });


const Citizen = module.exports = mongoose.model('Citizen', CitizenSchema);