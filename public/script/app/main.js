define(['jquery', 'socketio', 'mustache'], function ($, io, mustache) {


    var socket = io.connect('http://localhost:3000');

    console.log('socket connected');

    renderTemplate();

    $(document).on('click', 'button', function () {

        socket.emit('user-event', {
            'data': $(this).data('action')
        });

    });

    socket.on('update', function (data) {


        renderTemplate(data.template, data.renderData);

    });

    function renderTemplate(_tmplt, data) {


        var template = !_tmplt ? 'index' : _tmplt;

        $.get('/render/' + template + '.mustache', function (result) {

            $('.content').html(mustache.render(result, data));

        });

    }

});