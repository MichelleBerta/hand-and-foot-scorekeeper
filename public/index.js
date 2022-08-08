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
const name = document.getElementById("name");
const scoreForm = document.getElementsById("scoreForm");
const finalScores = document.getElementById("finalScores");

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
  console.log(scoreElements);

  const scoreStringArray = Array.from(scoreElements);
  console.log(scoreStringArray);

  const scoreNumberArray = scoreStringArray.map((i) => parseInt(i.textContent) || 0);
  console.log(scoreNumberArray);

  const total = scoreNumberArray.reduce((total, i) => total + i);
  console.log("total score = ", total);

  totalScore.textContent = total;

  // SAVE TO LOCAL STORAGE
  document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var totalScore = total;
    localStorage["name"] = name;
    localStorage["totalScore"] = totalScore;
    console.log(localStorage);
  };
}

// FINAL SCORE - DISPLAY LOCAL STORAGE
function displayItems() {
  var l, i;
  finalScores.innerHTML = "";
  for (i = 0; i < localStorage.length; i++) {
    x = localStorage.key(i);
    scoreForm.innerHTML += x + "<br>";
  }
}

// ADD NEW PLAYER - CLEAR FORM
function clearForm() {
  scoreForm.reset();
  // THIS DOES NOT CLEAR THE SCORE, HOWEVER, SCORE WILL CLEAR WHEN NEW INFO ADDED
}

// CREATE NEW GAME - CLEAR LOCAL STORAGE TO START NEW GAME
function deleteItems() {
  localStorage.clear();
}

// TODO
// local storage not keeping all records, wiping out each refresh
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
