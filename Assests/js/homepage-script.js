let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex = (slideIndex >= slides.length) ? 1 : slideIndex + 1;

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    setTimeout(showSlides, 2000); // Change image every 2 seconds
}


// validate payment page forms
function validateForm() {
    var cardNumber = document.getElementById("cardNumber").value;
    var expiryDate = document.getElementById("expiryDate").value;
    var cvv = document.getElementById("cvv").value;
    var cardHolderName = document.getElementById("cardHolderName").value;

    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
        alert("Please fill in all required fields.");
        return false;
    }

    alert("Payment successful!");

    window.location.href = "index.html";

    return false; 
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
    var valid = true;

    // Name validation
    var name = document.getElementById('name').value.trim();
    if (name === '') {
        valid = false;
        alert('Please enter your name.');
    }

    // Email validation
    var email = document.getElementById('email').value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        valid = false;
        alert('Please enter a valid email address.');
    }

    // Message validation
    var message = document.getElementById('message').value.trim();
    if (message === '') {
        valid = false;
        alert('Please enter your message.');
    }

    if (!valid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});