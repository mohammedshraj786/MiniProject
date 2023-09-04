function register() {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirm-password').value;
    
    if(email=="" || password=="" || confirmpassword==""){
        alert('Please fill in all the required fields.');
        return;
    } 
    
    if (password !== confirmpassword) {
        alert('Passwords do not match.');
        return;
    }
    event.preventDefault()
    alert('Registration successful.\nEmail: ' + email);

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('confirmpassword:',confirmpassword);

    // const jsonData = {
    //     email:email,
    //     password:password,

    // };
    const url = `https://b4ea-103-156-100-11.ngrok-free.app/api/authuser/signup`;
    fetch(url,{
        method:'POST',
        body: JSON.stringify({email,password,confirmpassword })
    })
    .then((response) => response.json())

    .then((data) => {
        console.log('Data Stored successfully:', data);
    })
    .catch(error => {
        console.error('Error storing data:', error);
    });
    
    
}