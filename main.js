/**
 * Created by Mayra on 4/26/2016.
 */
var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 10;
var matchCounter = 0;
var attempts = 0;
var accuracy = 0;
var gamesPlayed = 0;
var canCardsBeClicked = true;

$(document).ready(function(){
    $('.card').click(function(){
        //console.log('document ready function:', this);
        flipCard(this);
    });
    $('.reset').click(function(){
        resetStats();
        displayStats();
    })
});

function flipCard(cardClicked) {
    //console.log("flip card function this:", this);
    if(canCardsBeClicked !== true){
        return;
    }
    //console.log('blah', blah);
    $(cardClicked).addClass('flipped');
    if (firstCardClicked == null) {
        firstCardClicked = cardClicked;
        console.log('first card was clicked', firstCardClicked);
    }
    else {
        canCardsBeClicked = false;
        console.log("second card clicked");
        secondCardClicked = cardClicked;

        var firstCardImg = $(firstCardClicked).find('img.back').attr('src');
        var secondCardImg = $(secondCardClicked).find('img.back').attr('src');

        if (firstCardImg == secondCardImg) {
            firstCardClicked = null;
            matchCounter++;
            console.log('match counter=', matchCounter);
            if(totalPossibleMatches == matchCounter){
                setTimeout(function(){
                    $("#myModal").modal("show");

                }, 1500);
            }
            canCardsBeClicked = true;
        }
        else {
            setTimeout(function () {
                $(firstCardClicked).removeClass('flipped');
                $(secondCardClicked).removeClass('flipped');
                firstCardClicked = null;
                canCardsBeClicked = true;
            }, 2000);
        }
        attempts++;
        displayStats()
    }
}

function displayStats(){
    $('.gamesPlayed .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);
    if(attempts==0){
        accuracy=0;
    } else {
        accuracy = (Math.floor((matchCounter/attempts) *100));
    }
    $('.accuracy .value').text(accuracy + '%');
}

function resetStats(){
    accuracy = 0;
    matchCounter = 0;
    attempts = 0;
    gamesPlayed++;
    $(".card").removeClass('flipped');
}

