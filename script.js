// Background Particles Generator
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize properties for natural floating effect
        const size = Math.random() * 4 + 2;
        const xPos = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 15;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${xPos}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        container.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();

    const card = document.getElementById('card');
    const container = document.querySelector('.card-container');
    const cover = document.getElementById('cover');
    const cake = document.getElementById('cake');
    const flame = document.getElementById('flame');
    const hintText = document.getElementById('hintText');

    let isOpen = false;
    let isBlownOut = false;

    // Toggle card open/close
    cover.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            card.classList.add('is-open');
            container.classList.add('is-open');
        } else {
            card.classList.remove('is-open');
            container.classList.remove('is-open');
            
            // Reset candle when closed
            setTimeout(() => {
                if (isBlownOut) {
                    flame.classList.remove('off');
                    isBlownOut = false;
                    hintText.classList.remove('success');
                    hintText.textContent = "Tap the flame to make a wish!";
                }
            }, 600);
        }
    });

    // Make a wish logic (confetti & blow out candle)
    cake.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing the card if user clicks too hard
        
        // Only works if card is open and flame is on
        if (!isOpen || isBlownOut) return;

        // Blow out flame
        flame.classList.add('off');
        isBlownOut = true;
        
        hintText.classList.add('success');
        hintText.textContent = "Yay! Wish made! 🎉";

        // Confetti explosion parameters
        const count = 250;
        const defaults = {
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#F9E596', '#AA8222', '#FFFFFF', '#ff5e62'] // Theme colors
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        // Fire varied confetti batches
        setTimeout(() => {
            fire(0.25, {
                spread: 26,
                startVelocity: 55,
            });
            fire(0.2, {
                spread: 60,
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
            });
        }, 100);
    });
});
