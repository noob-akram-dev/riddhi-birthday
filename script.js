// DOM Elements
const heartsContainer = document.getElementById('hearts-container');
const envelope = document.getElementById('envelope');
const giftBox = document.getElementById('giftBox');
const surpriseMessage = document.getElementById('surpriseMessage');
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');
const surpriseBtn = document.getElementById('surpriseBtn');
const daysCount = document.getElementById('daysCount');

// Generate floating hearts - ENHANCED VERSION
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['💖', '💕', '💗', '💝', '💘', '💓', '💞', '💟', '❤️', '🔥', '✨', '🌹'][Math.floor(Math.random() * 12)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.fontSize = (Math.random() * 30 + 25) + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heart.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg)`;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create hearts rising from bottom
function createRisingHeart() {
    const heart = document.createElement('div');
    heart.className = 'rising-heart';
    heart.textContent = ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    heart.style.fontSize = (Math.random() * 25 + 20) + 'px';
    heart.style.opacity = Math.random() * 0.4 + 0.3;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 13000);
}

// Create hearts falling like rain
function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = ['💖', '💕', '💗', '💝', '💘', '💓'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.opacity = Math.random() * 0.6 + 0.2;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Create hearts periodically - MORE FREQUENT!
setInterval(createFloatingHeart, 300);
setInterval(createRisingHeart, 600);
setInterval(createFallingHeart, 400);

// Initial hearts - MORE HEARTS!
for (let i = 0; i < 25; i++) {
    setTimeout(createFloatingHeart, i * 150);
    setTimeout(createRisingHeart, i * 250);
    setTimeout(createFallingHeart, i * 180);
}

// Envelope click handler
envelope.addEventListener('click', function () {
    this.classList.toggle('opened');
    if (this.classList.contains('opened')) {
        createConfetti();
        playSound('open');
    }
});

// Gift box click handler
giftBox.addEventListener('click', function (e) {
    if (this.classList.contains('opened')) return;

    this.classList.add('opened');
    surpriseMessage.classList.add('show');

    // Get box position for centered explosion
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    createConfetti();
    createHeartsExplosion(centerX, centerY);
    playSound('celebration');

    // Calculate days together
    const ANNIVERSARY_DATE = new Date('2023-11-09'); // Updated based on memory book date
    const today = new Date();
    const diffTime = Math.abs(today - ANNIVERSARY_DATE);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysCount.textContent = diffDays.toLocaleString();
});

// Music control
let isPlaying = false;
musicControl.addEventListener('click', function () {
    if (isPlaying) {
        bgMusic.pause();
        this.classList.remove('playing');
        this.textContent = '🎵';
        isPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        this.classList.add('playing');
        this.textContent = '🎶';
        isPlaying = true;
    }
});

// Surprise button
surpriseBtn.addEventListener('click', function () {
    createConfetti();
    createHeartsExplosion();

    // Scroll to message section
    document.getElementById('messageSection').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Show alert with cute message
    setTimeout(() => {
        alert(`🎉 Happy Birthday Riddu Baby! 🎂\n\nYou are the most special person in my life! 💕`);
    }, 500);

    playSound('celebration');
});

// Create confetti
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb', '#ff69b4', '#da70d6', '#dda0dd'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Create hearts explosion
function createHeartsExplosion(startX, startY) {
    const heartEmojis = ['💖', '💕', '💗', '💝', '💘', '💓', '💞', '💟', '❤️', '🔥', '✨', '🌹'];
    const particleCount = 40;
    const x = startX || window.innerWidth / 2;
    const y = startY || window.innerHeight / 2;

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.userSelect = 'none';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

            // Random direction and distance
            const angle = Math.random() * Math.PI * 2;
            const velocity = 150 + Math.random() * 350;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            // Add some rotation to the hearts
            const rotation = Math.random() * 360;
            const endRotation = rotation + (Math.random() * 720 - 360);

            heart.style.transition = `all ${1 + Math.random()}s cubic-bezier(0.1, 0.5, 0.3, 1)`;
            document.body.appendChild(heart);

            // Force reflow
            heart.offsetHeight;

            requestAnimationFrame(() => {
                heart.style.transform = `translate(${vx}px, ${vy}px) rotate(${endRotation}deg) scale(0)`;
                heart.style.opacity = '0';
            });

            setTimeout(() => heart.remove(), 2000);
        }, Math.random() * 200);
    }
}

// Photo upload simulation
function addPhoto(element) {
    // In a real implementation, this would open a file picker
    // For now, we'll simulate with a placeholder
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                element.innerHTML = `<img src="${event.target.result}" alt="Memory">`;
                element.style.border = 'none';
                element.style.padding = '0';
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Simple sound effects (using Web Audio API)
function playSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'celebration') {
        // Happy sound
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.3); // C6
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
    } else if (type === 'open') {
        // Gentle open sound
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add parallax effect on mouse move
document.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const floatingHearts = document.querySelectorAll('.floating-hearts .heart');
    floatingHearts.forEach((heart, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        heart.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Welcome animation on page load
window.addEventListener('load', function () {
    setTimeout(() => {
        createConfetti();
        playSound('celebration');
    }, 1000);
});

// Heart burst on background click (removed sparkle flicker)
document.addEventListener('click', function (e) {
    // Don't trigger on buttons or interactive elements
    if (e.target.tagName === 'BUTTON' || 
        e.target.closest('button') || 
        e.target.closest('.envelope') ||
        e.target.closest('.gift-box') ||
        e.target.closest('.big-cake') ||
        e.target.closest('input') ||
        e.target.closest('textarea') ||
        e.target.closest('.love-note') ||
        e.target.closest('.spinner-container')) {
        return;
    }
    
    // Create mini heart burst on click
    createHeartBurst(e.clientX, e.clientY, 15);
});

// ============================================
// ENHANCED FEATURES - Performance & Accessibility
// ============================================

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Preloader and Start Overlay
const preloader = document.getElementById('preloader');
const startOverlay = document.getElementById('startOverlay');
let musicStarted = false;

function hidePreloader() {
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
                // Show start overlay after preloader
                if (startOverlay) {
                    startOverlay.style.display = 'flex';
                }
            }, 500);
        }, 1500); // Show for at least 1.5 seconds
    }
}

// Start celebration on click
function startCelebration() {
    if (musicStarted) return;
    musicStarted = true;

    // Play music
    if (bgMusic) {
        bgMusic.volume = 0.7; // Set comfortable volume
        bgMusic.play().then(() => {
            isPlaying = true;
            if (musicControl) {
                musicControl.classList.add('playing');
                musicControl.textContent = '🎶';
            }
        }).catch(e => {
            console.log('Audio play failed:', e);
        });
    }

    // Hide start overlay
    if (startOverlay) {
        startOverlay.classList.add('hidden');
        setTimeout(() => {
            startOverlay.style.display = 'none';
        }, 600);
    }

    // Start initial animations
    createConfetti();
    createHeartsExplosion();
    playSound('celebration');
    
    // GRAND ENTRANCE: Multiple heart bursts!
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createHeartBurst(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.5 + 100,
                40
            );
        }, i * 300);
    }
}

// Hide preloader when page is loaded
window.addEventListener('load', hidePreloader);

// Start overlay click handler
if (startOverlay) {
    startOverlay.addEventListener('click', startCelebration);
}



// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add subtle animation class
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.hero-section, .message-section, .gallery-section, .quotes-section, .memory-book-section, .reasons-section, .cake-cutting-section, .wishbox-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = prefersReducedMotion ? 'none' : 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Touch feedback helper
function addTouchFeedback(element) {
    element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.95)';
    }, { passive: true });

    element.addEventListener('touchend', () => {
        element.style.transform = '';
    }, { passive: true });
}

// Add touch feedback to interactive elements
document.querySelectorAll('button, .envelope, .gift-box, .big-cake, .photo-item').forEach(addTouchFeedback);

console.log('🎂 Happy Birthday Website Loaded! 💕');
console.log('Made with love for the most special person! 💖');
console.log(prefersReducedMotion ? '⚠️ Reduced motion enabled' : '✨ Full animations enabled');

// Birthday Countdown Timer
function updateBirthdayCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Set the birthday date here (Month is 0-indexed: 0 = January, 1 = February, etc.)
    const BIRTHDAY_MONTH = 1; // February
    const BIRTHDAY_DAY = 17; // Her birthday - February 17th

    let birthday = new Date(currentYear, BIRTHDAY_MONTH, BIRTHDAY_DAY);

    // If birthday has passed this year, set it to next year
    if (now > birthday) {
        birthday = new Date(currentYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    }

    const diff = birthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update DOM
    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minutesEl = document.getElementById('countdownMinutes');
    const secondsEl = document.getElementById('countdownSeconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

    // Check if it's birthday today
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        const label = document.querySelector('.countdown-label');
        if (label) label.textContent = "IT'S YOUR BIRTHDAY!";
    }
}

// Update countdown every second
setInterval(updateBirthdayCountdown, 1000);
updateBirthdayCountdown(); // Initial call

// ============================================
// NEW FEATURES - Enhanced Interactive Elements
// ============================================

// Rose Petals Animation
const petalsContainer = document.getElementById('petals-container');

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 3 + 6) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 9000);
}

// Create petals periodically
setInterval(createPetal, 800);

// Initial petals
for (let i = 0; i < 15; i++) {
    setTimeout(createPetal, i * 300);
}

// Fireworks Effect
const fireworksContainer = document.getElementById('fireworks-container');

function createFirework(x, y) {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffd700', '#ff6347', '#da70d6', '#00ced1'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (Math.random() * 6 + 4) + 'px';
        particle.style.height = particle.style.width;

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');

        fireworksContainer.appendChild(particle);

        // Animate particle
        requestAnimationFrame(() => {
            particle.style.transform = `translate(${vx}px, ${vy}px) scale(0)`;
        });

        setTimeout(() => particle.remove(), 1000);
    }
}

// Launch fireworks on special occasions
function launchRandomFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.5) + 100;
    createFirework(x, y);
}

// Heart Trail Effect
const heartTrailContainer = document.getElementById('heart-trail');
let lastHeartTime = 0;

document.addEventListener('mousemove', function (e) {
    const currentTime = Date.now();
    if (currentTime - lastHeartTime < 100) return; // Limit heart creation rate

    lastHeartTime = currentTime;

    const heart = document.createElement('div');
    heart.className = 'trail-heart';
    heart.textContent = ['💖', '💕', '💗', '💝'][Math.floor(Math.random() * 4)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heartTrailContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
});

// Photo Carousel & Lightbox
const photos = [
    'ab982c8b-dab3-4a0a-a59c-c1f796552926.jpg',
    // Deleted: '9611a020-58e7-423c-a141-9a5dca958861.jpg',
    'd2053229-69c4-4f95-bc10-fe7f2f2ed364.jpg',
    '24081104-75e1-4845-bfc2-e0ac6256a49b.jpg',
    'e5a3edb9-f3eb-4420-afe6-cd0715927f97.jpg',
    '99bb3d32-245f-4716-8d76-7f6293e26cae.jpg',
    'b9cfcf11-ea8c-4668-9ab0-9075397eddc4.jpg',
    '14e08a76-67e7-42e8-bd43-6186c777d542.jpg',
    'WhatsApp Image 2026-02-16 at 8.25.31 PM.jpeg'
];

let currentPhotoIndex = 0;
const carouselSlide = document.getElementById('carouselSlide');
const carouselDots = document.getElementById('carouselDots');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
let carouselInterval;

function initCarousel() {
    if (!carouselSlide) return;

    // Clear existing content
    carouselSlide.innerHTML = '';
    carouselDots.innerHTML = '';

    photos.forEach((photo, index) => {
        // Create slide item
        const item = document.createElement('div');
        item.className = 'carousel-item loading';

        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Memory ${index + 1}`;
        img.loading = index < 2 ? 'eager' : 'lazy'; // First 2 images load immediately
        img.onclick = () => openLightbox(index);

        // Handle image load
        img.onload = () => {
            img.classList.add('loaded');
            item.classList.remove('loading');
        };

        // Handle image error
        img.onerror = () => {
            item.classList.remove('loading');
            item.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ff1493;font-size:3rem;">💕</div>';
        };

        item.appendChild(img);
        carouselSlide.appendChild(item);

        // Create dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        carouselDots.appendChild(dot);
    });

    startCarousel();
}

