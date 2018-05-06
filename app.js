const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
var fs = require('fs');
var session = require('express-session');
const PORT = process.env.PORT || 5000;

Project =require('./models/project');
Diagram =require('./models/diagram');
Evaluation =require('./models/evaluation');
ServiceProviders =require('./models/serviceProvider');

ServiceProviders =require('./models/serviceProvider');

mongoose.connect(config.database);
let db = mongoose.connection;


// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Init App
const app = express();
app.use(bodyParser.json());

var cors=require('cors');
app.use(cors());

app.use( session({secret : 's3Cur3',resave: false,saveUninitialized: true, cookie: {
	path: "/",
	httpOnly: true,
	cookieName: 'session'
}}));

/*app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});*/
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+ '/index.html'));
});
app.get('/main.html', function (req, res) {
    res.sendFile(path.join(__dirname+ '/main.html'));
});
app.get('/dashboard.html', function (req, res) {
    res.sendFile(path.join(__dirname+ '/dashboard.html'));
});
app.get('/evaluation.html', function(req,res){
    res.sendFile(path.join(__dirname+ '/evaluation.html'));
});
app.get('/navigation.html', function (req, res) {
    res.sendFile(path.join(__dirname+ '/navigation.html'));
});
app.get('/profil.html', function (req, res) {
    res.sendFile(path.join(__dirname+ '/profil.html'));
});
app.get('/liste_projets.html', function (req, res) {
    res.sendFile(path.join(__dirname+ '/liste_projets.html'));
});
app.get('/erreur.html', function (req, res) {
    res.sendFile(path.join(__dirname+ '/erreur.html'));
});
app.get('/projectrecap.html', function (req, res) {
    res.sendFile(path.join(__dirname+ '/projectrecap.html'));
});
// Get Projects
app.post('/api/projectslist', (req, res) => {
	Project.getProjects((err, projects) => {
		if(err){
			throw err;
		}
		res.json({list:projects});
	});
});

//Get Project by id
app.get('/api/projects/:_id', (req, res) => {
	Project.getProjectById(req.params._id, function(err, project) {
		if(err){
			throw err;
		}
		res.json(project);
	});
});

//Post Project
app.post('/api/projects', (req, res) => {
    var project =req.body.projet;
    Project.addProject(project,function(err, project) {
		if(err){
			throw err;
		}
		res.json({success:true});
	});
});

//Put Project
app.put('/api/projects/:_id', (req, res) => {
    var id=req.params._id;
    var project =req.body;
    Project.updateProject(id,project,{},function(err, project) {
		if(err){
			throw err;
		}
		Project.getProjectById(req.params._id, function(err, project) {
            if(err){
                throw err;
            }
            res.json(project);
        });
	});
});

//Delete Project
app.delete('/api/projects/:_id', (req, res) => {
    var id=req.params._id;
    Project.removeProject(id,function(err, project) {
		if(err){
			throw err;
		}
		res.json(project);
	});
});

//Get Diagrams
app.get('/api/diagrams', (req, res) => {
	Diagram.getDiagrams((err, diagrams) => {
		if(err){
			throw err;
		}
		res.json(diagrams);
	});
});

//Get Diagram by id
app.get('/api/diagrams/:_id', (req, res) => {
	//console.log(req.params._id);
	Project.getProjectById(req.params._id,function(err, project) {
		if(err){
			throw err;
		}
		Diagram.getDiagramById(project.id_diagram, function(err, diagram) {
			//console.log(diagram);
			if(err){
				throw err;
			}
			res.json({gantt:diagram});
		});
	});
	
});

//Post Diagram
app.post('/api/diagrams', (req, res) => {
	var diagram =req.body.gantt;
	//console.log(req.body.gantt);
    Diagram.addDiagram(diagram,function(err, diagram) {
		if(err){
			throw err;
		}
		res.json({ganttsaved:diagram});
	});
});

app.post('/api/getprojet',function(req,res){
    var p = fs.readFileSync('liste_serveurs.json','UTF-8');
    res.send({projet:p});
});
//Put Diagram
app.put('/api/diagrams/:_id', (req, res) => {
    var id=req.params._id;
    //console.log("+++++++++"+id);
    var diagram =req.body;
    Diagram.updateDiagram(id,diagram,{},function(err, diagram) {
		if(err){
			throw err;
		}
		res.json(diagram);
	});
});

