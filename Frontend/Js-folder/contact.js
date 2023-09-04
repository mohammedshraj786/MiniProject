
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
});

const token=localStorage.getItem('token')
console.log(token);

const decodedToken = JSON.parse(atob(token.split('.')[1]));
const userEmail = decodedToken.email;
// const usertoken = decodedToken.isAdmin;
console.log(userEmail);
// console.log(usertoken);


