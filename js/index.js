var playerSign = "";
var computerSign = "";
var turn = "";
var countMoves = 0;
var playerMoves = [];
var computerMoves = [];
var winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
var winner = "";
$(".choosenSigns").hide();
$(".winner__header").hide();
//set signs for player
$(".choosesign button").click(function chooseSign() {
  playerSign = this.value;
  playerSign == "x" ? computerSign = "o" : computerSign = "x";
  $(".choosesign").hide();
  $(".choosenSigns").show();
  var urSign = document.getElementById("urSign");
  urSign.innerHTML = playerSign;
  var compSign = document.getElementById("compSign");
  compSign.innerHTML = computerSign;
  // turn = "player";
  $(".playboard").removeClass("disable");
});

//player move
$(".col").click(function setPlayerMove() {
  // turn = "player";
  if (this.innerHTML == "") {
    playerMoves.push(Number(this.id.slice(-1)));
    this.innerHTML = playerSign;
    $(this).addClass("taken player");
    countMoves++;
    checkWin();
  }
  $(".playboard").addClass("disable");
  setTimeout(function () {
    checkWin();
    setComputerMove();
    $(".playboard").removeClass("disable");
  }, 500);
});

//computer move
function setComputerMove() {
  // turn = "computer";
  var box = "";
  var randomNumber = "";
  function pickRandomBox() {
    randomNumber = Math.floor(Math.random() * 9) + 1;
    box = $("#box_" + randomNumber);
  }

  if (countMoves < 10 && winner == "") {
    pickRandomBox();
    if (box[0].innerHTML == "") {
      box[0].innerHTML = computerSign;
      $(box[0]).addClass("taken computer");
      countMoves++;
      computerMoves.push(randomNumber);
      checkWin();
    } else {
      setComputerMove();
    }
  }
}

function checkWin() {
  for (var i = 0; i < winCombos.length; i++) {
    if (playerMoves.indexOf(winCombos[i][0]) > -1 && playerMoves.indexOf(winCombos[i][1]) > -1 && playerMoves.indexOf(winCombos[i][2]) > -1) {
      winner = "player";
      $(".col").addClass("disable");
      showWinner();
      return;
    } else if (computerMoves.indexOf(winCombos[i][0]) > -1 && computerMoves.indexOf(winCombos[i][1]) > -1 && computerMoves.indexOf(winCombos[i][2]) > -1) {
      winner = "computer";
      $(".col").addClass("disable");
      showWinner();
      return;
    } else if (winner == "" && countMoves == 9) {
      $(".winner__header").show();
      $("#winner").text("...oh, wait! it's a draw!");
    }
  }
}

$("#reset").click(function resetGame() {
  turn = "";
  countMoves = 0;
  playerMoves = [];
  computerMoves = [];
  winner = "";
  $(".col").html("");
  $(".playboard").removeClass("disable");
  $(".col").removeClass("disable player computer taken");
  $(".winner__header").hide();
});

function showWinner() {
  $(".winner__header").show();
  $("#winner").text(winner + "!");
}