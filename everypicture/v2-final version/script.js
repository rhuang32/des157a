// IIFE //
(function () {
    "use strict";
    console.log("reading js");

    
    const wallLight = document.querySelector('#wallLight');
    const progressBar = document.querySelector('#progressBar');
    const splashScreen = document.querySelector('#splashScreen');
    const gallery = document.querySelector('#gallery');
    const header = document.querySelector('#header');
    const body = document.querySelector('body');
    const images = document.querySelectorAll('.image-container');
    const overlay = document.querySelector('#overlay');
    const overlayImage = document.querySelector('#overlayImage');
    const overlayDescription = document.querySelector('#overlayDescription');
    const closeButton = document.querySelector('#closeButton');

   // Project Details //
    const projectDetails = {
        "Yuan": {
            image: "images/yuanlamp.png",
            description: "YUAN, was designed by student designer Kendra Tung, who was deeply inspired by oil-paper umbrellas. Her lamp features a double-layered shade that adjusts to open or close for creating focused or spread beam optics. This lamp was super fun to interact with as the shade structure had a fascinating locking system to secure the position along the stem."
        },
        "Ripple": {
            image: "images/ripple.png",
            description: "RIPPLE was designed by student designer Sarika Kumar who crafted a serene, layered acrylic chandelier that mimics the gentle ripples of water. I loved her ambitious approach as it features a meditative glow that invites viewers to pause and reflect on its artistic beauty."
        },
        "Shinzo": {
            image: "images/shinzo.png",
            description: "SHINZO, was designed by student designer Cameron Gillern, who drew on the Metabolist movement in architecture as seen in Frank Lloyd Wright and Kisho Kurokawa’s work. This was my favorite fixture that was documented. This fixture is special to the designer because it captures their love for minimalist elegance and the foundational joy of working with light and texture, serving as both a functional lamp and a decorative piece that evokes quiet sophistication."
        },
        "Lennox": {
            image: "images/lennox.png",
            description: "LENNOX, was designed by student designer Marceline Tang, who aimed to create a sleek, intimate fixture that evokes warmth through a twisting, soft fabric design. This fixture is special to the designer because it reflects Marceline’s passion for simple, elegant design and their emotional connection to its warm, private atmosphere, a piece they envision keeping for years as a testament to their creative journey."
        },
        "Gravsten": {
            image: "images/gravstenbottom.png",
            description: "GRAVSTEN, was designed by student designer Jordan Blandino, who was inspired by architectural geometries. I loved this fixture due its warm renderings, which reminded me of the warmth of a fireplace. "
        }
        
    };

    // This is to initialize the animation of the splash screen
    window.addEventListener('load', () => {
        wallLight.classList.add('on');
        progressBar.classList.add('full');
        setTimeout(() => {
            wallLight.classList.add('hidden');
            splashScreen.classList.add('active');
            body.style.background = '#f5f5f5';
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                gallery.classList.add('active');
                header.classList.add('active');
            }, 3000); 
        }, 2000);
    });

    // Mouse Position Interaction
    images.forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / rect.height) * 25; 
            const tiltY = -(x / rect.width) * 25;
            image.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.1)`;
            image.style.boxShadow = `0 0 50px rgba(${tiltX * 10}, ${tiltY * 10}, 255, 0.7)`;
        });

        image.addEventListener('mouseleave', () => {
            image.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            image.style.boxShadow = '0 0 25px rgba(0, 0, 0, 0.4)';
        });

        // Overlay Click Event
        image.addEventListener('click', () => {
            const story = image.dataset.story;
            const project = projectDetails[story];
            if (project) {
                overlayImage.src = project.image;
                overlayDescription.textContent = project.description;
                overlay.classList.add('active');
                header.classList.remove('active');
            }
        });
    });

    // Close Overlay
    closeButton.addEventListener('click', () => {
        overlay.classList.remove('active');
        overlayImage.src = '';
        overlayDescription.textContent = '';
        header.classList.add('active');
    });
})();