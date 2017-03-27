var express = require('express')
var app = express()
var path = require("path");
var request = require("request");

app.use('/style', express.static("assets/css/"))
app.use('/fonts', express.static("assets/fonts/"))
app.use('/images', express.static("images/"))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+"/index.html"));
});

app.get('/news', function(req, res) {
	res.sendFile(path.join(__dirname + "/news.html"));
})

app.post('/', function(req, res) {
	res.send(JSON.stringify(req.query.email));
	var subscriber = JSON.stringify({
		"email_address":req.query.email,
		"status":"subscribed"
	});
	request({
		method:'POST',
		url:' https://us15.api.mailchimp.com/3.0/lists/ecae46aa40/members',
		body: subscriber,
		headers: {
			Authorization: 'apikey 08dbbe80641c7c8c924ad98e6f406e70-us15',
			'Content-Type':'application/json'
		}
	},
	function(error, response, body) {
		if (error) {
			console.log("error");
		} else {
			var bodyObj = JSON.parse(body);
			console.log(bodyObj.status);
			console.log(bodyObj.email_address);
		}
	})
})

app.listen(3000, function() {
	console.log('Running on port 3000');
})
