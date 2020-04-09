const socket = io();


let chatForm = document.querySelector("#chatForm");
let chatMessages = document.querySelector('#chatMessages');

socket.on("message", data => {
  outputMessage(data); // message from the server
  // scroll down behaviour to the lastest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
})


// function template for output message ui
function outputMessage(data) {
  const div = document.createElement("DIV")
  div.classList.add("message");

  // if the msg text is a welcome message
  if (data.sender === "Chatbot" && data.type === "Welcome text") {
    div.innerHTML = `
    <span class="meta">${data.sender} <span>03:58</span></span>
    <span class="text green lighten-4"> ${data.message} </span>
    `;
  } // if the message text is for the new user joined
  else if (data.sender === "Chatbot" && data.type === "New user") {
    div.innerHTML = `
    <span class="meta">${data.sender} <span>03:58</span></span>
    <span class="text blue lighten-4"> ${data.message} </span>
    `;
  } // if the message text is for user disconnected 
  else if (data.sender === "Chatbot" && data.type === "Disconnect text") {
    div.innerHTML = `
    <span class="meta">${data.sender} <span>03:58</span></span>
    <span class="text red lighten-4"> ${data.message} </span>
    `;
  }
  else { // if it is a normal message
    div.innerHTML = `
      <span class="meta">${data.sender} <span>03:58</span></span>
      <span class="text grey lighen-4 white-text "> ${data.message} </span>
      `;
  }

  document.querySelector('#chatMessages').append(div);

}

// handle chat form event
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get msg text
  let chatMessage = e.target["chat-message"];
  if (chatMessage.value) {
    // emitting a msg to the server
    socket.emit("chatMessage", { type: "Chat message", sender: "Sakshat", message: chatMessage.value });
    // clear off the input then
    chatMessage.value = "";
  }
});
