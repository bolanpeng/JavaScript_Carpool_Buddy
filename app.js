var express = require('express');
var mysql = require('./dbconnect.js');
var fs = require('fs');
var request = require('request');
var aws = require('aws-sdk');
var util = require('util');
var http = require('http');
var app = express();
var credentials = require('./credentials.js');


//Update line below to desired port.
app.set('port', process.env.POST || 3000);

//No modifications required below this line.
//----------------------------------------------------------------------

var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
       section: function(name, options){
          if(!this._sections) this._sections = {};
          this.sections[name] = options.fn(this);
          return null; 
       }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Please do not share these keys outside of CS361
aws.config.update({
  'accessKeyId': 'AKIAJE2QLY5S6BFH4LHQ',
  'secretAccessKey': '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',
  'region': 'us-west-2'
});
var sns = new aws.SNS();


//------------------------------ Homepage ------------------------------------
app.get('/', function(req, res){  
   var context = {};  
   context.header = 'Reducing Air Pollution through Carpooling';
   context.topic  = '    Customer Vision Statement Summary';
   context.blog = fs.readFileSync(__dirname + '/views/content/homepage.txt'); 
   res.render('projectb', context );
});


//------------------------------ User Stories ------------------------------------
app.get('/story1', function(req, res){
  var context = {};
  context.header = "User Story 1: Create A Profile";  
  context.blog = fs.readFileSync(__dirname + '/views/content/story1.txt');
  res.render('projectb', context);
});

app.get('/story2', function(req, res){
	var context = {};
	context.header = "User Story 2: Search for Profile Matches";	
	context.blog = fs.readFileSync(__dirname + '/views/content/story2.txt');
	res.render('projectb', context);
});

app.get('/story3', function(req, res){
	var context = {};
	context.header = "User Story 3: Search and Send Message";	
	context.blog = fs.readFileSync(__dirname + '/views/content/story3.txt');
	res.render('projectb', context);
});


//------------------------------ Unit Tests ------------------------------------

app.get('/unit1', function(req, res){  
   var context = {};  
   context.header = 'Unit Test 1: Create Profile';
   context.topic  = 'Unit Tests to Verify Insert';
   context.blog = fs.readFileSync(__dirname + '/views/content/unit1.txt'); 
   res.render('projectb', context );
});

app.get('/unit2', function(req, res){  
   var context = {};  
   context.header = 'Unit Test 2: Search for Match';
   context.topic  = 'Unit Tests to Verify Search';
   context.blog = fs.readFileSync(__dirname + '/views/content/unit2.txt'); 
   res.render('projectb', context );
});

//------------------------------ Spikes ------------------------------------


app.get('/spike1', function(req, res){  
   var context = {};  
   context.header = 'Spike 1: Calculating Distance from Addresses';
   context.topic  = 'Google Maps Distance Matrix API';
   context.blog = fs.readFileSync(__dirname + '/views/content/spike1.txt'); 
   res.render('projectb', context );
});

app.get('/spike2', function(req, res){  
   var context = {};  
   context.header = 'Spike 2: AWS SNS Subscription';
   context.topic  = 'Amazon Simple Notification Service';
   context.blog = fs.readFileSync(__dirname + '/views/content/spike2.txt'); 
   res.render('projectb', context );
});


app.get('/spike3', function(req, res){  
   var context = {};  
   context.header = 'Spike 3: AWS SNS Messaging';
   context.topic  = '';
   context.blog = fs.readFileSync(__dirname + '/views/content/spike3.txt'); 
   res.render('projectb', context );
});


//------------------------------ Services ------------------------------------

app.post('/insert',function(req,res,next){
  var context = {};
  if (req.body.email == '') { req.body.email = null; }
  mysql.pool.query("INSERT INTO profile (`name`, `email`, `homezipcode`, `workzipcode`, `leavehome`, `leavework`, `waittime`, `emptyseats`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
    [req.body.name, req.body.email, req.body.homezipcode, req.body.workzipcode, req.body.leavehome, req.body.leavework, req.body.waittime, req.body.emptyseats], function(err, result){
    if(err){
      res.send(err.message);
    } else {
      context.Id = result.insertId;
      context.body = req.body;
      res.send(context);
    }
  });
});

app.get('/showtable',function(req,res){
    var context = {};
    context.header = "Show Profiles Results";  
    mysql.pool.query('SELECT * FROM profile', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('query', context);
    });
});

app.post('/search', function(req, res){
	var context = {};
	var searchQuery = "SELECT name, email FROM profile WHERE homezipcode = ? AND workzipcode = ? AND leavehome >= TIMEDIFF(?,?) AND leavehome <= ADDTIME(?,?) AND leavework >= TIMEDIFF(?,?) AND leavework <= ADDTIME(?,?)";
	mysql.pool.query(searchQuery,[req.body.homezipCode, req.body.workzipCode, req.body.leavehome, 0.5 * req.body.waittime * 100, req.body.leavehome, 0.5 * req.body.waittime * 100, req.body.leavework, 0.5 * req.body.waittime * 100, req.body.leavework, 0.5 * req.body.waittime * 100], function(err,rows,fields) {

		if(err) {
		 context.status = "ERROR";
		} 
		context.status = "OK";
		context.names = new Array();
		context.emails = new Array();
		for (i in rows){
			context.names.push(rows[i]["name"]);	
			context.emails.push(rows[i]["email"]);
		}
		res.json(context);
	});
});

