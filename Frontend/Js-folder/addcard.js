
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
            userId:userid
        }
        const response = await fetch(`https://a44f-103-156-100-11.ngrok-free.app/apiproduct/usercart`, {
            method: 'POST',
            // mode:"no-cors",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(requestdata)
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Data retrieved successfully',data);
            console.log(Object.keys(data));
            console.log(Object.values(data));

        const productSection = document.getElementById('accordion'); 

        const apiResult = Object.values(data);
        apiResult.forEach(product => {
            console.log(product);
            const productCard = document.createElement('div');
            productCard.classList ='card-body';
            for (const item of product.cartItems) {
                const product = item.product;
                console.log(product.productName);
            const content = `
            <div class ="col-sm-12 col-lg-4 col-md-6">
                <div class = "card my-3">
                    <div class="product-item">
                        <div class="card-product">
                            <div class="thumb-content">
                                <a href="single.html">
                                    <img class="card-img" src="data:image/jpeg;base64,${product.productImage}" alt="Card image cap">
                                </a>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title text-dark"><a href="single.html">${product.productName}</a></h4>
                                <ul class="list-inline product-meta">
                                    <li class="list-inline-item">
                                        <a href="single.html"><i class="fa fa-folder-open-o"></i>Electronics</a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="#"><i class="fa fa-calendar"></i>${product.date}</a>
                                    </li>
                                </ul>
                                <h5 class="card-price"><a href="single.html">$${product.productPrice}</a></h5>
                                <h6 class="card-text">${product.productDescription}</h6>
                                <div class="product-ratings">
                                    <ul class="list-inline">
                                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    </ul>
                                </div>

                            <button class="delete-btn" data-product-id="${product._id}">Delete</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            `;
             productSection.innerHTML += content;
            }
        });
            
        } else {
            console.error('Failed to fetch user profile data');
        }
    } 
    catch (error) {
        console.error('An error occurred:', error);
    }

});

document.getElementById('accordion').addEventListener('click', async (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('delete-btn')) {
        event.preventDefault();
        const productId = clickedElement.getAttribute('data-product-id');
        console.log(productId);
        // const userId = 'user_id_here'; // Replace with the actual user ID
        const requestBody = JSON.stringify({
            userId: userid,
            productId: productId
        });

        fetch(`https://a44f-103-156-100-11.ngrok-free.app/apiproduct/cart/deleteproduct`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // This will log the success message from the response

            // If the response is successful, remove the card associated with the deleted product
            clickedElement.closest('.card-container').remove();
            // window.location.reload;
            
window.location.href = window.location.href;
        })
        .catch(error => {
            console.error(error);
        });
    }
});

const token=localStorage.getItem('token')
console.log(token);

const decodedToken = JSON.parse(atob(token.split('.')[1]));
const userEmail = decodedToken.email;
const userid = decodedToken.userId;
console.log(userEmail);
console.log(userid);