function updateCarousel() {
    carouselSlide.style.transform = `translateX(-${currentPhotoIndex * 100}%)`;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPhotoIndex);
    });
}

function moveCarousel(direction) {
    currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
    updateCarousel();
    resetCarouselTimer();
}

function goToSlide(index) {
    currentPhotoIndex = index;
    updateCarousel();
    resetCarouselTimer();
}

function startCarousel() {
    carouselInterval = setInterval(() => moveCarousel(1), 3000); // Change slide every 5 seconds
}

function resetCarouselTimer() {
    clearInterval(carouselInterval);
    startCarousel();
}

// Initialize on load
window.addEventListener('load', initCarousel);

// Swipe gesture support for carousel
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;

if (carouselSlide) {
    carouselSlide.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    carouselSlide.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;

        // Calculate swipe distance
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Only handle horizontal swipes (ignore vertical scrolling)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                moveCarousel(1); // Swipe left - next
            } else {
                moveCarousel(-1); // Swipe right - previous
            }
        }
    }, { passive: true });
}

// Lightbox functions
function openLightbox(index) {
    currentPhotoIndex = index;
    lightboxImage.src = photos[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    clearInterval(carouselInterval); // Pause carousel when lightbox is open
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    startCarousel(); // Resume carousel
}

function navigateLightbox(direction) {
    currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
    lightboxImage.src = photos[currentPhotoIndex];
    updateCarousel(); // Sync carousel with lightbox
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    } else {
        // Allow browsing carousel with arrows even if lightbox is closed
        if (e.key === 'ArrowLeft') moveCarousel(-1);
        if (e.key === 'ArrowRight') moveCarousel(1);
    }
});

