const root = ".";

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var formidable = require('formidable');

var handle = [];
module.exports.route = function (path, callback) {
	handle[path] = callback;
	handle['songInsert'] = callback;
}
module.exports.start = function(port = 80){
	http.createServer(function(request, response){
		var query="";
		if(request.method == "POST"){
			var form = new formidable.IncomingForm();
			form.parse(request, function (err, query, files) {
					var oldpath = files.songFile.path;
					var newpath = './' + files.songFile.name;
					fs.rename(oldpath, newpath, function (err) {
						if(files.songFile.size == 0) console.log('Please Choose a Non-Empty File!');
						else if (err) throw err;
						//console.log("Upload Successful");
						main(request, response, query, files);
					});
			});
		}
		else{ //GET
			query = qs.parse(url.parse(request.url).query);
			main(request, response, query);
		}

	}).listen(port, '0.0.0.0', function(){ //127.0.0.1
		console.log('HTTP listening at http://%s:%s/', 
		this.address().address, this.address().port);
	});

}
function main(request, response, query, files){
	//console.log(query);
	var pathname = url.parse(request.url).pathname;
	if(typeof(handle[pathname]) == "function") handle[pathname](request, response, query, files);
	else{
		console.log('Request received' + pathname);
		fs.createReadStream(root + pathname)
		.on("error", function(e){
			console.log("Error is: %s", e);
			if(e.code === "ENOENT"){
				response.writeHead(200, {
					'Content-Type':'text/html; charset=utf-8;'
				});
				response.write(pathname + 'File not found');
				response.end();
			}
			else {throw e;}
		})
		.pipe(response);
	}
	//if(pathname == "/songInsert"){app.songInsert()}
}