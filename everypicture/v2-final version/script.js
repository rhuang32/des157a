(function () {
    'use strict';

    console.log('reading js');
    // Flash and Button Interactions
    const flashContainer = document.querySelector('.flash-container');
    const buttons = document.querySelectorAll('.side-btn');

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('mouseover', function(event) {
            const target = event.target;
            const imgSrc = target.getAttribute('data-img');
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'flash-image';
            flashContainer.innerHTML = '';
            flashContainer.appendChild(img);
            img.style.opacity = '1';
        });

        button.addEventListener('mouseout', function(event) {
            const target = event.target;
            const flashImg = flashContainer.querySelector('.flash-image');
            if (flashImg) {
                flashImg.style.opacity = '0';
                setTimeout(function() {
                    flashContainer.innerHTML = '';
                }, 500);
            }
        });

        button.addEventListener('click', function(event) {
            event.preventDefault();
            const target = event.target;
            const overlayId = target.getAttribute('data-overlay');
            if (overlayId) {
                const currentOverlay = document.querySelector('.overlay.showing');
                if (currentOverlay) currentOverlay.className = 'overlay hidden';
                const overlay = document.querySelector(`.overlay#${overlayId}`);
                if (overlay) overlay.className = 'overlay showing';
            }
        });
    }

    // Close Overlay
    const closeBtns = document.querySelectorAll('.close');
    for (let i = 0; i < closeBtns.length; i++) {
        const closeBtn = closeBtns[i];
        closeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const overlay = closeBtn.closest('.overlay');
            if (overlay) overlay.className = 'overlay hidden';
        });
    }

    // Escape Key Handler
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const visibleOverlay = document.querySelector('.overlay.showing');
            if (visibleOverlay) visibleOverlay.className = 'overlay hidden';
        }
    });
})();