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
    const sendButton = document.body.querySelector('#sendButton');
    const nameInput = document.body.querySelector('#name');
    const emailInput = document.body.querySelector('#email');
    const messageInput = document.body.querySelector('#message');

    // Get references to all error message elements
    const nameRequiredErrorMsg = document.body.querySelector('#name-error-required');
    const emailRequiredErrorMsg = document.body.querySelector('#email-error-required');
    const emailInvalidErrorMsg = document.body.querySelector('#email-error-invalid');
    const messageRequiredErrorMsg = document.body.querySelector('#message-error-required');


    // Initially disable the button and hide error messages
    sendButton.disabled = true;

    // Clear any previous data
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";

    // Function that clears all error messages
    function clearErrorMessages() {
        nameRequiredErrorMsg.hidden = true;
        emailRequiredErrorMsg.hidden = true;
        emailInvalidErrorMsg.hidden = true;
        messageRequiredErrorMsg.hidden = true;
    }

    clearErrorMessages();

    // Function that validates form input for sending messages
    function isValidMessageForm() {
        clearErrorMessages();

        if (nameInput.value && messageInput.value && emailInput.value && emailInput.value.includes('@')) {
            sendButton.disabled = false;
            return true;
        } else {
            sendButton.disabled = true;
            return false;
        }
    }

    // Set event listeners, so that the validation method is called after each edit
    nameInput.addEventListener('change', () => {
        if (!isValidMessageForm() && !nameInput.value) {
            nameRequiredErrorMsg.hidden = false;
        }
    });

    emailInput.addEventListener('change', () => {
        if (!isValidMessageForm()) {
            if (!emailInput.value) {
                emailRequiredErrorMsg.hidden = false;
            }

            if (!emailInput.value.includes('@')) {
                emailInvalidErrorMsg.hidden = false;
            }
        }
    });

    messageInput.addEventListener('change', () => {
        if (!isValidMessageForm() && !messageInput.value) {
            messageRequiredErrorMsg.hidden = false;
        }
    });

    // When user clicks send, call the API to send the message
    var apigClient = apigClientFactory.newClient();
    sendButton.addEventListener('click', () => {
        if (isValidMessageForm()) {
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
                }).catch(function(result) {
                    console.error('Error: message could not be sent.');
                });
            })();
        }
    });

});