// Typewriter Quotes
const quotes = [
    "You are the most beautiful chapter in my life story... 📖",
    "Every love story is beautiful, but ours is my favorite... 💕",
    "In a sea of people, my eyes will always search for you... 👀",
    "You make my heart skip a beat every single day... 💓",
    "I fell in love with you because of the million things you never knew you were doing... 💖",
    "You are my today and all of my tomorrows... 🌅",
    "I love you more than yesterday, but less than tomorrow... 💝",
    "You are the reason I believe in love... 💗",
    "My favorite place in the world is next to you... 🌍",
    "You are my sunshine on a rainy day... ☀️"
];

const quoteDisplay = document.getElementById('quoteDisplay');
let quoteIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentQuote = quotes[quoteIndex];

    if (isDeleting) {
        quoteDisplay.textContent = currentQuote.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        quoteDisplay.textContent = currentQuote.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentQuote.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        quoteIndex = (quoteIndex + 1) % quotes.length;
        typeSpeed = 500; // Pause before new quote
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter
if (quoteDisplay) {
    typeWriter();
}

// Memory Book Navigation
let currentBookPage = 0;
const bookPages = document.querySelectorAll('.book-page');
const totalPages = bookPages.length;

function updateBookDisplay() {
    bookPages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === currentBookPage) {
            page.classList.add('active');
        }
    });

    document.getElementById('currentPage').textContent = currentBookPage + 1;
    document.getElementById('totalPages').textContent = totalPages;

    // Update button states
    document.querySelectorAll('.book-btn')[0].disabled = currentBookPage === 0;
    document.querySelectorAll('.book-btn')[1].disabled = currentBookPage === totalPages - 1;
}

