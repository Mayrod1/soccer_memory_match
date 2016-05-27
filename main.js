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

    $('.reset').click(function(){
        resetStats();
        displayStats();
        make_cards();
        $('.card').click(function(){
            //console.log('document ready function:', this);
            flipCard(this);
        });
    });
    make_cards();
    $('.card').click(function(){
        //console.log('document ready function:', this);
        flipCard(this);
    });
});

function flipCard(cardClicked) {
    //console.log("flip card function this:", this);
    if(canCardsBeClicked !== true){
        return;
    }
    if($(cardClicked).hasClass('flipped')){
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

        var firstCardImg = $(firstCardClicked).find('img.front').attr('src');
        var secondCardImg = $(secondCardClicked).find('img.front').attr('src');

        if (firstCardImg == secondCardImg) {
            make_draggable(firstCardClicked);
            make_draggable(secondCardClicked);
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
    $('.gameArea').text('');
}

function make_cards(){
    //make copy of array, so you don't destroy the original array
    var cardArray=["images/pique.jpg", "images/gotze.jpg", "images/ibrah.png", "images/messi.jpg", "images/di_maria.jpg", "images/neymar.jpg", "images/chicharito.jpg", "images/ronaldo1.jpg", "images/reus.jpg", "images/bale.jpg"];
    var arrowArray= ["images/left_arrow.png", "images/down_arrow.png", "images/right_arrow.png", "images/up_arrow.png","images/left_arrow.png", "images/down_arrow.png", "images/right_arrow.png", "images/up_arrow.png","images/left_arrow.png", "images/right_arrow.png", "images/down_arrow.png","images/up_arrow.png","images/right_arrow.png", "images/up_arrow.png", "images/down_arrow.png", "images/right_arrow.png", "images/right_arrow.png","images/down_arrow.png", "images/right_arrow.png", "images/right_arrow.png"];
    cardArray = cardArray.concat(cardArray);
    //randomize the copy of the array
    tempArray=[];
    tempArrowArray=[];

    while(cardArray.length>0){
        tempArray.push(cardArray.splice(Math.floor(Math.random()*cardArray.length),1)[0]);
        tempArrowArray.push(arrowArray.splice(Math.floor(Math.random()*arrowArray.length),1)[0]);
    }
        cardArray=tempArray;
        arrowArray=tempArrowArray;

    //loop through the array, and make 1 card per array element

    for(var i=0; i<cardArray.length;i++) {


        var outerDiv = $("<div>").addClass("cardHolder");
        var cardDiv = $("<div>").addClass('card');
        var backImg = $("<img>").addClass("back").attr("src", "images/card-back.jpg");//this is always the same
        var frontImg = $("<img>").addClass("front").attr("src", cardArray[i]);  //this one is taken from the cardArray
        var arrowImg = $("<img>").addClass("front arrow").attr("src", arrowArray[i]); //taken from the arrow array
        //add the array's string into the source of the front card image
        //add the card to the dom
        cardDiv.append(frontImg,arrowImg, backImg);
        outerDiv.append(cardDiv);
        $('.gameArea').append(outerDiv);
    }
}

// get src code
//
function make_draggable(element) {
    console.log("running draggable");
    $(element).css("transition-duration","0s");
    $(element).draggable({revert:true});
    $(element).droppable({
        drop: function( event, ui ) {

            var a =$(event.target).find("img.front").attr("src");
            var b= $(event.target).find("img.arrow").attr("src");
            var a2 =$(ui.draggable).find("img.front").attr("src");
            var b2= $(ui.draggable).find("img.arrow").attr("src");
            $(event.target).find("img.front").attr("src",a2);
            $(event.target).find("img.arrow").attr("src", b2);
            $(ui.draggable).find("img.front").attr("src", a);
            $(ui.draggable).find("img.arrow").attr("src", b);
            console.log(event);

        }
    });
}