var express = require('express')
var app = express()
var path = require("path");
var request = require("request");
var feedparser = require('rss-parser');

app.use('/style', express.static("assets/css/"))
app.use('/fonts', express.static("assets/fonts/"))
app.use('/images', express.static("images/"))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+"/index.html"));
});

app.get('/news', function(req, res) {
	res.sendFile(path.join(__dirname + "/news.html"));
})

app.get('/news/rss', function(req, res) {
	/*var rssString = '';
	request({
		method: 'GET',
		url: 'https://news.google.com/?output=rss',
	}, function(error, response, body) {
		if (error) {
			console.log("rss error");
		} else {
			this.pipe(feedparser);
			res.send(body);
		}
	})*/
	var url = 'https://www.justice.gov/feeds/opa/justice-news.xml';
	var titles = [];
	feedparser.parseURL(url, function(err, parsed) {
		res.send(parsed.feed);
	});
	console.log(titles.length);
})

app.post('/', function(req, res) {
	var auth = 'apikey ' + process.env.api_key;
	var subscriber = JSON.stringify({
		"email_address":req.query.email,
		"status":"subscribed"
	});

	request({
		method:'POST',
		url:' https://us15.api.mailchimp.com/3.0/lists/acd4837d6e/members',
		body: subscriber,
		headers: {
			Authorization: auth,
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
	})
})

app.listen(process.env.PORT || 3000, function() {
	console.log('Running on port 3000');
})