function nextPage() {
    if (currentBookPage < totalPages - 1) {
        currentBookPage++;
        updateBookDisplay();
    }
}

function prevPage() {
    if (currentBookPage > 0) {
        currentBookPage--;
        updateBookDisplay();
    }
}

// Initialize book display
if (bookPages.length > 0) {
    updateBookDisplay();
}

// Reasons Why I Love You
const reasons = [
    "Your beautiful smile that lights up my world ✨",
    "The way your eyes sparkle when you're happy 👀",
    "Your kindness that touches everyone's heart 💝",
    "How you make me laugh even on my worst days 😄",
    "Your strength and determination inspire me 💪",
    "The way you understand me without words 🗣️",
    "Your hugs that feel like home 🏠",
    "How you support my dreams and ambitions 🌟",
    "Your intelligence and beautiful mind 🧠",
    "The way you care for the people you love 💕",
    "Your adorable laugh that makes my day 🎵",
    "How you make every moment special ✨",
    "Your patience and understanding 🌸",
    "The way you make me a better person 🌱",
    "Your beautiful soul that shines through 💖",
    "How you remember the little things 📝",
    "Your passion for what you love 🔥",
    "The way you look at me with love 😍",
    "Your courage to be yourself 🦋",
    "How you make ordinary moments magical ✨"
];

