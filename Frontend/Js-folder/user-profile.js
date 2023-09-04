document.addEventListener('DOMContentLoaded', async () => {

    const loginButton = document.getElementById("loginButton");
    const profileButton = document.getElementById("profileButton");
    const addCardButton = document.getElementById('addcard-btn');

    const dashboardLink = document.getElementById("navbarDropdownMenuLink");
    const dropdownMenu= document.querySelector(".dropdown-menu");

    const pageboardLink = document.getElementById('navbarDropdownMenuLink1');
    const dropdownMenu1 = document.querySelector("#page-menu");

    const homebrand = document.getElementById('index-card');
    const home = document.getElementById('index-home');

    const token = localStorage.getItem("token");


    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const usertoken = decodedToken.isAdmin;

        if (usertoken) {
            // User is an admin, hide Dashboard and Add to Cart buttons
            dashboardLink.style.display = "none";
            addCardButton.style.display = "none";
        } else {
            // User is not an admin, show Dashboard and Add to Cart buttons
            dashboardLink.style.display = "block";
            addCardButton.style.display = "block";
        }
    }

    if (token) {
        // Token exists, show profile button
        profileButton.style.display = "inline-block";
        loginButton.style.display = "none";

    } else {
        // Token does not exist, show login button
        profileButton.style.display = "none";
        loginButton.style.display = "inline-block";

    }
    
    homebrand.addEventListener("click", () => {
        if (token) {
        window.location.href = "/index.html";
        } else {
        window.location.href = "/login.html"; 
        }
    });

    home.addEventListener("click", () => {
        if (token) {
        window.location.href = "/index.html";
        } else {
        window.location.href = "/login.html";
        }
    });

    dashboardLink.addEventListener("click", () => {
        if (!token) {
            window.location.href = "login.html"; // Redirect to login page if not logged in
            dropdownMenu.style.display = "none";
        } else {
            // Toggle visibility of the dropdown
            if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
                dropdownMenu.style.display = "block";
            } else {
                dropdownMenu.style.display = "none";
            }
        }
    });


    pageboardLink.addEventListener("click", () => {
        if (!token) {
        window.location.href = "/login.html";
        dropdownMenu1.style.display = "none";
        } else {
            // Toggle visibility of the dropdown
            if (dropdownMenu1.style.display === "none" || dropdownMenu1.style.display === "") {
                dropdownMenu1.style.display = "block";
            } else {
                dropdownMenu1.style.display = "none";
            }
        }
    });

    addCardButton.addEventListener("click", () => {
        if (token) {
        window.location.href = "/addcard.html";
        } else {
        window.location.href = "/login.html";
        }
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");

        profileButton.style.display = "none";
        loginButton.style.display = "inline-block";
    });


    try {
        const requestdata = {
            email:userEmail
        }
        const response = await fetch('https://a44f-103-156-100-11.ngrok-free.app/auth/user-profile', {
            method: 'POST',
            // mode:"no-cors",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(requestdata)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            const profileImage = document.getElementById('profileImage');

            if (data.profileImage) {
                profileImage.src = 'data:image/jpeg;base64,'+ data.profileImage;
            } else {
                profileImage.src = './Image-folder/empty-profile.png'
                console.error('Profile image data is missing or undefined');
            }
        } else {
            console.error('Failed to fetch user profile data');
        }
    } 
    catch (error) {
        console.error('An error occurred:', error);
    }
 

    try {
        const requestdata = {
            email:userEmail
        }
        const response = await fetch('https://a44f-103-156-100-11.ngrok-free.app/auth/user-profile', {
            method: 'POST',
            // mode:"no-cors",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(requestdata)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // Set the user's email in the email input field
            const emailInput = document.getElementById('emailField');
            const emailInput1 = document.getElementById('emailField1');
            const firstNameInput = document.getElementById('first-name');
            const lastNameInput = document.getElementById('last-name');
            const phoneNoInput = document.getElementById('phone');
            const addressInput = document.getElementById('address');
            const profileImage = document.getElementById('profileImage1');
            if (emailInput) {
                emailInput.value = data.userEmail;
            }
            if (emailInput1) {
                emailInput1.value = data.userEmail;
            }
            if (firstNameInput) {
                firstNameInput.value = data.firstName;
            }
            if (lastNameInput) {
                lastNameInput.value = data.lastName;
            }
            if (phoneNoInput) {
                phoneNoInput.value = data.phoneNo;
            }
            if (addressInput) {
                addressInput.value = data.address;
            }
            if (data.profileImage) {
                profileImage.src = 'data:image/jpeg;base64,' + data.profileImage;
            } else {
                profileImage.src = './Image-folder/empty-profile.png'
                console.error('Profile image data is missing or undefined');
            }
        } else {
            console.error('Failed to fetch user profile data');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

function userprofile(event){
    event.preventDefault();
    
    const firstname = document.getElementById('first-name').value;
    const lastname = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    console.log(firstname);
    console.log(lastname);
    console.log(phone);
    console.log(address);

    const imageFileInput = document.getElementById("file-upload");
    
    if (imageFileInput.files.length > 0) {
        const selectedFile = imageFileInput.files[0];
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']; // Adjust this array as needed
        const maxFileSize = 100 * 1024; // 100 KB

        if (!allowedFileTypes.includes(selectedFile.type)) {
            alert('Invalid file type. Allowed types:image/jpeg,image/png,image/gif');
            console.log('Invalid file type. Allowed types:', allowedFileTypes.join(', '));
            return;
        }

        if (selectedFile.size > maxFileSize) {
            alert('File size exceeds the maximum allowed size of 100kb');
            console.log('File size exceeds the maximum allowed size of', maxFileSize, 'bytes');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(imageFileInput.files[0]);
        
        reader.onloadend = function() {
            const base64ImageWithPrefix = reader.result;
            console.log(base64ImageWithPrefix);
            const base64Image = base64ImageWithPrefix.split(',')[1];
                console.log('Base64 Image:', base64Image);
                addtoServer(base64Image)
        }
    }
    
    const addtoServer = (base64Image)=> {
            const formData = {
                email:userEmail,
                firstName:firstname,
                lastName:lastname,
                phoneNo:phone,
                address:address,
                profileImage:base64Image

            };
            console.log(formData);
    
                const url = 'https://a44f-103-156-100-11.ngrok-free.app/auth/update-profile';
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Data added successfully:', data);
                    window.location.href = window.location.href;
                })
                .catch(error => {
                    console.error('Error adding item to cart:', error);
                });
            }

}

function changeemail(event){
    event.preventDefault();

    const newEmail = document.getElementById('new-email').value;
    const email = userEmail
    console.log(newEmail);
    console.log(email);

    const formData = {email,newEmail}

    const url = 'https://a44f-103-156-100-11.ngrok-free.app/auth/change-email';
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data added successfully:', data);
    })
    .catch(error => {
        console.error('Error adding item to cart:', error);
    });
}


const token=localStorage.getItem('token')
console.log(token);

const decodedToken = JSON.parse(atob(token.split('.')[1]));
const userEmail = decodedToken.email;
console.log(userEmail);



