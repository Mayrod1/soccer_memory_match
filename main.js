/**
 * Created by Mayra on 4/26/2016.
 */
var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 10;
var matchCounter = 0;

$(document).ready(function(){
    $('.card').click(function(){
        //console.log('document ready function:', this);
        flipCard(this);
    });
});
function flipCard(cardClicked){
    //console.log("flip card function this:", this);
    //console.log('blah', blah);
    $(cardClicked).addClass('flipped');
}