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


    // console.log(mozart.name.length) to get artist name length

    // Game Mechanics
    var hangman = {
        // Start Game
        start : function() {
            gamestarted = true;
            document.getElementById("gameui").setAttribute("class","visible");
            hangman.getword();
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
                }
                createspace(currentComposer);
                playTrack(currentComposer);
            }
            // Add composers Here
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
            getrandom();
        }
    }
// - Generate blank spaces according to composer name length and play music
// - Record letter press, only call next function if letter status is either incorrect or correct
// - Loop through each letter to check if it's correct
// - If correct, assign boolean and print letter in blank space
// - If incorrect, assign boolean and print letter on bottom
// - If all correct letters are guessed stop music, refresh guess counter, delete property, and load next word