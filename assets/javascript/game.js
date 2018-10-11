

// Start the Game
var gamestarted = false
document.onkeyup = function(event) {
    if(gamestarted === false) {
        hangman.start();
        document.getElementById("intro").setAttribute("class","hidden");
        document.getElementById("introtitle").setAttribute("class","hidden");
        document.getElementById("banner").innerHTML = '<video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src="assets/images/concertoloop.mp4" type="video/mp4"></video>';
        $('.transform').toggleClass('transform-active');
    }
}

// Answers

var composers = {
    "mozart": {
        "name":"mozart",
        "song":"../sounds/somesonata.mp3"
    },
    "debussy": {
        "name":"debussy",
        "song":"../sounds/clairdelune.mp3"
    },
    "beethoven": {
        "name":"beethoven",
        "song":"../sounds/moonlight.mp3"
    }
}

console.log(Object.keys(composers).length)

// console.log(mozart.name.length) to get artist name length

// Game Mechanics
var hangman = {
    start() {
        gamestarted = true;
        document.getElementById("gameui").setAttribute("class","visible");
        hangman.generateword()
    },
    generateword() {
        var random = Math.floor((Math.random() * Object.keys(composers).length));
        var currentComposer = Object.keys(composers)[random]
        console.log(currentComposer)
    }
}

// - Generate blank spaces according to composer name length and play music
// - Record letter press, only call next function if letter status is either incorrect or correct
// - Loop through each letter to check if it's correct
// - If correct, assign boolean and print letter in blank space
// - If incorrect, assign boolean and print letter on bottom
// - If correct guesses counter === compoaser name length, stop music, refresh guess counter and load next word