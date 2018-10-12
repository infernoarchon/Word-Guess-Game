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
    document.getElementById("skip").onclick = function() {
        hangman.cleanup();
        hangman.getword();
    }

    // Game Mechanics
    var globalaudio = "";
    var globalcomposer = "";
    var hangman = {
        // Start Game
        start : function() {
            gamestarted = true;
            document.getElementById("gameui").setAttribute("class","visible");
            hangman.getword();
        },
        cleanup : function() {
            globalaudio.pause()
            // Get the <ul> element with id="myList"
            var list = document.getElementById("word");

            // As long as <ul> has a child node, remove it
            while (list.hasChildNodes()) {   
                list.removeChild(list.firstChild);
            }
        },
        getword : function() {
            var getrandom = function() {
                var random = Math.floor((Math.random() * Object.keys(composers).length));
                var currentComposer = Object.keys(composers)[random];
                var createspace = function(x) {
                    for (var i=0; i < x.length; i++) {
                        var blank = document.createElement("div");
                        blank.setAttribute("class","blankspace hiddenletter");
                        blank.textContent = x.charAt(i);
                        document.getElementById("word").appendChild(blank);
                    }
                }
                var playTrack = function(x) {
                    var trackurl = composers[x].song
                    var audio = new Audio(trackurl);
                    audio.play();
                    globalaudio = audio
                }
                createspace(currentComposer);
                playTrack(currentComposer);
                globalcomposer = currentComposer;
            }
            // Add composers Here
            getrandom();
            delete composers[globalcomposer]
            console.log(composers)
        }
    }
    var composers = {
        "mozart": {
            "song":"./assets/sounds/sonatak331.mp3"
            },
        "debussy": {
            "song":"./assets/sounds/clairdelune.mp3"
            },
        "beethoven": {
            "song":"./assets/sounds/moonlight.mp3"
            },
        "tchaikovsky": {
            "song":"./assets/sounds/october.mp3"
            },
        "chopin": {
            "song":"./assets/sounds/balladesop23.mp3"
            },              
    }
 // Skip Word
//  document.getElementById("skip").onclick = function() {
//     hangman.getword()
// }
// - Generate blank spaces according to composer name length and play music
// - Record letter press, only call next function if letter status is either incorrect or correct
// - Loop through each letter to check if it's correct
// - If correct, assign boolean and print letter in blank space
// - If incorrect, assign boolean and print letter on bottom
// - If all correct letters are guessed stop music, refresh guess counter, delete property, and load next word