const socket = io();

    socket.on("message", message => {
      console.log(message)
    });

    let chatForm = document.querySelector("#chatForm");
    let chatMessages = document.querySelector('#chatMessages');

    socket.on("message", message => {
      outputMessage(message); // message from the server

      // scroll down behaviour to the lastest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })


    // function template for output message ui
    function outputMessage(message) {
      const div = document.createElement("DIV")
      div.classList.add("message");
      div.innerHTML = `
      <span class="meta">Sakshat <span>03:58</span></span>
      <span class="text"> ${message} </span>
      `;
      document.querySelector('#chatMessages').append(div);

    }

    // handle chat form event
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // get msg text
      let chatMessage = e.target["chat-message"];
      if (chatMessage.value) {
        // emitting a msg to the server
        socket.emit("chatMessage", chatMessage.value);
        // clear off the input then
        chatMessage.value = "";
      }
    });
