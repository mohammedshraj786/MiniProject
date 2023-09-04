
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

            const profileImage = document.getElementById('profileImage1');
            const fullnameElement= document.getElementById('fullname');
            const useremail = document.getElementById('useremail');

            if (data.firstName && data.lastName) {
                const fullName = `${data.firstName} ${data.lastName}`;
                fullnameElement.textContent = fullName;
            } else {
                fullnameElement.textContent = 'Enter Name';
                console.error('First name or last name is missing or undefined');
            }
        
            if (data.userEmail) {
                useremail.textContent = data.userEmail
                ;
            } else {
                console.error('Email address is missing or undefined');
            }

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
            email:userEmail,
            // userId:userid
        }
        const response = await fetch('https://a44f-103-156-100-11.ngrok-free.app/apiproduct/get-products-email',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(requestdata)
        });
        if (response.ok) {

            const data = await response.json();
            console.log('Data retrieved successfully',data);
            // console.log(Object.keys(data));
            // console.log(Object.values(data));
            const apiResult = Object.values(data);

        const productTable = document.getElementById('accordion'); 

        apiResult.forEach(product => {
            console.log(product);

            const row = document.createElement('tr');
            productTable.classList ='table';
            const content = `
            

            <td class="product-thumb">
                <img width="80px" height="auto" src="data:image/jpeg;base64,${product.productImage}" alt="image">
            </td>
            <td class="product-details ">
                <h4 class="title text-dark mb-0">${product.productName}</h4>
                <span class="add-id text-dark mb-0"><strong>Add Id:</strong> ${product._id}</span><br>
                <span  class="text-dark mb-0"><strong>Posted on: </strong>${product.date}</span><br>
                <span class="status active text-dark mb-0"><strong>Status:</strong>${product.status}</span><br>
                <span class="location text-dark mb-0"><strong>Location:</strong>${product.productlocation}:</sp>
            </td>
            <td class="product-category">
                <h5 class="categories text-dark">${product.Category}</h5>
            </td>
            <td class="product-action" data-tittle="Action">
                <div class="">
                    <ul class="list-inline justify-content-center">
                        <li class="list-inline-item">
                            <a data-toggle="tooltip" data-placement="top" title="view" class="view" href="/list.html">
                                <i class="fa fa-eye"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="edit" data-toggle="tooltip" data-placement="top" title="Edit" href="/product.html">
                                <i class="fa fa-pencil"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="delete" id="delete-btn" data-toggle="tooltip" data-placement="top" data-product-id="${product._id}" title="Delete" href="">
                                <i class="fa fa-trash"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </td>
            `;
             productTable.innerHTML += content;
        });
        } else {
            console.error('Failed to fetch user product data');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

// document.getElementById('accordion').addEventListener('click', async (event) => {
//     const clickedElement = event.target;

//     if (clickedElement.classList.contains('delete')) {
//         event.preventDefault();
//         const productId = clickedElement.getAttribute('data-product-id');
//         console.log(productId);
//         // const userId = 'user_id_here'; // Replace with the actual user ID
//         const requestBody = JSON.stringify({
//             // userId: userid,
//             productId: productId
//         });

//         fetch(`https://a44f-103-156-100-11.ngrok-free.app/apiproduct/UserDashproducts`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: requestBody
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.message); // This will log the success message from the response

//             // If the response is successful, remove the card associated with the deleted product
//             clickedElement.closest('.product-dashboard-table').remove();
//             // window.location.reload;
//             window.location.href = window.location.href;
//         })
//         .catch(error => {
//             console.error(error);
//         });
//     }
// });

const token=localStorage.getItem('token')
console.log(token);

const decodedToken = JSON.parse(atob(token.split('.')[1]));
const userEmail = decodedToken.email;
const userid = decodedToken.userId;
console.log(userid);
console.log(userEmail);
