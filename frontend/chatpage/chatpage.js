
function savetodatabase(){
    var messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    console.log(message);
    const obj={
        message
    }
    const token = localStorage.getItem('token');

    axios.post("http://localhost:4000/message/add-message", obj , {headers :{"Authorization" : token}}).
    then((response)=>{
        oldArray.push(response.data.details)
        console.log(oldArray)
        localStorage.setItem('oldmessages',JSON.stringify(oldArray));
        //console.log(response.data.details)
        displayOnScreen(response.data.details);
        // messageInput.value=''
    }
    ).catch(err=>{
        console.log("!!!error in adding message!!!")
    })
}

function displayOnScreen(obj){
    const parentelem = document.getElementById("list-of-messages");
    const childelem = document.createElement('ul');
    childelem.setAttribute('id',obj.id);
    childelem.textContent = obj.name + ': ' + obj.message;
    
    parentelem.appendChild(childelem)
    

}

window.addEventListener("DOMContentLoaded",()=>{
    
    const token =localStorage.getItem('token')
    oldArray = localStorage.getItem('oldmessages');
    console.log('oldmessages',oldArray)

    axios.get("http://localhost:4000/message/get-messages").
    then((res)=>{
        //console.log("these are messages",res.data.messages)
        for(let i=0;i<res.data.messages.length;i++){
            displayOnScreen(res.data.messages[i])
        }
    })
    .catch(err=>{
        console.log("unable to get all users",err)
    })
})

setInterval(() => {
    const token =localStorage.getItem('token')
    axios.get("http://localhost:4000/message/get-messages", {headers :{"Authorization" : token}}).
    then((res)=>{
        const parentelem = document.getElementById("list-of-messages");
        parentelem.innerHTML=''
        //console.log("these are messages",res.data.messages)
        for(let i=0;i<res.data.messages.length;i++){
            displayOnScreen(res.data.messages[i])
        }
        
    })
    .catch(err=>{
        console.log("unable to get all users",err)
    })
}, 1000);