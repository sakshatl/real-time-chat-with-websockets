let socket = io('http://localhost:5000');

        let chatForm = document.querySelector('#chat-form');
        let message = document.querySelector('#message');
        let handle = document.querySelector('#handle');
        let outputBox = document.querySelector('#output-box');


        chatForm.addEventListener('submit', function(e){
            e.preventDefault();
            socket.emit('chat', {
                handle: handle.value,
                message: message.value
            });
            chatForm.reset();

        })

        socket.on('chat', function(data){
            outputBox.innerHTML += `
                <p class="chat-string grey lighten-3"><strong class="greyt-text text-darken-4">${data.handle}:</strong> ${data.message}</p>
                <div class="divider"></div>
            `
        })


    