const outScore = document.getElementById("outScore");
const red3Score = document.getElementById("red3Score");
const wildScore = document.getElementById("wildScore");
const cleanScore = document.getElementById("cleanScore");

const dirtyScore = document.getElementById("dirtyScore");

const jokersScore = document.getElementById("jokersScore");

const acesScore = document.getElementById("acesScore");

const kingScore = document.getElementById("kingScore");

const sevenScore = document.getElementById("sevenScore");

const subtractScore = document.getElementById("subtractScore");

/* NAV */
function gfgMenu() {
  const GFG = document.querySelector('.links');
  if (GFG.classList.contains('d-none')) {
      GFG.classList.remove('d-none');
  }
  else {
      GFG.classList.add('d-none');
  }
}

// CALCULATE SCORES
function moveCursor(field, autoMove) {
  if (field.value.length >= field.maxLength) {
    document.getElementById(autoMove).focus();
  }
};

function check() {
  const yes = document.getElementById("yes");

  if (yes.checked) {
    outScore.innerHTML = 100;
  } else {
    outScore.innerHTML = 0;
  }
};

function red3MultiplyBy() {
  red3 = document.getElementById("red3Number").value;
  red3Value = 100;
  red3Score.innerHTML = red3 * red3Value;
}

function wildMultiplyBy() {
  wild = document.getElementById("wildNumber").value;
  wildValue = 1500;
  document.getElementById("wildScore").innerHTML = wild * wildValue;
}

function cleanMultiplyBy() {
  clean = document.getElementById("cleanNumber").value;
  cleanValue = 500;
  document.getElementById("cleanScore").innerHTML = clean * cleanValue;
}

function dirtyMultiplyBy() {
  dirty = document.getElementById("dirtyNumber").value;
  dirtyValue = 300;
  document.getElementById("dirtyScore").innerHTML = dirty * dirtyValue;
}

function jokersMultiplyBy() {
  jokers = document.getElementById("jokersNumber").value;
  jokersValue = 50;
  document.getElementById("jokersScore").innerHTML = jokers * jokersValue;
}

function acesMultiplyBy() {
  aces = document.getElementById("acesNumber").value;
  acesValue = 20;
  document.getElementById("acesScore").innerHTML = aces * acesValue;
}

function kingMultiplyBy() {
  king = document.getElementById("kingNumber").value;
  kingValue = 10;
  document.getElementById("kingScore").innerHTML = king * kingValue;
}

function sevenMultiplyBy() {
  seven = document.getElementById("sevenNumber").value;
  sevenValue = 5;
  document.getElementById("sevenScore").innerHTML = seven * sevenValue;
}

function subtractBy() {
  subtract = document.getElementById("subtractNumber").value;
  subtractValue = "";
  document.getElementById("subtractScore").innerHTML = -subtract - subtractValue;
}

var totalScore = [];
var newItems = [outScore.innerHTML, red3Score.innerHTML];
totalScore.push(...newItems);
console.log(totalScore);

function getTotal() {
  let totalScore = 0;
  let outScore = Number;
  let red3Score = Number;
document.getElementById("totalScore").innerHTML = (outScore + red3Score);
  console.log (totalScore);


  // convert score.innerHTML's to a number instead of a string in order to do math on them
  totalScore = 
  outScore.innerHTML + red3Score.innerHTML; 
  //+ wildScore.innerHTML + cleanScore.innerHTML + dirtyScore.innerHTML + jokersScore.innerHTML + acesScore.innerHTML + kingScore.innerHTML + sevenScore.innerHTML + subtractScore.innerHTML;
  console.log(parseInt(totalScore));
}


// function populateTotal() {
//   // reduce transaction amounts to a single total value
//   let total = score.reduce((total, t) => {
//     return total + parseInt(t.value);
//   }, 0);

//   let totalEl = document.querySelector("#totalScore");
//   totalEl.textContent = total;
// }


// BUDGET
// let score = [];
// // let myChart;

// fetch("/api/score")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     // save db data on global variable
//     score = data;

//     populateTotal();
//     populateTable();
//     // populateChart();
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

// function populateChart() {
//   // copy array and reverse it
//   let reversed = score.slice().reverse();
//   let sum = 0;

//   // create date labels for chart
//   let labels = reversed.map((t) => {
//     let date = new Date(t.date);
//     return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//   });

//   // create incremental values for chart
//   let data = reversed.map((t) => {
//     sum += parseInt(t.value);
//     return sum;
//   });

//   // remove old chart if it exists
//   if (myChart) {
//     myChart.destroy();
//   }

//   let ctx = document.getElementById("myChart").getContext("2d");

//   myChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels,
//       datasets: [
//         {
//           label: "Total Over Time",
//           fill: true,
//           backgroundColor: "#6666ff",
//           data,
//         },
//       ],
//     },
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

  // if subtracting funds, convert amount to negative number
  // if (!isAdding) {
  //   score.value *= -1;
  // }

  // // add to beginning of current array of data
  // score.unshift(score);

  // re-run logic to populate ui with new record
  // populateChart();
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
// };

// document.querySelector("#sub-btn").onclick = function () {
//   sendTransaction(false);
// };
