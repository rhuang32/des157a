(function() {
    'use strict';
    console.log('reading js');

    // get HTML elements
    const myForm = document.querySelector('.input-form');
    const overlay = document.querySelector('#overlay');
    const story = document.querySelector('#story');
    const closeBtn = document.querySelector('.close');
    
    // loading animation HTML
    const loader = document.createElement('div');
    loader.setAttribute('class', 'loading-container');
    loader.innerHTML = `
        <div class="loading-text">Brewing your message...</div>
    `;
    document.body.appendChild(loader);

    function checkArticle(word) {
        const firstLetter = word.charAt(0).toLowerCase();
        if (firstLetter === 'a' || firstLetter === 'e' || 
            firstLetter === 'i' || firstLetter === 'o' || 
            firstLetter === 'u') {
            return 'an';
        } 
        else {
            return 'a';
        }
    }

    function showError(inputField, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        inputField.parentNode.appendChild(errorDiv);
        inputField.style.borderColor = 'red';
    }

    function showLoader() {
        loader.style.display = 'flex';
        setTimeout(function() {
            loader.style.opacity = '1';
        }, 10);
    }

    function hideLoader() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 200);
    }

    function showOverlay() {
        overlay.style.display = 'block';
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(100%)';
        
        setTimeout(function() {
            overlay.style.transition = 'all 0.5s ease';
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        }, 10);
    }

    function hideOverlay() {
        overlay.style.transition = 'all 0.5s ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(100%)';
        
        setTimeout(function() {
            overlay.style.display = 'none';
        }, 300);
    }

    myForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // get form values
        const name = document.querySelector('#name').value;
        const jobTitle = document.querySelector('#jobtitle').value;
        const noun = document.querySelector('#noun').value;
        const adjective = document.querySelector('#adjective').value;
        const verb = document.querySelector('#verb').value;
        const industry = document.querySelector('#industry').value;
        const closingPhrase = document.querySelector('#closingphrase').value;
        const yourName = document.querySelector('#yourname').value;

        const oldErrors = document.querySelectorAll('.error-message');
        for (let i = 0; i < oldErrors.length; i++) {
            oldErrors[i].remove();
        }

        let hasErrors = false;
        const inputs = document.querySelectorAll('input');
        
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === '') {
                hasErrors = true;
                showError(inputs[i], 'Please fill out this field');
            }
        }

        if (hasErrors) {
            return;
        }

        showLoader();

        setTimeout(function() {
            hideLoader();

            const jobArticle = checkArticle(jobTitle);
            const adjArticle = checkArticle(adjective);

            const madlib = `Hey ${name}! 👋

        I noticed you're ${jobArticle} ${jobTitle} and I'm really impressed by your work with ${noun}. Your ${adjArticle} ${adjective} approach to ${verb} in the ${industry} industry caught my attention.

        Would love to grab coffee and learn more about your experience! ☕

        ${closingPhrase},
        ${yourName}`;

            
            story.textContent = madlib;
            showOverlay();
        }, 1000);
    });

   
    closeBtn.addEventListener('click', function() {
        hideOverlay();
    });

    
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            hideOverlay();
        }
    });

    
    const allInputs = document.querySelectorAll('input');
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].addEventListener('input', function() {
            this.style.borderColor = '#C5AB9F';
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }
})();