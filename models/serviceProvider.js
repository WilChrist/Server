const mongoose = require('mongoose');
let CITIZEN= require('../models/citizen');

const ServiceProviderSchema=CITIZEN.schema;
ServiceProviderSchema.add({
    company:{
        type: String,
        required: false
      }
});


const ServiceProvider = module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);

// Get ServiceProvider
module.exports.getServiceProviders = (callback, limit) => {
	ServiceProvider.find(callback).limit(limit);
}
// Get ServiceProvider
module.exports.getServiceProviderById = (id,callback) => {
	ServiceProvider.findById(id,callback);
}
// Get ServiceProvider by email
module.exports.getServiceProviderByEmail = (email,callback) => {
    var query={email:email}
	ServiceProvider.findOne(query,callback);
}
// Add ServiceProvider
module.exports.addServiceProvider=function (serviceProvider,callback){
	ServiceProvider.create(serviceProvider,callback);
}
// Update ServiceProvider
module.exports.updateServiceProvider=function (id,serviceProvider,option,callback){
    var query={_id:id};
    
	ServiceProvider.findOneAndUpdate(query,serviceProvider,option,callback);
}

// Delete ServiceProvider
module.exports.removeServiceProvider=function (id,callback){
    var query={_id:id};
	ServiceProvider.remove(query,callback);
}
