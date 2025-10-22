// Paw controls (existing code, unchanged for now)
const leftPaw = document.querySelector('.paw-left');
const rightPaw = document.querySelector('.paw-right');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const nakime = document.querySelector('.nakime');
const castleContainer = document.querySelector('.castle-container');
const fireworkGif = document.getElementById('firework-gif');
let bgPosition = 0;
const step = 800;

function moveLeft() { bgPosition += step; castleContainer.style.backgroundPosition = `${bgPosition}px 0`; }
function moveRight() { bgPosition -= step; castleContainer.style.backgroundPosition = `${bgPosition}px 0`; }
function playSound() { const sound = new Audio('dmsl.mp3'); sound.play(); }

function pressPaw(paw) {
    paw.classList.add('pressed');
    playSound();
    if (paw === leftPaw) { nakime.classList.add('play-left'); moveLeft(); handleInput('L'); }
    if (paw === rightPaw) { nakime.classList.add('play-right'); moveRight(); handleInput('R'); }
}

function releasePaw(paw) {
    paw.classList.remove('pressed');
    if (paw === leftPaw) nakime.classList.remove('play-left');
    if (paw === rightPaw) nakime.classList.remove('play-right');
}

// Keyboard and Button events (existing code, unchanged)
document.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') pressPaw(leftPaw); if (e.key === 'ArrowRight') pressPaw(rightPaw); });
document.addEventListener('keyup', e => { if (e.key === 'ArrowLeft') releasePaw(leftPaw); if (e.key === 'ArrowRight') releasePaw(rightPaw); });
leftBtn.addEventListener('mousedown', () => pressPaw(leftPaw));
leftBtn.addEventListener('mouseup', () => releasePaw(leftPaw));
rightBtn.addEventListener('mousedown', () => pressPaw(rightPaw));
rightBtn.addEventListener('mouseup', () => releasePaw(rightPaw));


// === Falling Sequence & Game Logic ===
const player = document.getElementById('player');
const petals = document.getElementById('petals');
const castleBg = document.querySelector('.castle-background');
const wisteriaBg = document.querySelector('.wisteria-background');
const buttonsContainer = document.querySelector('.button');
const playerUI = document.querySelector('.player'); // Nakime & Paws container

const triggerSequence = ['L', 'R', 'L', 'L', 'R'];
let userSequence = [];
let petalInterval; // Declared globally

function handleInput(direction) {
    userSequence.push(direction);
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== triggerSequence[i]) { userSequence = []; return; }
    }
    if (userSequence.length === triggerSequence.length) {
        fadeOutUI();
        startFall();
    }
}

function fadeOutUI() {
    // Hide Nakime's UI container and the buttons container
    playerUI.style.opacity = 0;
    buttonsContainer.style.opacity = 0;
    castleContainer.style.opacity = 0; // Fade out the entire initial game background
}

function startFall() {
    // Start the character's fall animation (CSS transition handles the 3s duration)
    // The transition from -150px to 60% will now occur.
    const fallMusic = new Audio('infinity_castle_hq.mp3'); // Use a new file
    fallMusic.play();
    player.style.top = '60%'; 
}

// --- New Global Selectors ---
const curtainLeft = document.querySelector('.curtain-panel.curtain-left');
const curtainRight = document.querySelector('.curtain-panel.curtain-right');


// --- Function to CLOSE Curtains ---
function closeCurtains() {
    // Make curtains visible
    curtainLeft.classList.remove('hidden');
    curtainRight.classList.remove('hidden');

    // Ensure they start from open positions
    curtainLeft.classList.remove('open-wide');
    curtainRight.classList.remove('open-wide');

    // Trigger the close animation
    setTimeout(() => {
        curtainLeft.classList.add('close');
        curtainRight.classList.add('close');
    }, 50); // tiny delay ensures transition triggers

    // Keep them closed for a pause, then open
    const closeDuration = 2000; // closing transition time (matches CSS)
    const pauseDuration = 3000;

    setTimeout(() => {
        openCurtains();
    }, closeDuration + pauseDuration);
}

// --- Function to OPEN Curtains ---
function openCurtains() {
    // Remove close first
    curtainLeft.classList.remove('close');
    curtainRight.classList.remove('close');

    // Now slide them open
    curtainLeft.classList.add('open-wide');
    curtainRight.classList.add('open-wide');
}

// Call this when you want the close → open animation
// For example, you can run it at the end of fall:
function onFallEnd() {
    if (fireworkGif) {
        fireworkGif.classList.remove('hidden');
        const gifDuration = 6000;
        
        setTimeout(() => {
            fireworkGif.classList.add('hidden');
            // Curtains close → open after fireworks
            closeCurtains();
        }, gifDuration);
    }
}


player.addEventListener('transitionend', onFallEnd);
