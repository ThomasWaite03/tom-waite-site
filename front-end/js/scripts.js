/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

    // Get references to all elements that are used for sending a message
    const contactForm = document.body.querySelector('#contactForm');
    const sendButton = document.body.querySelector('#sendButton');
    const nameInput = document.body.querySelector('#name');
    const emailInput = document.body.querySelector('#email');
    const messageInput = document.body.querySelector('#message');

    // Clear any previous data
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";

    // When user clicks send, call the API to send the message
    var apigClient = apigClientFactory.newClient();
    sendButton.addEventListener('click', () => {
        if (contactForm.checkValidity()) {
            var params = {};
            var body = {
                "name": nameInput.value,
                "email": emailInput.value,
                "message": messageInput.value
            };
            var additionalParams = {};

            (async function () {
                apigClient.sendMessagePost(params, body, additionalParams)
                .then(function(result) {
                    console.log('Message sent successfully.');

                    // Clear the form
                    nameInput.value = "";
                    emailInput.value = "";
                    messageInput.value = "";

                    // Display success message and hide error message if visible
                    submitSuccessMessage.classList = [];
                    submitErrorMessage.classList = ["d-none"];
                }).catch(function(result) {
                    console.error('Error: message could not be sent.');

                    // Display error message and hide success message if visible
                    submitSuccessMessage.classList = ["d-none"];
                    submitErrorMessage.classList = [];
                });
            })();
        }
    });

});
