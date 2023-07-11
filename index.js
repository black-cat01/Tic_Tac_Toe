var pl;
var start = false;
var winningComb = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
var moves;
var freeBoxes;
var ch = ["X", "O"];


$(document).on("keydown", function (event) {
    console.log(event.key);
    if (event.key === "Control" && start === false) {
        startGame();
    }
});

function startGame() {
    pl = 0;
    start = true;
    moves = [[], []];
    $(".item > h3").text("");
    $(".item").removeClass("occupied winBox");
    $(".item").addClass("unoccupied");
    freeBoxes = 9;
    $(".winCombo").text("");
    turn();
}

$(".item").on({
    click: function () {
        if (start == true) {
            // console.log(this);
            var div_id = $(this).attr("id");
            var status = document.querySelector("#" + div_id).classList;
            // console.log(status[1]);
            if (status[1] === "occupied") {
                $("h1.level").text(`Player ${ch[pl]} choose any empty box`);
            } else {
                unOccupied(div_id);
            }
        }
    }
});


$(".item").hover(
    function () {
        // Code to be executed when the mouse enters the element
        console.log(this);
        $(this).css("background-color", "#AAC8A7");
    },
    function () {
        // Code to be executed when the mouse leaves the element
        console.log(this);
        $(this).css("background-color", "#59c5f0");
    }
);

$("#reset").on("click", function () {
    startGame();
});

//Player :0 or 1 
//Player Moves is an array eg. [1,4,9,5]
function unOccupied(div_id) {
    --freeBoxes;
    $("#" + div_id).removeClass("unoccupied");
    $("#" + div_id).addClass("occupied");
    var num = parseInt(div_id[div_id.length - 1]);
    console.log(num);

    if (pl == 0) {
        $("#" + div_id + " > h3").text("X");
    }
    else {
        $("#" + div_id + " > h3").text("O");
    }

    playSound(pl);
    moves[pl].push(num);
    console.log(`Printing moves[${ch[pl]}]:`, moves[pl]);
    var win = false;
    if (moves[pl].length >= 3) {
        win = hasWon();
    }
    console.log("Status win or lose:", win);

    if (win) {
        $("h1.level").text(`Player ${ch[pl]} has Won. Press Ctrl key to restart.`);
        start = false;
    } else {
        pl = (pl === 1) ? 0 : 1;
        if (freeBoxes === 0) {
            $("h1.level").text(`Game Draw. Press Ctrl key to restart game.`);
            start = false;
        } else {
            turn();
        }
    }
}


function hasWon() {
    var win = false;
    for (var i = 0; i < winningComb.length; i++) {
        console.log("Checking combination:", winningComb[i]);
        win = true;
        for (var j = 0; j < 3; j++) {
            if (moves[pl].includes(winningComb[i][j]) == false) {
                console.log(winningComb[i][j] + " missing");
                win = false;
                break;
            }
        }
        if (win === true) {
            console.log(winningComb[i] + "matched");
            // $(".winCombo").text(winningComb[i] + " matched");
            winningComb[i].forEach(function (element) {
                var bN = "#item" + element;
                $(bN).addClass("winBox");
                console.log(document.querySelector(bN).classList);
            });
            return true;
        }
    }
    return win;
}

function playSound(player) {
    if (player == 0) {
        var p0 = new Audio("./sounds/p0.mp3");
        p0.play();
    } else {
        var p1 = new Audio("./sounds/p1.mp3");
        p1.play();
    }
}

function turn() {
    $("h1.level").text(`Player ${ch[pl]}'s turn`);
}