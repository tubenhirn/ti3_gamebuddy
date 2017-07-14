var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

var port = 3000;

//var mongo = require('mongodb');


var lessMiddleware = require('less-middleware');

app.use(lessMiddleware(path.join(__dirname, 'server', 'less'), {
    preprocess: {
        path: function (pathname, req) {
            return pathname.replace('/style/css/', '/');
        }
    },
    dest: path.join(__dirname, 'public'),
    force: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/mustache', express.static(path.join(__dirname, 'node_modules', 'mustache')));
app.use('/render', express.static(path.join(__dirname, 'templates', 'mustache')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

io.on('connection', function (socket) {

    console.log('a user connected');

    socket.on('disconnect', function () {

        console.log('user disconnected');
        io.emit('update', "update");

    });


    socket.on('user-event', function(_data){

        var data = {
            template : _data.data,
            eventType : _data.data,
            renderData : {}
        };



        io.emit('update', data);

    });


});


http.listen(port, function () {
    console.log('listening on *:' + port);
});

