
// function check() {
//   document.getElementById("yes").checked = true;
// }

// if (true.checked){
//   document.getElementById("outScore").innerHTML = 100;;
// }else if (false.checked) {
//   document.getElementById("outScore").innerHTML = 0;
// }​

function red3MultiplyBy() {
  red3 = document.getElementById("red3Number").value;
  red3Value = 100;
  document.getElementById("red3Score").innerHTML = red3 * red3Value;
};

function wildMultiplyBy() {
  wild = document.getElementById("wildNumber").value;
  wildValue = 1500;
  document.getElementById("wildScore").innerHTML = wild * wildValue;
};

function cleanMultiplyBy() {
  clean = document.getElementById("cleanNumber").value;
  cleanValue = 500;
  document.getElementById("cleanScore").innerHTML = clean * cleanValue;
};

function dirtyMultiplyBy() {
  dirty = document.getElementById("dirtyNumber").value;
  dirtyValue = 300;
  document.getElementById("dirtyScore").innerHTML = dirty * dirtyValue;
};

function jokersMultiplyBy() {
  jokers = document.getElementById("jokersNumber").value;
  jokersValue = 50;
  document.getElementById("jokersScore").innerHTML = jokers * jokersValue;
};

function acesMultiplyBy() {
  aces = document.getElementById("acesNumber").value;
  acesValue = 20;
  document.getElementById("acesScore").innerHTML = aces * acesValue;
};

function kingMultiplyBy() {
  king = document.getElementById("kingNumber").value;
  kingValue = 10;
  document.getElementById("kingScore").innerHTML = king * kingValue;
};


function sevenMultiplyBy() {
  seven = document.getElementById("sevenNumber").value;
  sevenValue = 5;
  document.getElementById("sevenScore").innerHTML = seven * sevenValue;
};

function subtractBy() {
  subtract = document.getElementById("subtractNumber").value;
  subtractValue = "";
  document.getElementById("subtractScore").innerHTML = -subtract - subtractValue;
};














// BUDGET
let transactions = [];
let myChart;

fetch("/api/transaction")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // save db data on global variable
    transactions = data;

    populateTotal();
    populateTable();
    populateChart();
  });

function populateTotal() {
  // reduce transaction amounts to a single total value
  let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}

function populateTable() {
  let tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";

  transactions.forEach((transaction) => {
    // create and populate a table row
    // added transaction.total - was not in original budget
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${transaction.name}</td>
      <td>${transaction.value}</td>
      <td>${transaction.total}</td> 
    `;

    tbody.appendChild(tr);
  });
}

function populateChart() {
  // copy array and reverse it
  let reversed = transactions.slice().reverse();
  let sum = 0;

  // create date labels for chart
  let labels = reversed.map((t) => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental values for chart
  let data = reversed.map((t) => {
    sum += parseInt(t.value);
    return sum;
  });

  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  let ctx = document.getElementById("myChart").getContext("2d");

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Total Over Time",
          fill: true,
          backgroundColor: "#6666ff",
          data,
        },
      ],
    },
  });
}

function sendTransaction(isAdding) {
  let nameEl = document.querySelector("#t-name");
  let amountEl = document.querySelector("#t-amount");
  let errorEl = document.querySelector(".form .error");

  // validate form
  if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  } else {
    errorEl.textContent = "";
  }

  // create record
  let transaction = {
    name: nameEl.value,
    value: amountEl.value,
    date: new Date().toISOString(),
  };

  // if subtracting funds, convert amount to negative number
  if (!isAdding) {
    transaction.value *= -1;
  }

  // add to beginning of current array of data
  transactions.unshift(transaction);

  // re-run logic to populate ui with new record
  populateChart();
  populateTable();
  populateTotal();

  // also send to server
  fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      } else {
        // clear form
        nameEl.value = "";
        amountEl.value = "";
      }
    })
    .catch((err) => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);

      // clear form
      nameEl.value = "";
      amountEl.value = "";
    });
}

document.querySelector("#add-btn").onclick = function () {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function () {
  sendTransaction(false);
};
