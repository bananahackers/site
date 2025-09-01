const frames = 60; // Number of total frames in which the scramble effect takes place
const duration = 7000; // Duration to wait between each scramble loop
const chance = 0.28; // Chance for a random character to show in the scrambling sequence, between 0 and 1

// Constructor for the TextScramble object
function TextScramble(el) {
    this.el = el; // DOM element to apply the scramble effect on, in this case element with the .scramble CSS class
    this.chars = '!<>-_\\/[]{}—=+*^?#________'; // Symbols shown in the scramble effect
    this.update = this.update.bind(this);
}

/**
 *
 * @param {string} newText New text to show on screen
 * @returns {Promise<unknown>}
 */
TextScramble.prototype.setText = function(newText) {
    const oldText = this.el.textContent || this.el.innerText; // Current text shown on screen
    const length = Math.max(oldText.length, newText.length); // Array size of text length to store char animation info
    this.queue = Array.from({ length }, (_, i) => {
        const from = oldText[i] || ''; // Character of the current text
        const to = newText[i] || ''; // Character of the new text
        const start = Math.floor(Math.random() * frames); // Frame number to start scrambling (0 to frames)
        const end = start + Math.floor(Math.random() * frames); // Frame number to end and show the new character
        return { from, to, start, end };
    });
    this.frame = 0; // Count of frame numbers in the scramble animation
    cancelAnimationFrame(this.frameRequest); // End the current scrambling animation
    return new Promise(resolve => {
        this.resolve = resolve;
        this.update(); // Start the text scrambling sequence
    });
};

TextScramble.prototype.update = function() {
    let output = ''; // Store the scrambled text of a frame
    let complete = 0; // Count how many old chars have transitioned to the new chars (to resolve the Promise)
    for (let i = 0; i < this.queue.length; i++) {
        const item = this.queue[i]; // Get the animation info of the current character { from, to, start, end }
        if (this.frame >= item.end) {
            // When the frame number exceeds the intended end number, show the new character
            complete++;
            output += item.to;
        } else if (this.frame >= item.start) {
            // When the frame number is between the start and intended frame number, maybe show a random character or not
            if (!item.char || Math.random() < chance) {
                item.char = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
            }
            output += `<span class="text-grey-dk-000">${item.char}</span>`;
        } else {
            // When the frame number is yet to reach the start frame number, add the old character to the output
            output += item.from;
        }
    }
    // Display the scrambled or completed text on screen
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
        // All characters have been transitioned, resolve the promise
        this.resolve();
    } else {
        this.frameRequest = requestAnimationFrame(this.update); // Call the update() method to continue scrambling
        this.frame++;
    }
};

const el = document.querySelector('.scramble');
const phrases = [
    el.textContent,
    el.getAttribute('data-text2') || '',
];
const fx = new TextScramble(el);

let counter = 0;
function loop() {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(loop, duration);
    });
    counter = (counter + 1) % phrases.length;
}

loop();