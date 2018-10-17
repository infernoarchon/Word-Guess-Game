$(document).ready(function() {  
  // Global Variables
    var gamestarted = false;
    var gamestate;
    var allguesses = [];
    var shownletters = 0;
    var userGuess;
    var globalaudio = "";
    var globalcomposer = "";
    var wins = 0;
    var strikes = 10;
   // On Key Up, Start the Game or Guess a Letter
    document.onkeyup = function(event) {
        console.log(gamestarted)
        document.getElementById("word2").setAttribute("class","row justify-content-center wordwrapper")
        document.getElementById("word2").setAttribute("class","hidden")
        // Ignores repeated guesses and invalid
        if(gamestarted && (allguesses.includes(event.key) || event.keyCode < 65 || event.keyCode > 90)) {
            return 
        }
        if(globalcomposer && event.keyCode >= 65 && event.keyCode <= 90) {
            userGuess = event.key;
            userGuess = userGuess.toLowerCase();
            // Create Letter Blocks
            var letterguess = document.createElement("div");
            if (globalcomposer.indexOf(userGuess) === -1) {
                letterguess.setAttribute("class","letterblock wrongletterblock");   
                strikes = strikes - 1;
                hangman.incorrect();
                var getheart = document.getElementById("heartwrapper");
                getheart.removeChild(getheart.firstChild);
            } else {
                letterguess.setAttribute("class","letterblock"); 
            }
            letterguess.textContent = userGuess
            document.getElementById("guesses").appendChild(letterguess);
            allguesses.push(userGuess)
        }
        if(gamestarted === false && gamestate == null ) {
            hangman.start();
            // Switch to Game UI
            document.getElementById("intro").setAttribute("class","hidden");
            document.getElementById("introtitle").setAttribute("class","hidden");
            document.getElementById("banner").innerHTML = '<div id="heartwrapper"></div><video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src="assets/images/concertoloop.mp4" type="video/mp4"></video>';
            hangman.lifecounter();
            $('.transform').toggleClass('transform-active');
        }
        if (strikes === 0) {
            hangman.youlose()
        }
        if (wins < 10) {
            hangman.checkletter()
        }
        if (wins === 10) {
            hangman.youwin()
        }
        if(event.keyCode === 32 && gamestarted === false) {
            location.reload()
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
            gamestarted = false;
            gamestate = "won";
            hangman.cleanup()
            document.getElementById("banner").innerHTML = '';
            document.getElementById("displayarea").setAttribute("class","innerwrapper rounded innerwrappernobg");
            document.getElementById("banner").setAttribute("class","rounded-top winbanner")
            document.getElementById("endmessage").innerHTML = "You've escaped! You are no longer in <i>treble</i>.<div class='playagainmsg blink_me'>Press spacebar to play again</div>";
        },
        youlose : function () {
            gamestarted = false;
            gamestate = "lost";
            hangman.cleanup()
            document.getElementById("banner").innerHTML = '';
            document.getElementById("displayarea").setAttribute("class","rounded innerwrappernobg");
            document.getElementById("banner").setAttribute("class","rounded-top losebanner")
            hangman.gameover()
            document.getElementById("endmessage").innerHTML = "You died! Guess this isn't really your <i>forte</i>.<div class='playagainmsg blink_me'>Press spacebar to play again</div>";
        },        
        cleanup : function() {
            userGuess = ""
            globalaudio.pause()
            shownletters=0;
            allguesses = [];
            globalcomposer = "";
            strikes = 10;
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
        lifecounter : function() {
            for (var i = 0; i < 10; i++ ){
                var life = document.createElement("i");
                life.setAttribute("class","fas fa-heart heartstyle");
                document.getElementById("heartwrapper").appendChild(life)
            }
        },
        refreshlife : function() {
            var currentlife = document.getElementById("heartwrapper").childElementCount
            for (var i = 0; i < 10-currentlife; i++) {
                var life = document.createElement("i");
                life.setAttribute("class","fas fa-heart heartstyle");
                document.getElementById("heartwrapper").appendChild(life)
            }
        },
        // Game Sounds
        correct : function() {
            var sound = new Audio("./assets/sounds/correct.mp3");
            sound.volume = 0.1;
            sound.play();
        },
        incorrect : function() {
            var sound = new Audio("./assets/sounds/incorrect.wav");
            sound.volume = 0.1;
            sound.play();
        },
        complete : function() {
            var sound = new Audio("./assets/sounds/complete.wav");
            sound.volume = 0.1;
            sound.play();
        },
        gameover : function() {
            var sound = new Audio("./assets/sounds/gameover.wav");
            sound.volume = 0.1;
            sound.play();
        },
        // Main getword function
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
                // Play Composer Track
                var playTrack = function(x) {
                    var trackurl = composers[x].song
                    var audio = new Audio(trackurl);
                    audio.play();
                    audio.loop=true;
                    globalaudio = audio
                }
                createspace(currentComposer);
                playTrack(currentComposer);
                globalcomposer = currentComposer;
                console.log(globalcomposer)
            }
            getrandom();
            delete composers[globalcomposer]
        },
        checkletter : function() {
            for (var i = 0; i < globalcomposer.length; i++) {
                var lettergroup = document.getElementById("word").childNodes
                if (lettergroup[i].textContent === userGuess) {
                    for (var i = 0; i < globalcomposer.length; i++) {
                        if (lettergroup[i].textContent === userGuess ) {
                        lettergroup[i].setAttribute("class","revealedletter blankspace")
                        shownletters++;
                        hangman.correct();
                        if (shownletters === globalcomposer.length){
                            for (var i = 0; i < globalcomposer.length;i++) {
                                var orig = document.getElementById("word").childNodes;
                                var cln = orig[i].cloneNode(true);
                                cln.setAttribute("class","revealedletter blankspace blankspace2")
                                document.getElementById("word2").appendChild(cln);
                                document.getElementById("word2").setAttribute("class","fadeanswer row justify-content-center wordwrapper")
                            }
                            wins++
                            hangman.complete()
                            hangman.cleanup();
                            hangman.refreshlife();
                            hangman.getword();
                        } else {
                            document.getElementById("word2").innerHTML = ""
                        }
                        }
                    }
                } 
            }
        },
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
            "song":"./assets/sounds/notturno2.mp3"
        },
        "satie": {
            "song":"./assets/sounds/gymnopedie1.mp3"
        },
        "clementi": {
            "song":"./assets/sounds/sonatinaop36n1-1.mp3"
        },
        "dvorak": {
            "song":"./assets/sounds/legend01.mp3"
        },
        "grieg": {
            "song":"./assets/sounds/nocturne54.mp3"
        },
        "schumann": {
            "song":"./assets/sounds/traumerei.mp3"
        },
        "schubert": {
            "song":"./assets/sounds/impromptuop90n3.mp3"
        },
        "mendelssohn": {
            "song":"./assets/sounds/op62n6.mp3"
        },
        "rachmaninoff": {
            "song":"./assets/sounds/op33n7.mp3"
        },
        "brahms": {
            "song":"./assets/sounds/danzaungh2m-05.mp3"
        },
        "shostakovich": {
            "song":"./assets/sounds/concerto2-3.mp3"
        },
        "bach": {
            "song":"./assets/sounds/inventio08.mp3"
        },
        "couperin": {
            "song":"./assets/sounds/baricades-misterieuses.mp3"
        },
        "bertini": {
            "song":"./assets/sounds/studioop29n11.mp3"
        },
        "haydn": {
            "song":"./assets/sounds/sonatahob6-3.mp3"
        },
        "yiruma": {
            "song":"./assets/sounds/riverflowsinyou.mp3"
        }                                 
    }

})
// - Generate blank spaces according to composer name length and play music
// - Record letter press, only call next function if letter status is either incorrect or correct
// - Loop through each letter to check if it's correct
// - If correct, assign boolean and print letter in blank space
// - If incorrect, assign boolean and print letter on bottom
// - If all correct letters are guessed stop music, refresh guess counter, delete property, and load next word