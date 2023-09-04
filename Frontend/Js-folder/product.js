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
console.log(userEmail);


function productAdd(){

    const title = document.getElementById("title").value;
    const Description = document.getElementById("textarea").value;
    const price =document.getElementById('price').value;

    console.log(title);
    console.log(Description);
    console.log(price);

    const negotiableRadio = document.getElementById('neo-business');
        const negotiableValue = negotiableRadio.checked ? 'Negotiable' : 'Not Negotiable';
    console.log('Negotiable:', negotiableValue);

    const selectElement = document.getElementById('inputGroupSelect');
        const selectedOption = selectElement.selectedOptions[0];
        const selectedCategory = selectedOption.textContent;
    console.log('Selected category:', selectedCategory);

    const addTypeElement = document.getElementById('Add-type');
        const personalRadio = addTypeElement.querySelector('#personal');
        const businessRadio = addTypeElement.querySelector('#business');

    if (personalRadio.checked) {
        console.log('Type selected: Personal');
    } else if (businessRadio.checked) {
        console.log('Type selected: Business');
    } else {
        console.log('No type selected');
    }

    const imageFileInput = document.getElementById('file-upload')

    if (imageFileInput.files.length > 0) {
        const selectedFile = imageFileInput.files[0];
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']; // Adjust this array as needed
        const maxFileSize = 100 * 1024; // 100 KB

        if (!allowedFileTypes.includes(selectedFile.type)) {
            console.log('Invalid file type. Allowed types:', allowedFileTypes.join(', '));
            return;
        }

        if (selectedFile.size > maxFileSize) {
            console.log('File size exceeds the maximum allowed size of', maxFileSize, 'bytes');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(imageFileInput.files[0]);
        
        reader.onloadend = function() {
            const base64ImageWithPrefix = reader.result;
            const base64Image = base64ImageWithPrefix.split(',')[1];
                console.log('Base64 Image:', base64Image);
            addtoServer(base64Image)
        }
    }


    const premiumAdElement = document.getElementById('premium-Ad');
    const premiumOptions = premiumAdElement.querySelectorAll('input[name="adfeature"]');

    let selectedPremiumOptionLabel = null;
    premiumOptions.forEach(option => {
        if (option.checked) {
            const labelElement = premiumAdElement.querySelector(`label[for="${option.id}"]`);
            selectedPremiumOptionLabel = labelElement.textContent;
        }
    });

    if (selectedPremiumOptionLabel) {
        console.log('Selected Premium Ad Option:', selectedPremiumOptionLabel);
    } else {
        console.log('No premium ad option selected');
    }


    const paymentMethodElement = document.getElementById('payment-method');
    const paymentOptions = paymentMethodElement.querySelectorAll('input[name="bankfeature"]');

    let selectedPaymentOptionLabel = null;
    paymentOptions.forEach(option => {
        if (option.checked) {
            const labelElement = paymentMethodElement.querySelector(`label[for="${option.id}"]`);
            selectedPaymentOptionLabel = labelElement.textContent;
        }
    });

    if (selectedPaymentOptionLabel) {
        console.log('Selected Payment Method:', selectedPaymentOptionLabel);
    } else {
        console.log('No payment method selected');
    }

// post the data in db    
const addtoServer = (base64Image)=> {
    const formData = {
        productName: title,
        productDescription: Description,
        Negotiable:negotiableValue,
        productPrice: price,
        Category: selectedCategory,
        productImage:base64Image,
        email:userEmail
    };

    console.log(formData);

    const url = 'https://a44f-103-156-100-11.ngrok-free.app/apiproduct/products';
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
    })
    .catch(error => {
        console.error('Error adding item to cart:', error);
    });
}
           
}
  