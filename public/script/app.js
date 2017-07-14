requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../script/app',
        jquery : '../jquery/jquery',
        mustache : '../mustache/mustache',
        socketio: '../socket.io/socket.io'
    },
    shim: {
        'socketio': {
            exports: 'io'
        }
    }
});

requirejs(['app/main']);