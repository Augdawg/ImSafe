var express = require('express')
var app = express()
var path = require("path");

app.use('/style', express.static("assets/css/"))
app.use('/fonts', express.static("assets/fonts/"))
app.use('/images', express.static("images/"))

/*http.createServer(function(request, response) {
	fs.readFile("index.html", function(err, data) {
		response.writeHead(200, {'Content-Type':'text/html'});
		response.write(data);
		//response.end();
	});
	fs.readFile("./assets/css/main.css", function(err, data) {
		response.writeHead(200, {'Content-Type':'text/css'});
		response.write(data);
		response.end();
	})
}).listen(3000);*/

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+"/index.html"));
});

app.get('/news', function(req, res) {
	res.sendFile(path.join(__dirname + "/news.html"));
})

app.listen(process.env.PORT, function() {
	console.log('Running on port 3000');
})
