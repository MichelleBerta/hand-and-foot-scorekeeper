const outScore = document.getElementById("outScore");
const outNumber = document.getElementById("outNumber");
const red3Score = document.getElementById("red3Score");
const red3Number = document.getElementById("red3Number");
const wildScore = document.getElementById("wildScore");
const wildNumber = document.getElementById("wildNumber");
const cleanScore = document.getElementById("cleanScore");
const cleanNumber = document.getElementById("cleanNumber");
const dirtyScore = document.getElementById("dirtyScore");
const dirtyNumber = document.getElementById("dirtyNumber");
const jokersScore = document.getElementById("jokersScore");
const jokerNumber = document.getElementById("jokerNumber");
const acesScore = document.getElementById("acesScore");
const acesNumber = document.getElementById("acesNumber");
const kingScore = document.getElementById("kingScore");
const kingNumber = document.getElementById("kingNumber");
const sevenScore = document.getElementById("sevenScore");
const sevenNumber = document.getElementById("sevenNumber");
const subtractScore = document.getElementById("subtractScore");
const subtractNumber = document.getElementById("subtractNumber");
const totalScore = document.getElementById("totalScore");
const playerName = document.getElementById("name");
const scoreForm = document.getElementById("scoreForm");
const finalScores = document.getElementById("finalScores");
const highscores = document.getElementById("highscores");


// NAV
function gfgMenu() {
  const GFG = document.querySelector(".links");
  if (GFG.classList.contains("d-none")) {
    GFG.classList.remove("d-none");
  } else {
    GFG.classList.add("d-none");
  }
}

// CALCULATE SCORE ELEMENTS
function moveCursor(field, autoMove) {
  if (field.value.length >= field.maxLength) {
    document.getElementById(autoMove).focus();
  }
}

function check() {
  const yes = document.getElementById("yes");

  if (yes.checked) {
    outScore.textContent = 100;
  } else {
    outScore.textContent = 0;
  }
}

function red3MultiplyBy() {
  red3 = red3Number.value;
  red3Value = 100;
  red3Score.textContent = red3 * red3Value;
}

function wildMultiplyBy() {
  wild = wildNumber.value;
  wildValue = 1500;
  wildScore.textContent = wild * wildValue;
}

function cleanMultiplyBy() {
  clean = cleanNumber.value;
  cleanValue = 500;
  cleanScore.textContent = clean * cleanValue;
}

function dirtyMultiplyBy() {
  dirty = dirtyNumber.value;
  dirtyValue = 300;
  dirtyScore.textContent = dirty * dirtyValue;
}

function jokersMultiplyBy() {
  jokers = jokersNumber.value;
  jokersValue = 50;
  jokersScore.textContent = jokers * jokersValue;
}

function acesMultiplyBy() {
  aces = acesNumber.value;
  acesValue = 20;
  acesScore.textContent = aces * acesValue;
}

function kingMultiplyBy() {
  king = kingNumber.value;
  kingValue = 10;
  kingScore.textContent = king * kingValue;
}

function sevenMultiplyBy() {
  seven = sevenNumber.value;
  sevenValue = 5;
  sevenScore.textContent = seven * sevenValue;
}

function subtractBy() {
  subtract = subtractNumber.value;
  subtractValue = "";
  subtractScore.textContent = -subtract - subtractValue;
}

// SUMS EACH SCORE ELEMENT, DISPLAY FINAL SCORE AND SUBMIT TO LOCAL STORAGE WITH SUBMIT BUTTON
function getTotal() {
  const scoreElements = document.getElementsByClassName("score");

  const scoreStringArray = Array.from(scoreElements);

  const scoreNumberArray = scoreStringArray.map((i) => parseInt(i.textContent) || 0);

  const total = scoreNumberArray.reduce((total, i) => total + i);

  totalScore.textContent = total;

  storeGame();
}

// Submit button enters name and score into local storage

function getLocalStorageGames() {
  let games = [];

  var storedGames = JSON.parse(localStorage.getItem("games"));
  if (storedGames !== null) {
    games = storedGames;
  }

  return games;
}

function storeGame() {
  games = getLocalStorageGames();

  var game = {
    name: playerName.value.trim(),
    score: totalScore.textContent,
  };

  games.push(game);
  localStorage.setItem("games", JSON.stringify(games));
  renderGames();
  console.log(game);
}

function renderGames() {
  games = getLocalStorageGames();

  for (var i = 0; i < games.length; i++) {
    console.log(games[i]);
    var highScore = document.createElement("li");
    highScore.textContent = games[i].name + " " + games[i].score;
    highscores.append(highScore);
  }

  
}

// SORT LIST TEST AREA
// function SortScore() {
//   var sortedScore = [];
//   var items = document.getElementsByTagName("li");
//   for (var i = 0, l = items.length; i < l; i++) {
//     sortedScore.push(items[i].innerHTML);
//   }
//   sortedScore.sort();
//   for (var i = 0, l = items.length; i < l; i++) {
//     items[i].innerHTML = sortedScore[i];
//   }
// }

// on page load
function init() {}

// ADD NEW PLAYER - CLEAR FORM
function clearForm() {
  scoreForm.reset();
  outScore.textContent = "";
  red3Score.textContent = "";
  wildScore.textContent = "";
  cleanScore.textContent = "";
  dirtyScore.textContent = "";
  jokersScore.textContent = "";
  acesScore.textContent = "";
  kingScore.textContent = "";
  sevenScore.textContent = "";
  subtractScore.textContent = "";
  totalScore.textContent = "";
}

// CREATE NEW GAME - CLEAR LOCAL STORAGE TO START NEW GAME
function deleteItems() {
  localStorage.clear();
}

// TODO
// final score - displays local storage, sorted by high score

// BUDGET
// let score = [];

// fetch("/api/score")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     // save db data on global variable
//     score = data;

//     populateTotal();
//     populateTable();
//   });

// function populateTable() {
//   let tbody = document.querySelector("#modal-body");
//   tbody.innerHTML = "";

//   score.forEach((score) => {
//     // create and populate a table row
//     // added transaction.total - was not in original budget
//     let tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${score.name}</td>
//       <td>${score.total}</td>
//     `;

//     tbody.appendChild(tr);
//   });
// }

// function sendScore(isAdding) {
//   let nameEl = document.querySelector("#name");
//   let amountEl = document.querySelector("#totalScore");
//   let errorEl = document.querySelector(".form .error");

//   // validate form
//   if (nameEl.value === "" || amountEl.value === "") {
//     errorEl.textContent = "Missing Information";
//     return;
//   } else {
//     errorEl.textContent = "";
//   }

//   // create record
//   let score = {
//     name: nameEl.value,
//     value: amountEl.value,
//   };

// // add to beginning of current array of data
// score.unshift(score);

// re-run logic to populate ui with new record
// populateTable();
// populateTotal();

//   // also send to server
//   fetch("/api/score", {
//     method: "POST",
//     body: JSON.stringify(score),
//     headers: {
//       Accept: "score/json, text/plain, */*",
//       "Content-Type": "score/json",
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       if (data.errors) {
//         errorEl.textContent = "Missing Information";
//       } else {
//         // clear form
//         nameEl.value = "";
//         amountEl.value = "";
//       }
//     })
//     .catch((err) => {
//       // fetch failed, so save in indexed db
//       saveRecord(score);

//       // clear form
//       nameEl.value = "";
//       amountEl.value = "";
//     });
// }

// document.querySelector("#add-btn").onclick = function () {
//   sendTransaction(true);
// }
