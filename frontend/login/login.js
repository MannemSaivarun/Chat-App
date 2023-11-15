function checkUserdetails(event){
    event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const obj={
            email,
            password
        }
        console.log("obj details",obj)
        axios.post("http://localhost:4000/user/login", obj)
        .then((response) =>{
            
            console.log(response.data.message)
            
            if(response.status===200){
                alert(response.data.message)
                
                localStorage.setItem('token',response.data.token)
                
                window.location.href ="../groupchat/groupchat.html";
               
            }
            if(response.status===201){document.getElementById('login-alert').innerHTML = response.data.message}
            if(response.status===202){document.getElementById('login-alert').innerHTML = response.data.message}
            
            
        })
        .catch(err=>{
            if(err.status)
            console.log(err)
            document.getElementById('login-alert').innerHTML = err;
            
        })
    }
