define(['jquery', 'socketio', 'mustache'],function($, io, mustache){


    var socket = io.connect('http://localhost:3000');

    console.log('socket connected');

    renderTemplate();

    $(document).on('click', 'button', function(){

        socket.emit('user-event', {
            'data': $(this).data('action')
        });

    });

    socket.on('update', function(data){
        console.log(data);

        renderTemplate(data.template);

    });

    function renderTemplate (_tmplt) {

        console.log(_tmplt);

        var tmplt = !_tmplt ? 'index' : _tmplt;

        $.get('/render/'+tmplt+'.mustache',function(template){

            $('content').html(mustache.render(template));

        });

    }

});