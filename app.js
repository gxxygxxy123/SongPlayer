//index.html, index.css, favicon.ico
//songInsert
//songDelete
var fs = require('fs');
const SONGFILE = "song.txt";

module.exports.index = function (request, response) {
	songRender(response, "Welcome!");
}
module.exports.songInsert = function (request, response, query, files) {
	fs.appendFile(SONGFILE, query["songName"]+","+files.songFile.name+"\n", function(err){
		if(err) throw err;
		songRender(response, "Upload Successful!");
	});
}

module.exports.songDelete = function (request, response, query, files) {
	//query['no'] 是要刪掉的那行 /songDelete?no=
	var str = fs.readFileSync(SONGFILE, 'utf-8');
	var lines = str.split("\n");
	fd = fs.openSync(SONGFILE, 'w');
	for (let i=0;i<lines.length;i++){
		if(lines[i].length>1){
			if(i == query['no']){
				let song = lines[i].split(",");
				fs.unlink(song[1], function(err){
					if(err) throw err;
					console.log(song[1] + ' Delete!');
				});
			}
			else{
				fs.writeSync(fd, lines[i]+"\n");
			}
		}
	}
	fs.closeSync(fd);
	songRender(response, "Delete Successful!");
}
var html = fs.readFileSync('./index.html', 'utf8');
function songRender(response, message){
	var str = fs.readFileSync(SONGFILE, 'utf-8');
	var lines = str.split("\n");
	var line, content="";
	for (let i=0;i<lines.length;i++){
		line = lines[i].split(",");
		if(line.length>1){
			content += '<tr>'
				+'<td>' + (i+1) + '</td>'
				+'<td>' + line[0] + '</td>'
				+'<td>' + line[1] + '</td>'
				+'<td>'
				+'<input name="btnPlay" class="play" type="button" value="播放" mp3filename="' + line[1] + '">'//播放按鈕
				+'<input name="btnDel" class="delete" type="button" value="刪除" mp3no="' + i + '">'//刪除按鈕
				+ '</td>'
				+'</tr>'
		}
		
	}
	response.writeHead(200, {
		'Content-Type':'text/html; charset=utf-8;'
	});
	response.end(html.replace("{{content}}", message+content));
	
}