/*
 * Copyright (c) 2026 YOUR_COMPANY_NAME LLC.
 * All rights reserved.
 * This code is proprietary and confidential.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio Loaded!');

    // Typing effect for the hero text could go here

    // Simple smooth scroll handling for nav links (though CSS scroll-behavior usually handles this)
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    }

    // Contact Form Handling (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbwNr7C26UGXuYdGt0jX0i5QoqRTJxTT7-ySPZbmn2nK08Usjr6knddgZzBOskaT_DjT/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(data)
                });

                // GAS with no-cors doesn't return a readable body, so we assume success if no error is thrown
                submitBtn.textContent = 'Message Sent!';
                submitBtn.classList.add('sent');
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('sent');
                    submitBtn.disabled = false;
                }, 3000);

            } catch (error) {
                console.error('Error:', error);
                submitBtn.textContent = 'Error! Try again.';
                submitBtn.disabled = false;

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                }, 3000);
            }
        });
    }
});
