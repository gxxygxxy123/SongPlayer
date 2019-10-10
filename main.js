var server = require("./server.js");
var app = require("./app.js");


server.route("/", app.index);
server.route("/index", app.index);
server.route("/index.html", app.index);
server.route("/songInsert", app.songInsert);
server.route("/songDelete", app.songDelete);

var port = ((process.argv.length>2)?process.argv[2]:80);
server.start(port);