let currentReason = 0;

function showNextReason() {
    currentReason = (currentReason + 1) % reasons.length;

    const reasonNum = document.getElementById('reasonNum');
    const reasonText = document.getElementById('reasonText');
    const reasonCard = document.getElementById('reasonCard');

    // Animate out
    reasonCard.style.transform = 'scale(0.95)';
    reasonCard.style.opacity = '0.7';

    setTimeout(() => {
        reasonNum.textContent = currentReason + 1;
        reasonText.textContent = reasons[currentReason];

        // Animate in
        reasonCard.style.transform = 'scale(1)';
        reasonCard.style.opacity = '1';

        // Create mini celebration
        createConfetti();
        launchRandomFirework();
    }, 300);
}

// Virtual Cake Cutting
const interactiveCake = document.getElementById('interactiveCake');
const wishReveal = document.getElementById('wishReveal');
let cakeCut = false;

if (interactiveCake) {
    interactiveCake.addEventListener('click', function () {
        if (!cakeCut) {
            cakeCut = true;

            const cake = this.querySelector('.big-cake');
            const flame = this.querySelector('.flame');

            cake.classList.add('cut');
            flame.classList.add('blowout');

            // Big celebration
            createConfetti();
            createHeartsExplosion();

            // Launch multiple fireworks
            for (let i = 0; i < 5; i++) {
                setTimeout(() => launchRandomFirework(), i * 200);
            }

            // Show wish reveal
            setTimeout(() => {
                wishReveal.classList.add('show');
            }, 500);

            playSound('celebration');

            // Show alert
            setTimeout(() => {
                alert('🎂 Happy Birthday Riddu Baby! 🎉\n\nMake a wish and blow out the candle! 💫');
            }, 1000);
        }
    });
}

// Wish Box
let wishCount = 0;

function addWish() {
    const wishInput = document.getElementById('wishInput');
    const wishText = wishInput.value.trim();
    const wishesDisplay = document.getElementById('wishesDisplay');
    const starCount = document.getElementById('starCount');

    if (wishText) {
        wishCount++;

        // Create wish bubble
        const wishBubble = document.createElement('div');
        wishBubble.className = 'wish-bubble';
        wishBubble.textContent = wishText;
        wishesDisplay.insertBefore(wishBubble, wishesDisplay.firstChild);

        // Update count
        starCount.textContent = wishCount;

        // Clear input
        wishInput.value = '';

        // Celebration
        createConfetti();
        launchRandomFirework();

        // Scroll to show new wish
        wishBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        playSound('open');
    } else {
        wishInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            wishInput.style.animation = '';
        }, 500);
    }
}

// Allow Enter key to submit wish
document.getElementById('wishInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addWish();
    }
});

// Random fireworks throughout the experience
setInterval(() => {
    if (Math.random() > 0.7) {
        launchRandomFirework();
    }
}, 8000);

