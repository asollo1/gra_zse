const colors = ["green", "red", "yellow", "blue"]
let gameSequence = []
let userSequence = []
let level = 0;
let started = false;

let header, green, red, yellow, blue
function startGame() {
    level = 0;
    gameSequence = [];
    userSequence = [];
    started = true;
    nextLevel();
}

function nextLevel() {
    level++;
    userSequence = [];
    gameSequence.push(colors[Math.floor(Math.random() * 4)]);
    header.text("Poziom "+level);
    playColors(0);
}
function playColors(i){
    if (i < gameSequence.length){
        switch(gameSequence[i]){
            case 'green':
                green.fadeOut(300).fadeIn(300)
                break;
            case 'red':
                red.fadeOut(300).fadeIn(300)
                break;
            case 'yellow':
                yellow.fadeOut(300).fadeIn(300)
                break;
            case 'blue':
                blue.fadeOut(300).fadeIn(300)
                break;
        }
        playAudio(gameSequence[i]);
        setTimeout(function() {playColors(i+1)}, 1000);
    }
}

function playAudio(name) {
    var audio = new Audio('dzwieki/dzwiek/' + name + '.mp3');
    $(audio).on("error", function () {
        console.log("Audio error: Nie znaleziono pliku " +name+ ".mp3")
    })
    audio.play();
}

function pressed(obj, name){
    obj.fadeOut(300).fadeIn(300);
    playAudio(name);
    userSequence.push(name);
    if (started){
        setTimeout(function () {
        if(userSequence.length === gameSequence.length){
            if(userSequence.join('') === gameSequence.join('')){
                nextLevel();
            } else {
                header.text("Game Over!")
                playAudio('game-over');
                started = false;
            }
        }}, 2000)
    } else {
        setTimeout(function() {
            startGame();
        }, 700)
    }
}
$(document).ready(function() {
    header = $('#gameheader')
    green = $('#green')
    red = $('#red')
    yellow = $('#yellow')
    blue = $('#blue')
    green.click(function (){pressed(green, "green")});
    red.click(function (){pressed(red, "red")});
    yellow.click(function (){pressed(yellow, "yellow")});
    blue.click(function (){pressed(blue, "blue")});
    startGame();
});