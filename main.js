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
var card_positions = [];

$(document).ready(function(){

    $('.reset').click(function(){
        resetStats();
        displayStats();
        make_cards();
        check_arrows();
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
    $('.path_show, .path_wrong').removeClass('path_show path_wrong');
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
            check_arrows();
            make_draggable(firstCardClicked);
            make_draggable(secondCardClicked);
            firstCardClicked = null;
            matchCounter++;
            console.log('match counter=', matchCounter);
            if(totalPossibleMatches == matchCounter){
                setTimeout(function(){
                    show_message('all cards matched, now get the ball in the net!');

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
            }, 1000);
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
var arrows = {"images/left_arrow.png": {y:0,x:-1},"images/right_arrow.png":{y:0,x:1},"images/up_arrow.png":{y:-1,x:0},"images/down_arrow.png":{y:1,x:0}};
function check_arrows() {
    //start at position 0,0
    var x = 0, y = 0;

    console.log(card_positions);
    var cont = true;
    var touched_cards = [];
    while (cont) {
        try {
            console.log("testing " + x + "and " + y, card_positions[y][x]);
        }
        catch(error){
            console.log('out of bounds',error);
        }
        if ((x == 5 && y == 1)||(x == 5 && y == 2)) {
            animateBall();
            win_game();
            return;
        }
        if ((x < 0 || x > 4) || (y < 0 || y > 3)) {
            console.log("out of bounds");
            touched_cards[touched_cards.length-1].removeClass('path_show');
            float_message('Out of bounds!',touched_cards[touched_cards.length-1]);
            wrong_path(touched_cards[touched_cards.length-1],'whistle');
            return;
        }
        if (!card_positions[y][x].find('.card').hasClass('flipped')) {
            float_message('Invalid player! (receiving card must be matched',card_positions[y][x]);
            wrong_path(card_positions[y][x]);
            console.log("card not flipped");
            return;
        }
        if(touched_cards.indexOf(card_positions[y][x])!=-1){
            console.log('overlapping path, quitting');
            float_message('Invalid player! (can\'t go to the same player twice',card_positions[y][x]);
            wrong_path(card_positions[y][x]);
            return;
        }

        card_positions[y][x].addClass('path_show');
        //find the current card based on position
        //get the arrow label based on the current card
        //look up that label and get the vector
        //use that vector to update x and y
        touched_cards.push(card_positions[y][x]);
        var vector = card_positions[y][x].find("img.arrow").attr("src");
        var current_vector = arrows[vector];

        y = y + current_vector.y;
        x = x + current_vector.x;
        console.log("vector:", current_vector);

    }
    var position= 0;
// make a function no params.

    function animateBall(){
        $('#ball').animate( {
            left:card_positions[position][x] + 'px',
            top:card_positions[position][y] + 'px'
        },2000, function(){
            position++;
            if(card_positions.length!==position){
                animateBall();
            }
        });
    }
}


function float_message(message, card){
    var floater = $("<div>",{
        class: 'float_text',
        html: message
    });
    card.append(floater);
    setTimeout(function(){
        floater.remove();
    },5000);
}
function show_message(message){
    $("#myModal .modal-body").html(message);
    $("#myModal").modal("show");
}
function win_game(){
    $("#goal_player")[0].play();
    show_message('GOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLL');
}
function random_num(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}
function wrong_path(card,type){
    card.addClass('path_wrong');
    if(type=='whistle'){
        $("#whistle_player")[0].play();
    } else {
        $("#negative_player")[0].play();
    }
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
        if(i%5==0){
            card_positions.push([]);
        }

        var outerDiv = $("<div>").addClass("cardHolder");
        var cardDiv = $("<div>").addClass('card');
        var backImg = $("<img>").addClass("back").attr("src", "images/card-back.jpg");//this is always the same
        var frontImg = $("<img>").addClass("front").attr("src", cardArray[i]);  //this one is taken from the cardArray
        var arrowImg = $("<img>").addClass("front arrow").attr("src", arrowArray[i]); //taken from the arrow array
        //add the array's string into the source of the front card image
        //add the card to the dom
        cardDiv.append(frontImg,arrowImg, backImg);
        outerDiv.append(cardDiv);
        card_positions[card_positions.length-1].push(outerDiv);
        $('.gameArea').append(outerDiv);
    }

}

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

            check_arrows();
        }
    });
}