// EXTRA SPECIAL: Heart Burst Explosion - Creates a magical burst of hearts
function createHeartBurst(x, y, count = 50) {
    const heartEmojis = ['💖', '💕', '💗', '💝', '💘', '💓', '💞', '💟', '❤️', '🔥', '✨', '🌹', '🌸', '💐'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = (x || window.innerWidth / 2) + 'px';
            heart.style.top = (y || window.innerHeight / 2) + 'px';
            heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            heart.style.userSelect = 'none';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            // Burst in all directions with different speeds
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 200 + Math.random() * 400;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            heart.style.transition = `all ${1.5 + Math.random()}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            heart.style.filter = `hue-rotate(${Math.random() * 60}deg) drop-shadow(0 0 15px rgba(255, 105, 180, 0.8))`;
            document.body.appendChild(heart);
            
            // Force reflow
            heart.offsetHeight;
            
            requestAnimationFrame(() => {
                heart.style.transform = `translate(${vx}px, ${vy}px) rotate(${Math.random() * 720}deg) scale(${Math.random() * 0.5 + 0.3})`;
                heart.style.opacity = '0';
            });
            
            setTimeout(() => heart.remove(), 2500);
        }, i * 15);
    }
}

// Heart burst on scroll at special moments
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    
    // Create heart burst every 800px of scrolling
    if (Math.floor(currentScrollY / 800) > Math.floor(lastScrollY / 800)) {
        createHeartBurst(
            Math.random() * window.innerWidth,
            window.innerHeight / 2
        );
    }
    
    lastScrollY = currentScrollY;
}, { passive: true });

// Enhanced welcome with fireworks
window.addEventListener('load', function () {
    setTimeout(() => {
        // Launch welcome fireworks
        for (let i = 0; i < 3; i++) {
            setTimeout(() => launchRandomFirework(), i * 300);
        }
    }, 2000);
});

console.log('🎉 All enhanced features loaded!');
console.log('✨ Rose petals falling...');
console.log('🎆 Fireworks ready...');
console.log('💕 Heart trail active...');
console.log('🎠 Carousel rotating...');
console.log('⌨️ Typewriter typing...');
console.log('🎂 Cake ready to cut...');
console.log('⭐ Wish jar open...');
console.log('💌 Love notes floating...');
console.log('🎯 Spinner ready...');

// ============================================
// FLOATING LOVE NOTES - Click to Collect!
// ============================================
const loveNotesContainer = document.getElementById('loveNotesContainer');
const loveJar = document.getElementById('loveJar');
const jarCount = document.getElementById('jarCount');
const notesModal = document.getElementById('notesModal');
const notesClose = document.getElementById('notesClose');
const collectedNotesContainer = document.getElementById('collectedNotes');

const loveMessages = [
    "You're the most beautiful person I know 💕",
    "Your smile brightens my darkest days ☀️",
    "I love the way you laugh 🎵",
    "You're my favorite person in the world 🌍",
    "Every moment with you is precious ✨",
    "You make my heart skip a beat 💓",
    "I'm so lucky to have you 🍀",
    "Your kindness inspires me 🌟",
    "You make everything better 💖",
    "I miss you when you're not around 💭",
    "You're my dream come true 🌙",
    "I love your beautiful soul 🦋",
    "You make me want to be better 🌱",
    "Your hugs are my favorite place 🤗",
    "I'm always thinking of you 💭",
    "You complete me 💞",
    "I love you more than words can say 💌",
    "You're my happily ever after 🏰",
    "My heart belongs to you 💝",
    "Forever isn't long enough with you ⏰"
];

let collectedNotes = [];

function createFloatingNote() {
    const note = document.createElement('div');
    note.className = 'love-note';
    note.innerHTML = '💌';
    note.style.left = Math.random() * 90 + 5 + '%';
    note.style.top = Math.random() * 80 + 10 + '%';
    note.style.animationDuration = (Math.random() * 3 + 4) + 's';
    note.style.fontSize = (Math.random() * 10 + 30) + 'px';
    
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    note.dataset.message = message;
    
    note.addEventListener('click', function(e) {
        e.stopPropagation();
        collectNote(this);
    });
    
    loveNotesContainer.appendChild(note);
    
    // Remove after animation
    setTimeout(() => {
        if (note.parentNode) {
            note.remove();
        }
    }, 7000);
}

function collectNote(noteElement) {
    const message = noteElement.dataset.message;
    collectedNotes.push(message);
    
    // Update jar count
    jarCount.textContent = collectedNotes.length;
    
    // Animate collection
    noteElement.style.transform = 'scale(1.5)';
    noteElement.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        // Move to jar
        const jarRect = loveJar.getBoundingClientRect();
        const noteRect = noteElement.getBoundingClientRect();
        
        noteElement.style.position = 'fixed';
        noteElement.style.left = noteRect.left + 'px';
        noteElement.style.top = noteRect.top + 'px';
        noteElement.style.zIndex = '10000';
        
        requestAnimationFrame(() => {
            noteElement.style.left = (jarRect.left + jarRect.width/2) + 'px';
            noteElement.style.top = (jarRect.top + jarRect.height/2) + 'px';
            noteElement.style.transform = 'scale(0)';
            noteElement.style.opacity = '0';
        });
        
        setTimeout(() => noteElement.remove(), 300);
    }, 200);
    
    // Jar bounce animation
    loveJar.style.animation = 'jarBounce 0.5s ease';
    setTimeout(() => {
        loveJar.style.animation = '';
    }, 500);
    
    // Heart celebration
    const rect = noteElement.getBoundingClientRect();
    createHeartBurst(rect.left + rect.width/2, rect.top + rect.height/2, 20);
}

// Create notes periodically
setInterval(createFloatingNote, 4000);

// Create initial notes
for (let i = 0; i < 3; i++) {
    setTimeout(createFloatingNote, i * 1000);
}

// Jar click to view collected notes
loveJar.addEventListener('click', function() {
    if (collectedNotes.length === 0) {
        alert('Collect love notes by clicking on them! 💌');
        return;
    }
    
    collectedNotesContainer.innerHTML = collectedNotes.map((note, index) => `
        <div class="collected-note" style="animation-delay: ${index * 0.1}s">
            <span class="note-number">#${index + 1}</span>
            <span class="note-text">${note}</span>
        </div>
    `).join('');
    
    notesModal.classList.add('active');
});

// Close modal
notesClose.addEventListener('click', function() {
    notesModal.classList.remove('active');
});

notesModal.addEventListener('click', function(e) {
    if (e.target === notesModal) {
        notesModal.classList.remove('active');
    }
});

// ============================================
// LOVE SPINNER WHEEL
// ============================================
const spinButton = document.getElementById('spinButton');
const loveWheel = document.getElementById('loveWheel');
const prizeDisplay = document.getElementById('prizeDisplay');
let isSpinning = false;

const prizes = [
    { emoji: '🤗', text: 'Virtual Hug', description: 'A big warm virtual hug just for you!' },
    { emoji: '💋', text: 'Forehead Kiss', description: 'A sweet kiss on your forehead 💕' },
    { emoji: '🫂', text: 'Cuddle Time', description: 'Cozy cuddles and warm embraces' },
    { emoji: '🎬', text: 'Movie Night', description: 'Your choice of movie - I\'ll bring the popcorn!' },
    { emoji: '🥞', text: 'Breakfast in Bed', description: 'I\'ll make you breakfast in bed!' },
    { emoji: '🌹', text: 'Date Night', description: 'A special date night planned just for us' },
    { emoji: '💆', text: 'Massage', description: 'Relaxing massage to melt your stress away' },
    { emoji: '🎟️', text: 'Love Coupon', description: 'Redeem anytime for anything you want!' }
];

spinButton.addEventListener('click', function() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinButton.disabled = true;
    spinButton.textContent = 'Spinning... 🎰';
    
    // Random rotation (at least 5 full spins + random segment)
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = 1800 + randomDegree; // 5 full spins (360 * 5)
    
    // Apply rotation
    loveWheel.style.transform = `rotate(${totalRotation}deg)`;
    loveWheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    
    // Calculate winning prize
    const segmentAngle = 360 / 8;
    const winningIndex = Math.floor((360 - (randomDegree % 360)) / segmentAngle) % 8;
    const winningPrize = prizes[winningIndex];
    
    // Show result after spin
    setTimeout(() => {
        prizeDisplay.innerHTML = `
            <div class="prize-winner">
                <span class="prize-emoji">${winningPrize.emoji}</span>
                <h4 class="prize-title">${winningPrize.text}!</h4>
                <p class="prize-desc">${winningPrize.description}</p>
                <button class="claim-prize-btn" onclick="claimPrize('${winningPrize.text}')">Claim Prize 🎁</button>
            </div>
        `;
        
        // Celebration
        createConfetti();
        createHeartBurst(window.innerWidth/2, window.innerHeight/2, 50);
        playSound('celebration');
        
        // Reset
        setTimeout(() => {
            isSpinning = false;
            spinButton.disabled = false;
            spinButton.textContent = 'SPIN AGAIN! 🎰';
        }, 1000);
    }, 4000);
});

function claimPrize(prizeName) {
    alert(`🎉 ${prizeName} claimed!\n\nI'll make sure to give this to you, Riddu Baby! 💕`);
    createConfetti();
}

// Add jar bounce animation to head
const jarBounceStyle = document.createElement('style');
jarBounceStyle.textContent = `
    @keyframes jarBounce {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(0.9); }
        75% { transform: scale(1.1); }
    }
`;
document.head.appendChild(jarBounceStyle);
