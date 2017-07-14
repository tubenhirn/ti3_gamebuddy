define(['jquery', 'socketio', 'mustache'],function($, io, mustache){


    var socket = io.connect('http://localhost:3000');

    console.log('socket connected');

    $(document).on('click', 'button', function(){

        socket.emit($(this).data('action'), {
            'data': $(this).data('action')
        });

    });



    socket.on('update', function(data){
        console.log(data);
    });

});