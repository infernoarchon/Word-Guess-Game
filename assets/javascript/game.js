var gamestarted = false
document.onkeyup = function(event) {
    if(gamestarted === false) {
        hangman.start();
        document.getElementById("intro").setAttribute("class","hidden");
        $('.transform').toggleClass('transform-active');
    }
}

var hangman = {
    start() {
        gamestarted = true;
        document.getElementById("gameui").setAttribute("class","visible");
    },
    
}

var mozart = {

}

