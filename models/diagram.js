const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

// Default Elements
  function defaultElement(){
    //super
    Schema.apply(this, arguments);

    //add defaults elements
    this.add({
        id:{type: String, required: false},
        name:{type: String,required: true},
        objet:{type: Object, required: true},
        creation_date:{type: Date,Default: Date.now}, 
        last_modif_date:{type: Date,Default: Date.now}   
    });
};
util.inherits(defaultElement, Schema);
// Citizen Schema
const DiagramSchema = new defaultElement();
 DiagramSchema.add({

 });
 const Diagram = module.exports = mongoose.model('Diagram', DiagramSchema);

 // Get Diagram
module.exports.getDiagrams = (callback, limit) => {
	Diagram.find(callback).limit(limit);
}
// Get Diagram by Id
module.exports.getDiagramById = (id,callback) => {
	Diagram.findById(id,callback);
}
// Add Diagram
module.exports.addDiagram=function (diagram,callback){
	Diagram.create(diagram,callback);
}

// Update Diagram
module.exports.updateDiagram=function (id,diagram,option,callback){
    var query={_id:id};
    console.log("*******************************");
    console.log(query);
	Diagram.findOneAndUpdate(query,diagram,option,callback);
}

// Delete Diagram
module.exports.removeDiagram=function (id,callback){
    var query={_id:id};
	Diagram.remove(query,callback);
}