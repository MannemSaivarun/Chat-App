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
        alert("successfully added message")
        console.log(response.data.message)
        // displayOnScreen(response.data.message);
    }
    ).catch(err=>{
        console.log("!!!error in adding message!!!")
    })
}

window.addEventListener("DOMContentLoaded",()=>{
    const token =localStorage.getItem('token')
    axios.get("http://localhost:4000/message/get-messages", {headers :{"Authorization" : token}}).
    then((res)=>{
        console.log("these are messages",res.data.messages)
    })
    .catch(err=>{
        console.log("unable to get all users",err)
    })
})