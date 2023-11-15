
let signout = document.querySelector('#signOut');
let token = localStorage.getItem('token');
let addtogroup = document.querySelector('#add-to-group');
let grpparticipants = document.querySelector('.grpparticipants');
let sendmsg = document.querySelector('.sendmsg');
let inputtext = document.querySelector('#input-text');
let allmsgs = document.querySelector('.all-msgs');


signout.addEventListener('click', () => {
    localStorage.clear();
    location.replace("../login/login.html");
})

addtogroup.addEventListener('click', ()=>{
    const id =  window.location.href.split("=")[1];
    const emailId = document.getElementById('emailId').value;
    const adminvalue = document.getElementById('adminvalue').value;
    let obj ={
        email: emailId,
        admin: adminvalue
    }
    console.log("group ",id,"obj",obj);
    axios.post(`http://localhost:4000/content/add-participant/${id}`, obj, {headers: {'Authorization': token}})
    .then(response =>{
        console.log(response.data);
        emailId.value = '';
        location.reload();
    })
    .catch(err=>{
        console.log("error occured in adding participant",err)
    })

})


document.addEventListener('DOMContentLoaded',() => {
        let id = window.location.href.split('=')[1];
        axios.get(`http://localhost:4000/content/grpparticipants/${id}`, {headers: {'Authorization': token}})
        .then(response => {
            let lop = '';
            for(let i= 0;i<response.data.data.length;i++)
            {
                const name = response.data.data[i].name;
                // console.log(name);
                if(response.data.data[i].admin == true)
                {
                    lop += `<div>
                    <p>Admin: <strong>${name}</strong></p>
                    </div>`;
                }
                else{
                    lop += `<div>
                    <p>${name}
                    <button class="makeadmin" id="${response.data.data[i].userId}">Make Admin</button>
                    <button class="removeuser" id="${response.data.data[i].userId}">Remove User</button></p>
                    </div>`
                }
            }
            grpparticipants.innerHTML = lop;

        })
        .catch(err =>{
            console.log("error occured in getting group participants",err)
        })

});


grpparticipants.addEventListener('click', async (e) => {
    try{
        let id = window.location.href.split('=')[1];
        console.log(id,"e.target.classList.contains('makeadmin')",e.target.classList.contains('makeadmin'));

        if(e.target.classList.contains('makeadmin'))
        {
            let uid = e.target.id;
            console.log("user ID is",uid);
            let obj = {
                userIdUpdate: uid
            }
            const response = await axios.post(`http://localhost:4000/content/makeuseradmin/${id}`, obj,{headers: {"Authorization": token}});
            alert(response.data.message);
            location.reload();
        }

        if(e.target.classList.contains('removeuser'))
        {
            let uid = e.target.id;
            // console.log("user ID is",uid)
            let obj = {
                userIdDelete: uid
            }
            const response = await axios.post(`http://localhost:4000/content/removeuser/${id}`, obj, {headers: {'Authorization': token}});
            alert(response.data.message);
            location.reload();
        }
    }
    catch(err){
        console.log(err);
    }
})


sendmsg.addEventListener('click', async () => {
    try{
        let id = window.location.href.split('=')[1];

        let inputvalue = inputtext.value;
        let obj = {
            message: inputvalue
        }
        const response = await axios.post(`http://localhost:4000/content/sendmessage/${id}`, obj, {headers: {'Authorization': token}});
        if(response.status === 200)
        {
            console.log(response.data.message);
            inputtext.value = '';   
        }
        else{
            throw new Error('Not able to send message, Something went wrong');
        }
    }
    catch(err){
        console.log(err);
    }
})

setInterval( async () => {
    try{
        let id = window.location.href.split('=')[1];

        const response = await axios.get(`http://localhost:4000/content/getgrpmessages/${id}`, {headers: {'Authorization': token}});
        if(response.status === 200){
            let len = '';
            for(let i=0;i<response.data.data.length;i++)
            {
                len += `<div>
                <span>${response.data.data[i].name}: </span>
                <span>${response.data.data[i].message}</span>
            </div>`;
            }
            allmsgs.innerHTML = len;
        }
        else{
            throw new Error('Not able to get Messages');
        }
    }
    catch(err){
        console.log(err);
    }
}, 1000);
