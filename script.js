// DOM Elements
const heartsContainer = document.getElementById('hearts-container');
const envelope = document.getElementById('envelope');
const giftBox = document.getElementById('giftBox');
const surpriseMessage = document.getElementById('surpriseMessage');
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');
const surpriseBtn = document.getElementById('surpriseBtn');
const daysCount = document.getElementById('daysCount');

// Generate floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['💖', '💕', '💗', '💝', '💘', '💓', '💞'][Math.floor(Math.random() * 7)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 500);

// Initial hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// Envelope click handler
envelope.addEventListener('click', function() {
    this.classList.toggle('opened');
    if (this.classList.contains('opened')) {
        createConfetti();
        playSound('open');
    }
});

// Gift box click handler
giftBox.addEventListener('click', function() {
    this.classList.add('opened');
    surpriseMessage.classList.add('show');
    createConfetti();
    createHeartsExplosion();
    playSound('celebration');
    
    // Calculate days (you can set your actual start date)
    const startDate = new Date('2023-01-01'); // Change this to your relationship start date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysCount.textContent = diffDays;
});

// Music control
let isPlaying = false;
musicControl.addEventListener('click', function() {
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
surpriseBtn.addEventListener('click', function() {
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
function createHeartsExplosion() {
    const heartEmojis = ['💖', '💕', '💗', '💝', '💘', '💓', '💞', '💟'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 200 + Math.random() * 200;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            heart.style.transition = 'all 1.5s ease-out';
            document.body.appendChild(heart);
            
            requestAnimationFrame(() => {
                heart.style.transform = `translate(${vx}px, ${vy}px) scale(0)`;
                heart.style.opacity = '0';
            });
            
            setTimeout(() => heart.remove(), 1500);
        }, i * 50);
    }
}

// Photo upload simulation
function addPhoto(element) {
    // In a real implementation, this would open a file picker
    // For now, we'll simulate with a placeholder
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
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
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add parallax effect on mouse move
document.addEventListener('mousemove', function(e) {
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
window.addEventListener('load', function() {
    setTimeout(() => {
        createConfetti();
        playSound('celebration');
    }, 1000);
});

// Add sparkles on click
document.addEventListener('click', function(e) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.fontSize = '24px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10000';
    sparkle.textContent = '✨';
    sparkle.style.transition = 'all 0.5s ease-out';
    document.body.appendChild(sparkle);
    
    requestAnimationFrame(() => {
        sparkle.style.transform = 'translateY(-50px) scale(0)';
        sparkle.style.opacity = '0';
    });
    
    setTimeout(() => sparkle.remove(), 500);
});

console.log('🎂 Happy Birthday Website Loaded! 💕');
console.log('Made with love for the most special person! 💖');

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

document.addEventListener('mousemove', function(e) {
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

// Photo Carousel
let currentSlide = 0;
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.getElementById('carouselDots');

// Create dots
if (carouselSlides.length > 0) {
    carouselSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        carouselDots.appendChild(dot);
    });
}

function changeSlide(direction) {
    carouselSlides[currentSlide].classList.remove('active');
    document.querySelectorAll('.carousel-dot')[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + carouselSlides.length) % carouselSlides.length;
    
    carouselSlides[currentSlide].classList.add('active');
    document.querySelectorAll('.carousel-dot')[currentSlide].classList.add('active');
}

function goToSlide(index) {
    carouselSlides[currentSlide].classList.remove('active');
    document.querySelectorAll('.carousel-dot')[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    carouselSlides[currentSlide].classList.add('active');
    document.querySelectorAll('.carousel-dot')[currentSlide].classList.add('active');
}

// Auto-advance carousel
setInterval(() => changeSlide(1), 5000);

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

// Timeline Toggle
function toggleTimeline(item) {
    const text = item.querySelector('.timeline-text');
    const date = item.querySelector('.timeline-date');
    
    if (text.classList.contains('hidden')) {
        text.classList.remove('hidden');
        text.classList.add('revealed');
        date.textContent = date.textContent.replace('Click to reveal this memory', 'A precious memory');
        createConfetti();
    } else {
        text.classList.remove('revealed');
        text.classList.add('hidden');
    }
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
    interactiveCake.addEventListener('click', function() {
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
document.getElementById('wishInput')?.addEventListener('keypress', function(e) {
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

// Enhanced welcome with fireworks
window.addEventListener('load', function() {
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
