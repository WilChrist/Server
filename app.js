const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');

var session = require('express-session');

Project =require('./models/project');
Diagram =require('./models/diagram');

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

app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});

// Get Projects
app.get('/api/projects', (req, res) => {
	Project.getProjects((err, projects) => {
		if(err){
			throw err;
		}
		res.json(projects);
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
    var project =req.body;
    Project.addProject(project,function(err, project) {
		if(err){
			throw err;
		}
		res.json(project);
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
	Diagram.getDiagramById(req.params._id, function(err, diagram) {
		if(err){
			throw err;
		}
		res.json(diagram);
	});
});

//Post Diagram
app.post('/api/diagrams', (req, res) => {
    var diagram =req.body;
    Diagram.addDiagram(diagram,function(err, diagram) {
		if(err){
			throw err;
		}
		res.json(diagram);
	});
});

//Put Diagram
app.put('/api/diagrams/:_id', (req, res) => {
    var id=req.params._id;
    console.log("+++++++++"+id);
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
		if(serviceProvider.password==pass){
			req.session.user=serviceProvider;
			req.session.save(function(err){});
			console.log(req);
			res.json({user:serviceProvider});
			
		}else{
			res.json({error:"bad password"});
		}
		
	});
});

app.post('/api/issession',function(req,res){
	req.session.reload(function(err){});
	console.log("here");
	console.log(req.session.user);
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
app.listen(3000);
console.log('Running on port 3000...');