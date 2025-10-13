document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('estimateForm');

    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        let formIsValid = true;

        const inputElements = form.querySelectorAll('.form-control, .form-select');
        inputElements.forEach(el => {
            el.classList.remove('is-invalid', 'is-valid');
            const feedback = document.getElementById(el.id + 'Feedback');
            if (feedback) feedback.textContent = '';
        });

        function displayError(inputId, message) {
            const input = document.getElementById(inputId);
            const feedback = document.getElementById(inputId + 'Feedback');
            if (input) {
                input.classList.add('is-invalid');
                if (feedback) {
                    feedback.textContent = message;
                }
                formIsValid = false;
            }
        }

        function markValid(inputId) {
            const input = document.getElementById(inputId);
            if (input) {
                input.classList.add('is-valid');
            }
        }


        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            displayError('name', 'Full Name is required.');
        } else {
            markValid('name');
        }

        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (email.value.trim() === '') {
            displayError('email', 'Email address is required.');
        } else if (!emailRegex.test(email.value.trim())) {
            displayError('email', 'Please enter a valid email address (e.g.,user@domain.com).');
        } else {
            markValid('email');
        }

        const projectType = document.getElementById('project-type');
        if (projectType.value === '') {
            displayError('project-type', 'Please select a project type.');
        } else {
            markValid('project-type');
        }

        const area = document.getElementById('area');
        if (area.value.trim() !== '') {
            const areaValue = parseFloat(area.value);
            if (isNaN(areaValue) || areaValue < 1) {
                displayError('area', 'Area must be a number greater than or equal to 1 m^2.');
            } else {
                markValid('area');
            }
        }

        const budget = document.getElementById('budget');
        if (budget.value.trim() !== '') {
            markValid('budget');
        }

        const phone = document.getElementById('phone');
        if (phone && phone.value.trim() !== '') { markValid('phone'); }
        const deadline = document.getElementById('deadline');
        if (deadline && deadline.value.trim() !== '') { markValid('deadline'); }


        if (formIsValid) {
            console.log("Form data is valid.");
            console.log("Name:", name.value);
            console.log("Email:", email.value);
            console.log("Project Type:", projectType.value);
            console.log("Area:", area.value || 'N/A');
            console.log("Budget:", budget.value || 'N/A');

            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            form.reset();
            inputElements.forEach(el => el.classList.remove('is-valid'));

        } else {
            form.querySelector('.is-invalid')?.focus();
        }
    });

});
