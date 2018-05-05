const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

// Default Elements
  function defaultElement(){
    //super
    Schema.apply(this, arguments);

    //add defaults elements
    this.add({
        id_diagram:{type: String, required: false},
        id_project:{type: String, required: true},
        id_user:{type: String, required: false},
        global_evaluation:{type: Number, required: true},
        objet:{type: Object, required: true},
        creation_date:{type: Date,Default: Date.now}, 
        last_modif_date:{type: Date,Default: Date.now}   
    });
};
util.inherits(defaultElement, Schema);
// Citizen Schema
const EvaluationSchema = new defaultElement();
 EvaluationSchema.add({

 });
 const Evaluation = module.exports = mongoose.model('Evaluation', EvaluationSchema);

 // Get Evaluation
module.exports.getEvaluationsById = (id,callback, limit) => {
    var query={id_project:id};
	Evaluation.find(query,callback).limit(limit);
}
// Get Evaluation by Id
module.exports.getEvaluationById = (id,callback) => {
	Evaluation.findById(id,callback);
}
// Add Evaluation
module.exports.addEvaluation=function (evaluation,callback){
	Evaluation.create(evaluation,callback);
}

// Update Evaluation
module.exports.updateEvaluation=function (id,evaluation,option,callback){
    var query={_id:id};
    console.log("*******************************");
    console.log(query);
	Evaluation.findOneAndUpdate(query,evaluation,option,callback);
}

// Delete Evaluation
module.exports.removeEvaluation=function (id,callback){
    var query={_id:id};
	Evaluation.remove(query,callback);
}