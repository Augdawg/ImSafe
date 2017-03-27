var express = require('express')
var app = express()
var path = require("path");
var request = require("request");
const aws = require('aws-sdk');

app.use('/style', express.static("assets/css/"))
app.use('/fonts', express.static("assets/fonts/"))
app.use('/images', express.static("images/"))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+"/index.html"));
});

app.get('/news', function(req, res) {
	res.sendFile(path.join(__dirname + "/news.html"));
})

app.get('/rss', function(req, res) {
	request({
		method: 'GET',
		url: 'https://news.google.com/?output=rss',
	}, function(error, response, body) {
		if (error) {
			console.log("rss error");
		} else {
			res.send(body);
		}
	})
})

app.post('/', function(req, res) {
	let s3 = new aws.S3({
		api_key: process.env.api_key
	});
	res.send(s3.api_key);
	/*res.send(JSON.stringify(req.query.email));
	var subscriber = JSON.stringify({
		"email_address":req.query.email,
		"status":"subscribed"
	});
	request({
		method:'POST',
		url:' https://us15.api.mailchimp.com/3.0/lists/acd4837d6e/members',
		body: subscriber,
		headers: {
			Authorization: 'apikey 08dbbe80641c7c8c924ad98e6f406e70-us15',
			'Content-Type':'application/json'
		}
	},
	function(error, response, body) {
		if (error) {
			console.log("error");
			res.send("error");
		} else {
			var bodyObj = JSON.parse(body);
			console.log(bodyObj.status);
			console.log(bodyObj.email_address);
		}
	})*/
})

app.listen(process.env.PORT || 3000, function() {
	console.log('Running on port 3000');
})
