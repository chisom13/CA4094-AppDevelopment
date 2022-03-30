function formValidator(event){
  event.preventDefault(); // always prevent default events when using javascript
  // get the value the in the username box 
  let uname = document.getElementById("username").value; 
  // get the value in the password box
  let pass = document.getElementById("password").value;
  if( uname == ""){
      alert("Username cannot be null");
  }
  else if (pass == ""){
      alert("Password cannot be null");
  }
  else{
    fetch("http://127.0.0.1:8000/api/token/", {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: uname, password: pass})
    }).then(response=>response.json())
    .then(data=>{
      // sets access and refresh tokens in the local storage
      if('access' in data){
        let accessToken = data['access'];
        let refreshToken = data['refresh'];
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);
        window.location.href = "/";
      }
      else{
          alert("username or password invalid");
      }
  });
  }
}

let loginForm = document.getElementById("loginForm"); // get the form 
loginForm.addEventListener('submit', formValidator);