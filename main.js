document.addEventListener('DOMContentLoaded', () => {

    const toggleBtn = document.getElementById('themeToggle'); 
    const body = document.body;

   
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleBtn.textContent = '🌙'; 
    } else {
        toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleBtn.textContent = '🌙';
        } else {
            localStorage.setItem('theme', 'light');
            toggleBtn.textContent = '☀️';
        }
    });

    const openPopupBtn = document.getElementById('open-popup-btn');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const contactModal = document.getElementById('contact-modal');
    

    const modalContent = document.querySelector('.modal-content-js'); 

    const contactForm = modalContent ? modalContent.querySelector('form') : null;
    

   
    if (contactModal) {
        contactModal.style.display = 'none';
    }

   
    if (openPopupBtn && contactModal) {
        openPopupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.style.display = 'block';

            if (modalContent && contactForm) {
                const existingMessage = modalContent.querySelector('#thank-you-message');
                if (existingMessage) {
                    existingMessage.remove();
                    contactForm.style.display = 'block';
                }
            }
        });
    }

    if (closePopupBtn && contactModal) {
        closePopupBtn.addEventListener('click', () => {
            contactModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });
    
    
    if (contactForm && modalContent && contactModal) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            contactForm.style.display = 'none';

            const thankYouMessage = document.createElement('div');
            thankYouMessage.id = 'thank-you-message';
            thankYouMessage.innerHTML = '<h2 style="text-align: center; color: #0D1117;">Thank you, Client!</h2><p style="text-align: center; color: #0D1117;">Your request has been successfully submitted.</p>';
            modalContent.appendChild(thankYouMessage);

            setTimeout(() => {
                contactModal.style.display = 'none';
                
                contactForm.reset();
                thankYouMessage.remove(); 
                contactForm.style.display = 'block';
            }, 3000);
        });
    } else {
    
        console.error("DEBUG: Form submit handler not initialized.");
        if (!modalContent) console.error("DEBUG: Missing element with CLASS 'modal-content-js'.");
        if (modalContent && !contactForm) console.error("DEBUG: Found modal content, but could not find a <form> element inside it. Please ensure the form is present.");
       
    }


    const dateTimeElement = document.getElementById('current-datetime');


    function updateDateTime() {
        if (!dateTimeElement) return;

        const now = new Date();

        const dateOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false 
        };

        const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(now);

        
        dateTimeElement.textContent = `Current time: ${formattedDate}, ${formattedTime}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000); 

});
