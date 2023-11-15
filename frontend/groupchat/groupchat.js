// loadGroups();
let signout = document.querySelector('#signOut');

signout.addEventListener('click', () => {
    localStorage.clear();
    location.replace("../login/login.html");
})

function openCreateGroupForm(){
    document.getElementById("creategroup").style.display='block';
}
function createGroup(){
    const token = localStorage.getItem('token');
    const groupname = document.getElementById("groupname").value;
    const obj = {
        groupname
    }
    axios.post("http://localhost:4000/groups/create-group",obj, {headers :{"Authorization" : token}})
    .then(res=>{
        console.log("group created","result",res.data.result);
        document.getElementById("creategroup").style.display='none';
        window.location.reload();
    })
    .catch(err=>{
        console.log("!!!error in creating group!!!")
    })

}

let groupsList = document.getElementById('groups-list');
window.addEventListener("DOMContentLoaded",()=>{
    const token = localStorage.getItem('token');
    
    axios.get("http://localhost:4000/groups/get-groups", {headers :{"Authorization" : token}})
    .then(response =>{
        console.log(response.data.data);
        if(response.status === 200){
            let grps = '';
            console.log(response.data.data);
            if(response.data.data.length === 0){
                groupsList.innerHTML = "You are not a part of any group";
            }
            else{
                for(let i = 0;i<response.data.data.length;i++){
                    grps += `<div>
                    <a href = "../groupdetails/groupdetails.html?g=${response.data.data[i].groupId}">${response.data.data[i].groupname}</a>
                    </div>`
                }
                groupsList.innerHTML = grps;

            }
        }



    })
    .catch(err=>{
        console.log("unable to get all users",err)
    })
})



// async function loadGroups() {
//     const token = localStorage.getItem('token');
//     const response = await axios.get("http://localhost:4000/groups/get-groups", {headers :{"Authorization" : token}});
//     const groups = response.data;
//     const groupsList = document.getElementById('groups-list');
//     groupsList.innerHTML = '';
//     groups.forEach(group => {
//       const listItem = document.createElement('li');
//       listItem.textContent = group.name;
//       listItem.addEventListener('click', () => {
//         currentGroup = group;
//         loadMessages();
//         document.getElementById('chat-container').style.display = 'block';
//       });
//       groupsList.appendChild(listItem);
//     });
//   }

// async function loadMessages() {
//     const response = await axios.get(`/api/groups/${currentGroup.id}/messages`);
//     const messages = response.data;
//     const messagesList = document.getElementById('messages-list');
//     messagesList.innerHTML = '';
//     messages.forEach(message => {
//       const listItem = document.createElement('li');
//       listItem.textContent = `${message.sender.username}: ${message.text}`;
//       messagesList.appendChild(listItem);
//     });
//   }

//   async function sendMessage() {
//     const messageInput = document.getElementById('message-input');
//     const text = messageInput.value;
//     const sender = currentUser.id;
//     const response = await axios.post(`/api/groups/${currentGroup.id}/messages`, { sender, text });
//     const messages = response.data;
//     loadMessages();
//     messageInput.value = '';
//   }