app.get('/distance', function(req, res, next) {
  var context = {};
  
  var url = "https://www.zipcodeapi.com/rest/" + credentials.distanceKey + "/distance.json/";
  // change the two zip codes to the values returned from our database
  url = url + "94111/90036/mile";
  
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      context.distance = JSON.parse(body).distance;
      res.render('projectb', context);
    }
    else  {
	  if(response) {
        console.log(response.statusCode);	
      }
      next(err);
    }  
  });	
});

app.get('/subscribe', function(req,res,next){
	console.log("topic:" + req.query.topic);
	console.log("email:" + req.query.email);
  var params = {
      Name: req.query.topic   
  };
  sns.createTopic(params, function(err, data) {
      var response = {};
      if (err) {
          response.status = err.message;
          res.send(response);
      }
      else {
          var params = {
             'TopicArn':  data.TopicArn,
             'Protocol':  'email',
             'Endpoint':  req.query.email
          }
          sns.subscribe(params, function(err, data) {
              if (err) {
                  response.status = err.message;
              }
              else {
                  response.status = 'Pending conformation sent to ' + req.query.email + ' for topic ' + req.query.topic; 
              }
              res.send(response);
          });
      }
  }); 
});


app.get('/message', function(req, res, next) {

  var topic = credentials.awsbase + req.query.topic;	
  var params = {
    'Message': req.query.message,
    'Subject': 'Car pool update',
    'TopicArn': topic,
  };
  sns.publish(params, function(err, data) {
    var response = {};
    if (err) {
	  response.status = err.message;	
    }
    else {
	  response.status = "Message sent to " + req.query.topic;	
	}
	res.send(response);	  
  });
});


app.get('/s1', function(req, res, next) {
  var base_url = "https://maps.googleapis.com/maps/api/distancematrix/json?";
  var query = "origins=" + req.query.address1.replace(/\s+/g, '+');
  query = query + "+" + req.query.city1.replace(/\s+/g, '+');
  query = query + "+" + req.query.state1.replace(/\s+/g, '+');
  query = query + "&destinations=" + req.query.address2.replace(/\s+/g, '+');
  query = query + "+" + req.query.city2.replace(/\s+/g, '+');
  query = query + "+" + req.query.state2.replace(/\s+/g, '+');
  query = query + "&mode=driving&units=imperial&key=" + credentials.distanceMatrixKey;
  var url = base_url + query;
  request(url, Distance);

  function Distance(error, response, body) {
    if(!error && response.statusCode < 400) {
        var payload = {};
        var json = JSON.parse(body);
        if (json.status == 'OK'){
           try {
               payload.distance = json.rows[0].elements[0].distance.text;
               payload.duration = json.rows[0].elements[0].duration.text;
           } 
           catch(err) {
               payload.distance = '?';
               payload.duration = '?';
           }
        } else {
           payload.distance = '?';
           payload.duration = '?';
        }
        res.send(payload);
     } else {
        res.send({});
     } 
  } 
});

app.get('/s2', function(req, res, next) {
  var params = {
      Name: req.query.topic   
  };
  sns.createTopic(params, function(err, data) {
      var response = {};
      if (err) {
          response.status = err.message;
          res.send(response);
      }
      else {
          var params = {
             'TopicArn':  data.TopicArn,
             'Protocol':  'email',
             'Endpoint':  req.query.email
          }
          sns.subscribe(params, function(err, data) {
              if (err) {
                  response.status = err.message;
              }
              else {
                  response.status = 'Pending conformation sent to ' + req.query.email + ' for topic ' + req.query.topic; 
              }
              res.send(response);
          });
      }
  }); 
});


app.get('/s3', function(req, res, next) {
  var topic = credentials.awsbase + req.query.topic;
  var params = {
      'Message': req.query.message,
      'Subject': 'Car pool update',
      'TopicArn':  topic,
  };
  sns.publish(params, function(err, data) {
      var response = {};
      if (err)  {
         response.status = err.message;
      }
      else   {
         response.status = "Message sent to " + req.query.topic;
      }
      res.send(response);
  });
});

app.get('/loaddb', function(req, res, next) {
    var context = {};
    var sql = fs.readFileSync('./projectb.sql', "utf8");
    mysql.pool.query(sql, function(err,result) {
      if(err) {
         context.status = "ERROR";
         console.log(context);
         res.send(JSON.stringify(context));
      } 
      context.status = "OK";
      res.send(JSON.stringify(context));
   });
});

app.get('/team', function(req, res){  
   var context = {};  
   context.header = 'Project Team Members';
   context.topic  = '';
   context.blog = fs.readFileSync(__dirname + '/views/content/team.txt'); 
   res.render('projectb', context );
});

app.post('/itest', function(req, res, next){ 
   var query = "SELECT * from profile where email='" + req.body.email + "';";
   mysql.pool.query(query, function(err, rows, fields) {
      if(err) {
         next(err);
         return;
      }
      res.send(JSON.stringify(rows));
   });
});



//custom 404 page
app.use(function(req, res) {
   res.status(404);
   res.render('404');
});  

//custom 500 page
app.use(function(err, req, res, next) {
   console.error(err.stack);
   res.status(500);
   res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' +
         app.get('port') + '; press Ctrl-C to terminate.' );
});
