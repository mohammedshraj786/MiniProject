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
        const response = await fetch('https://a44f-103-156-100-11.ngrok-free.app/apiproduct/get-products',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
        });
        if (response.ok) {

            const data = await response.json();
            console.log('Data retrieved successfully',data);
            console.log(Object.keys(data));
            console.log(Object.values(data));
            const apiResult = Object.values(data);

        const productSection = document.getElementById('accordion'); 

        apiResult.forEach(product => {
            console.log(product);

            const productCard = document.createElement('div');
            productCard.classList ='card-body';
            const content = `
            <div class="ad-listing-list border border-dark my-5 mx-3">
                <div class="row p-lg-3 p-sm-5 p-4 ">
                    <div class="col-lg-4 align-self-center">
                        <a href="single.html">
                            <img src="data:image/jpeg;base64,${product.productImage}" class="img-fluid" alt="">
                        </a>
                    </div>
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-lg-6 col-md-10">
                                <div class="ad-listing-content">
                                    <div>
                                        <a href="single.html" class="font-weight-bold">${product.productName}</a>
                                    </div>
                                    <ul class="list-inline mt-2 mb-3">
                                        <li class="list-inline-item"><a href="category.html"> <i class="fa fa-folder-open-o"></i> Electronics</a></li>
                                        <li class="list-inline-item"><a href=""><i class="fa fa-calendar"></i>${product.date}</a></li>
                                    </ul>
                                    <h5 class="card-price"><a href="single.html">$${product.productPrice}</a></h5>
                                    <p class="pr-5">${product.productDescription}</p>
                                </div>
                            </div>
                            <div class="col-lg-6 align-self-center">
                                <div class="product-ratings float-lg-right pb-3">
                                    <ul class="list-inline">
                                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                    </ul>
                                </div>
                            </div>
                            <button class="addtocard-btn" onclick="addToCart()">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
             productSection.innerHTML += content;
        });
        } else {
            console.error('Failed to fetch user product data');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

document.getElementById('search-btn').addEventListener('click', async (event) => {

    event.preventDefault();
    const productName = document.getElementById('inputtext4').value;
    const productcategory = document.getElementById('inputCategory4').value;
    const category = document.getElementById('inputGroupSelect').value;

    const data = {
        productName:productName,
        category:productcategory,
        sort:category
    };

    console.log(data);
    const response = await fetch(`https://a44f-103-156-100-11.ngrok-free.app/apiproduct/search`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const data = await response.json();
        console.log('Data retrieved successfully',data);
        console.log(Object.keys(data));
        console.log(Object.values(data));

        const searchresult = Object.values(data);

        const productsearch = document.getElementById('searchproduct');

        searchresult.forEach(product => {
            
            const searchcard = document.createElement('div');
            searchcard.classList = 'search-body';
            const content = `
            <div class="ad-listing-list border border-dark my-5 mx-3">
            <div class="row p-lg-3 p-sm-5 p-4 ">
                <div class="col-lg-4 align-self-center">
                    <a href="single.html">
                        <img src="data:image/jpeg;base64,${product.productImage}" class="img-fluid" alt="">
                    </a>
                </div>
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-6 col-md-10">
                            <div class="ad-listing-content">
                                <div>
                                    <a href="single.html" class="font-weight-bold">${product.productName}</a>
                                </div>
                                <ul class="list-inline mt-2 mb-3">
                                    <li class="list-inline-item"><a href="category.html"> <i class="fa fa-folder-open-o"></i> Electronics</a></li>
                                    <li class="list-inline-item"><a href=""><i class="fa fa-calendar"></i>${product.date}</a></li>
                                </ul>
                                <h5 class="card-price"><a href="single.html">$${product.productPrice}</a></h5>
                                <p class="pr-5">${product.productDescription}</p>
                            </div>
                        </div>
                        <div class="col-lg-6 align-self-center">
                            <div class="product-ratings float-lg-right pb-3">
                                <ul class="list-inline">
                                    <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                </ul>
                            </div>
                        </div>
                        <button class="addtocard-btn" onclick="addToCart()">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
            `;
        productsearch.innerHTML += content;
    });
    } else {
        console.error('Failed to fetch user profile data');
    }
});

const token=localStorage.getItem('token')
console.log(token);

const decodedToken = JSON.parse(atob(token.split('.')[1]));
const userEmail = decodedToken.email;
// const usertoken = decodedToken.isAdmin;
console.log(userEmail);
// console.log(usertoken);



