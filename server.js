var http = require('http'),
	fs = require('fs'),
	ejs = require('ejs'),
	qs = require('querystring');
var settings = require('./settings');
var n = 0;
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/public/bbs.ejs',"utf8");
var posts = [];
function renderForm(posts, res){
	var data = ejs.render(template, {
		posts: posts
	});
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	res.end();	
}

server.on('request', function(req, res){
	if(req.method === 'POST'){
		req.data = '';
		req.on('readable', function(){
			req.data += req.read();
		});
		req.on('end', function(){
			var query = qs.parse(req.data);
			posts.push(query.name);
			renderForm(posts, res);
		});
	} else {
		renderForm(posts, res)
		console.log(qs);
	}

	// fs.readFile(__dirname + "/public/hello.html","utf8",function(err,data){
	//     if(err){		
	// 		res.writeHead(404, {'Content-Type': 'text/plain'});
	// 		res.write('not found');
	// 		return res.end();
	// 	}
	// 	var data = ejs.render(template, {
	// 		title: 'hello',
	// 		content: '<strong>World!!</strong>',
	// 		n: n++
	// 	})

	// });
});
server.listen(settings.port, settings.host);
console.log('server...');