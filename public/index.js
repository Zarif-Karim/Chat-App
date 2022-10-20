let socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const appendMessage = (msg,type) => {
    const li = document.createElement('li');
    li.classList.add(type);
    li.innerText = msg;
    messages.appendChild(li)
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(input.value){
        appendMessage(input.value,'outgoing');
        socket.emit('chat message', input.value);
        input.value = ''
    }
})

socket.on('new message', (msg)=>{
    appendMessage(msg,'incoming');
});