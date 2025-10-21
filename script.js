// Select paw divs and buttons
const leftPaw = document.querySelector('.paw-left');
const rightPaw = document.querySelector('.paw-right');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const nakime = document.querySelector('.nakime');


const castleContainer = document.querySelector('.castle-container');
let bgPosition = 0;  // current horizontal position
const step = 800;    // pixels per click

function moveLeft() {
    bgPosition += step;  // move background right
    castleContainer.style.backgroundPosition = `${bgPosition}px 0`;
}

function moveRight() {
    bgPosition -= step;  // move background left
    castleContainer.style.backgroundPosition = `${bgPosition}px 0`;
}


// Function to play the sound
function playSound() {
    const sound = new Audio('dmsl.mp3'); // creates a new Audio object each time
    sound.play();
}

function pressPaw(paw) {
    paw.classList.add('pressed'); // move paw down
    playSound();                  // play harp sound
    
    if(paw === leftPaw){
        nakime.classList.add('play-left');
        moveLeft();
    }
    if(paw === rightPaw){
        nakime.classList.add('play-right');
        moveRight();

}}

function releasePaw(paw) {
    paw.classList.remove('pressed'); 
     if(paw === leftPaw) nakime.classList.remove('play-left');
    if(paw === rightPaw) nakime.classList.remove('play-right');
}

// Keyboard events
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') pressPaw(leftPaw);
    if (e.key === 'ArrowRight') pressPaw(rightPaw);
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') releasePaw(leftPaw);
    if (e.key === 'ArrowRight') releasePaw(rightPaw);
});

// Button events
leftBtn.addEventListener('mousedown', () => pressPaw(leftPaw));
leftBtn.addEventListener('mouseup', () => releasePaw(leftPaw));
rightBtn.addEventListener('mousedown', () => pressPaw(rightPaw));
rightBtn.addEventListener('mouseup', () => releasePaw(rightPaw));
