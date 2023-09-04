const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


document.getElementById('signup').addEventListener('submit', async (event) =>{
	event.preventDefault();

	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirmpassword').value;

	console.log('Email:', email);
    console.log('Password:', password);
	console.log('confirmpassword:',confirmPassword );

	if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return; // Stop further processing
    }
    console.log('Email is valid.');

	if (!isValidPassword(password)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, and one special character.');
        return; // Stop further processing
    }
    console.log('Password is valid.');

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return; // Stop further processing
    }
    console.log('Passwords match.');


	const userData = { email, password };
	url='https://fdcb-103-156-100-11.ngrok-free.app/auth/signup'
	try{
		const response = await fetch(url,{
  		method: 'POST',
  		headers: {
			'Content-Type': 'application/json',
  		},
  		body: JSON.stringify(userData),
	});

	if (response.ok) {
  		const result = await response.json();
		console.log("success...");
  		alert(result.message);
	} else {
		const errorResponse = await response.json();
		console.log("failed");
  		alert('Error: ' + errorResponse.message);
	}
	} 
	catch (error) {
		console.error('Error:', error);
	}
});

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordPattern.test(password);
}

document.getElementById("login_form").addEventListener("submit", async function(event) {
	event.preventDefault();
	// const email = document.getElementsByName("email")[0].value;
	// const password = document.getElementsByName("password")[0].value;
	const email = document.getElementById("e_mail").value;
	const password = document.getElementById("p_assword").value;

	// localStorage.setItem('email',email);
	// localStorage.setItem('password',password);

    console.log('Email:', email);
    console.log('Password:', password);

	if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return; // Stop further processing
    }
    console.log('Email is valid.');

	if (!isValidPassword(password)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, and one special character.');
        return; // Stop further processing
    }
    console.log('Password is valid.');


	const user_data = { email,password};
	console.log(user_data);
	Url = 'https://fdcb-103-156-100-11.ngrok-free.app/auth/login';
	try {
		const response = await fetch(Url,{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user_data)
		});
		const data = await response.json();
		if (response.ok) {
			document.cookie = `token=${data.token}`;

			localStorage.setItem("token",data.token);
			
			console.log("token",data.token);
			alert("Login successful");
			if (data.isAdmin) {
				// Redirect to admin page
				window.location.href = `./product.html`; // Replace with the appropriate URL
			} else {
				// Redirect to home page
				window.location.href = `./index.html`; // Replace with the appropriate UR
			}
		} else {
			alert(data.message);
		}
	} catch (error) {
		console.error("Error:", error);
	}
	
});
