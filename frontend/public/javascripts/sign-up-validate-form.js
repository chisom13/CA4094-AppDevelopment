const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
var correct = false;

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();

});

// Checks that the user uses the right inputs
function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
		correct = false;
	} else {
		setSuccessFor(username);
		correct = true;
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
		correct = false;
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
		correct = false;
	} else {
		setSuccessFor(email);
		correct = true;
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
		correct = false;
	} else {
		setSuccessFor(password);
		correct = true;
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
		correct = false;
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
		correct = false;
	} else{
		setSuccessFor(password2);
		correct = true;
	}

	if (correct == true) {
		registerInputs(usernameValue, emailValue, passwordValue)
	}
}

// Function to actually create the account
function registerInputs(usernameValue, emailValue, passwordValue) {
	let unameValue = usernameValue;
	let mailValue = emailValue;
	let passValue = passwordValue
	fetch("http://127.0.0.1:8000/register/", {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: unameValue, email: mailValue, password: passValue})
    }).then(response=>response.json())
    .then(data=>{
		if(data.username == "A user with that username already exists.") {
			alert("This username is taken. Choose another username");
		}else {
			alert("Account Created Successfully. You will be redirected to the login page");
			window.location.href = "/login";
		}
  	});
}

// Activates incorrect icons
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

//Activates correct icons
function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}