//Delete Diagram
app.delete('/api/diagrams/:_id', (req, res) => {
    var id=req.params._id;
    Diagram.removeDiagram(id,function(err, diagram) {
		if(err){
			throw err;
		}
		Diagram.getDiagramById(req.params._id, function(er, diag) {
            if(er){
                throw er;
            }
            res.json(diag);
        });
	});
});
//**************************************************************************************************************************************** */

// Get ServiceProviders
app.get('/api/serviceproviders', (req, res) => {
	ServiceProviders.getServiceProviders((err, serviceProviders) => {
		if(err){
			throw err;
		}
		res.json(serviceProviders);
	});
});

//Get ServiceProviders by id
app.get('/api/serviceProviders/:_id', (req, res) => {
	ServiceProviders.getServiceProviderById(req.params._id, function(err, serviceProvider) {
		if(err){
			throw err;
		}
		res.json(serviceProvider);
	});
});

//Post login
app.post('/api/login', (req, res) => {
	var mail=req.body.email;
	var pass=req.body.password;
	ServiceProviders.getServiceProviderByEmail(mail, function(err, serviceProvider) {
		if(err){
			throw err;
		}
		//console.log(serviceProvider);
		if(serviceProvider!=null){
				if(serviceProvider.password==pass){
				req.session.user=serviceProvider;
				req.session.save(function(err){});
				//console.log(req);
				res.json({user:serviceProvider});
				
			}else{
				res.json({user:null});
			}
		}else{
			res.json({user:null});
		}
		
		
	});
});

app.post('/api/deconnect',function(req,res){
    req.session.destroy();
	req.session=null;
	res.clearCookie();
	res.redirect('/');
});

app.post('/api/issession',function(req,res){
	req.session.reload(function(err){});
	//console.log("here");
	//console.log(req.session.user);
if(req.session.user){
res.send({session:true,user:req.session.user});
}
else{
res.send({session:false});
}
});


//Post ServiceProviders
app.post('/api/serviceProviders', (req, res) => {
	var serviceProvider =req.body;
    ServiceProviders.addServiceProvider(serviceProvider,function(err, serviceProvider) {
		if(err){
			throw err;
		}
		res.json(serviceProvider);
	});
});

//Put ServiceProviders
app.put('/api/serviceProviders/:_id', (req, res) => {
    var id=req.params._id;
	var serviceProvider =req.body;
    ServiceProviders.updateServiceProvider(id,serviceProvider,{},function(err, serviceProvider) {
		if(err){
			throw err;
		}
		ServiceProviders.getServiceProviderById(req.params._id, function(err, serviceProvider) {
            if(err){
                throw err;
            }
            res.json(serviceProvider);
        });
	});
});

//Delete ServiceProviders
app.delete('/api/serviceProviders/:_id', (req, res) => {
    var id=req.params._id;
    ServiceProviders.removeServiceProvider(id,function(err, serviceProvider) {
		if(err){
			throw err;
		}
		res.json(serviceProvider);
	});
});

/***************************************************************************************************************************************** */

//Get Evaluations
app.post('/api/evaluationsp/:_id', (req, res) => {
	Evaluation.getEvaluationsById(req.params._id,(err, evaluations) => {
		if(err){
			throw err;
		}
		////////////
		var tab=[];
		evaluations.forEach(element => {
			tab.push(element.global_evaluation);
		});
		Project.getProjectById(req.params._id, (er, proj)=>{
			if(err){
				throw err;
			}
			
			res.json({projectevaluations:{tab:tab,projet:proj}});
		});
		///////////
		
	});
});


//Post Evaluation
app.post('/api/evaluations', (req, res) => {
	var evaluation =req.body.evaluation;
	//console.log(req.body.evaluation);
    Evaluation.addEvaluation(evaluation,function(err, evaluation) {
		if(err){
			throw err;
		}
		res.json({evaluationsaved:evaluation});
	});
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));