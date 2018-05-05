const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

// Default Elements
  function defaultElement(){
    //super
    Schema.apply(this, arguments);

    //add defaults elements
    this.add({
        id:{type: String, required : false},
        author:{type: String, required : true},
        name:{type: String,required: true},
        description:{type: String, required: true},
        state:{type: String, required: false, Default:"unvalidate"},
        location:{type: String, required: true},
        registering_date:{type: Date,Default: Date.now()},
        begin_date:{type: Date,Default: Date.now()},
        end_date:{type: Date,Default: Date.now()}, 
        id_diagram:{type: String, required: false} 
    });
};
util.inherits(defaultElement, Schema);
// Citizen Schema
const ProjectSchema = new defaultElement();
 ProjectSchema.add({

 });
 const Project = module.exports = mongoose.model('Project', ProjectSchema);
// Get Projects
module.exports.getProjects = (callback, limit) => {
	Project.find(callback).limit(limit);
}
// Get Project
module.exports.getProjectById = (id,callback) => {
	Project.findById(id,callback);
}
// Add Project
module.exports.addProject=function (project,callback){
	Project.create(project,callback);
}
// Update Project
module.exports.updateProject=function (id,project,option,callback){
    var query={_id:id};
    
	Project.findOneAndUpdate(query,project,option,callback);
}

// Delete Project
module.exports.removeProject=function (id,callback){
    var query={_id:id};
	Project.remove(query,callback);
}