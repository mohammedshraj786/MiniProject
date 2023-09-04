document.getElementById('ForgetPassword').addEventListener('submit', async (event) =>{
	event.preventDefault();

	const email = document.getElementById('email').value;
	const newPassword = document.getElementById('newPassword').value;
	const confirmPassword = document.getElementById('confirmpassword').value;

	console.log('Email:', email);
    console.log('Password:', newPassword);
	console.log('confirmpassword:',confirmPassword );

	if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return; // Stop further processing
    }
    console.log('Email is valid.');

	if (!isValidPassword(newPassword)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, and one special character.');
        return; // Stop further processing
    }
    console.log('Password is valid.');

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return; // Stop further processing
    }
    console.log('Passwords match.');


	const userData = { email, newPassword };
	url='https://f065-103-156-100-11.ngrok-free.app/auth/reset-password'
	try{
		const response = await fetch(url,{
  		method: 'PUT',
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

