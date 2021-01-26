 
const socket = io("http://localhost:8000");
//Get DOM element in respective  js variables
const form =document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');

const messageContainer =document.querySelector(".container");
//audio that will play while receiving sms
var audio=new Audio('sound.mp3');
//function which will append event info to the container
const append =(message,position)=>{
 const messageElement=document.createElement('div') ;  
 messageElement.innerText= message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left'){

audio.play();

}

}
//if the form get submitted , send server the msg
form.addEventListener('submit',(e)=>{
e.preventDefault();
const message=messageInput.value;
append(`You: ${message}`,'right');
socket.emit('send',message);
messageInput.value=''
})
//Ask new user for name and let the server know
const name= prompt("Enter your name to join");
socket.emit('new-user-joined', name);
//the person who join the chat except that person everyone can see it
socket.on('user-joined',name=>{
append(`${name}  joined the chat`,'right');

});
//if server send a msg received it
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
    
    });
    //if any user left the chat,append the info to the container
    socket.on('left',name=>{
        append(`${name}: left the chat`,'left');
        
        });