   // Global Variables
    var gamestarted = false;
    var allguesses = [];
    var shownletters = 0;
    var userGuess;
    var globalaudio = "";
    var globalcomposer = "";
    var wins = 0;
   // On Key Up, Start the Game or Guess a Letter
    document.onkeyup = function(event) {
        document.getElementById("word2").setAttribute("class","row justify-content-center wordwrapper")
        document.getElementById("word2").setAttribute("class","hidden")
        if(allguesses.includes(event.key)) {
            return
        }
        if(globalcomposer && event.keyCode >= 65 && event.keyCode <= 90) {
            userGuess = event.key;
            // Create Letter Blocks
            var letterguess = document.createElement("div");
            if (globalcomposer.indexOf(userGuess) === -1) {
                letterguess.setAttribute("class","letterblock wrongletterblock");    
            } else {
                letterguess.setAttribute("class","letterblock"); 
            }
            letterguess.textContent = userGuess
            document.getElementById("guesses").appendChild(letterguess);
            allguesses.push(userGuess)
        }
        if(gamestarted === false) {
            hangman.start();
            // Switch to Game UI
            document.getElementById("intro").setAttribute("class","hidden");
            document.getElementById("introtitle").setAttribute("class","hidden");
            document.getElementById("banner").innerHTML = '<video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src="assets/images/concertoloop.mp4" type="video/mp4"></video>';
            $('.transform').toggleClass('transform-active');
        }
        if (wins < 4) {
            hangman.checkletter()
        }
        if (wins === 4) {
            hangman.youwin()
        }
    }

    // Game Functions
    var hangman = {
        // Start Game
        start : function() {
            gamestarted = true;
            document.getElementById("gameui").setAttribute("class","visible");
            hangman.getword();
        },
        youwin : function () {
            hangman.cleanup()
            document.getElementById("endmessage").textContent = "Congratulations! You Did Not Die!";
        },
        cleanup : function() {
            userGuess = ""
            globalaudio.pause()
            shownletters=0;
            allguesses = [];
            globalcomposer = "";
            // Get the <ul> element with id="myList"
            var list = document.getElementById("word");
            // As long as <ul> has a child node, remove it
            while (list.hasChildNodes()) {   
                list.removeChild(list.firstChild);
            }
            var glist = document.getElementById("guesses");
            while (glist.hasChildNodes()) {   
                glist.removeChild(glist.firstChild);
            }
        },
        getword : function() {
            var getrandom = function() {
                var random = Math.floor((Math.random() * Object.keys(composers).length));
                var currentComposer = Object.keys(composers)[random];
                // Create Blank Spaces
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
            getrandom();
            delete composers[globalcomposer]
        },
        checkletter : function() {
            for (var i = 0; i < globalcomposer.length; i++) {
                var lettergroup = document.getElementById("word").childNodes
                if (lettergroup[i].textContent === userGuess) {
                    lastguesscorrect = true
                    for (var i = 0; i < globalcomposer.length; i++) {
                        if (lettergroup[i].textContent === userGuess ) {
                        lettergroup[i].setAttribute("class","revealedletter blankspace")
                        shownletters++;
                        if (shownletters === globalcomposer.length){
                            for (var i = 0; i < globalcomposer.length;i++) {
                                var orig = document.getElementById("word").childNodes;
                                var cln = orig[i].cloneNode(true);
                                cln.setAttribute("class","revealedletter blankspace blankspace2")
                                document.getElementById("word2").appendChild(cln);
                                document.getElementById("word2").setAttribute("class","fadeanswer row justify-content-center wordwrapper")
                            }
                            wins++
                            hangman.cleanup();
                            hangman.getword();
                        } else {
                            document.getElementById("word2").innerHTML = ""
                        }
                        }
                    }
                } 
            }
        }
    }

// Add Composers Here

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


// - Generate blank spaces according to composer name length and play music
// - Record letter press, only call next function if letter status is either incorrect or correct
// - Loop through each letter to check if it's correct
// - If correct, assign boolean and print letter in blank space
// - If incorrect, assign boolean and print letter on bottom
// - If all correct letters are guessed stop music, refresh guess counter, delete property, and load next word