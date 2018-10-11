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

var hangman = {
    start() {
        gamestarted = true;
        document.getElementById("gameui").setAttribute("class","visible");
    },
    
}

var mozart = {

}

