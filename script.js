// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('#main-nav ul li a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            navItems.forEach(link => {
                if (link.getAttribute('href').substring(1) === section.getAttribute('id')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
});

// Toggle mobile navigation menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Image slider for projects
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.style.display = 'none');
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

// Form validation
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (validateForm()) {
        // Process form data (e.g., send to server)
        console.log('Form submitted successfully');
        form.reset();
    } else {
        console.log('Form validation failed');
    }
});

function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        isValid = false;
        setErrorFor(nameInput, 'Name cannot be blank');
    } else {
        setSuccessFor(nameInput);
    }

    if (!isEmailValid(emailInput.value.trim())) {
        isValid = false;
        setErrorFor(emailInput, 'Email is not valid');
    } else {
        setSuccessFor(emailInput);
    }

    if (messageInput.value.trim() === '') {
        isValid = false;
        setErrorFor(messageInput, 'Message cannot be blank');
    } else {
        setSuccessFor(messageInput);
    }

    return isValid;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const error = formControl.querySelector('small');
    formControl.className = 'form-control error';
    error.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

