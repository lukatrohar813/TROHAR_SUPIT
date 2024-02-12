$(document).ready(function () {
// Get the HTML element where the text will be displayed    
    const typedString = document.getElementById("typedString");
// Initialize Typewriter with specified options
    const typewriter = new Typewriter(typedString, {
        loop: false,
    });
// Typewriter configuration
    typewriter
        .pauseFor(500)
        .typeString('<span class="pocetnaText">Budi izvrstan u onom što vidiš!</span>')
        .pauseFor(300)
        .deleteChars(6)
        .typeString('<span class="pocetnaText">voliš.</span>')
        .pauseFor(300)
        .typeString('</br><span class="customColor PocetnaText">ZAISKRI</span>.')
        .start();
});
