// Required start: a variable called total assigned to 0
var total = 0;

// NEW: history array and operation count objects
let history = []; // e.g., "+1", "-2", "Reset"
let operationCount = { additions: 0, subtractions: 0 };

// This function changes the background color of the result box (#resultId) 
// based on the current value of "total"
// green if total > 0, red if total < 0, white if total = 0
function updateColor() {
  const resultBox = document.querySelector("#resultId");
  if (total > 0) {
    resultBox.style.background = "lightgreen";
  } else if (total < 0) {
    resultBox.style.background = "lightcoral";
  } else {
    resultBox.style.background = "white";
  }
}

// NEW: UI updaters
function updateHistory() {
  // Clickable <li> that calls removeHistoryItem(i)
  let content = "";
  for (let i = 0; i < history.length; i++) {
    content += "<li onclick='removeHistoryItem(" + i + ")'>" + history[i] + "</li>";
  }
  document.querySelector("#historyList").innerHTML = content;
}

function removeHistoryItem(index) {
  // Splice out a single entry, then refresh list
  history.splice(index, 1);
  updateHistory();
}

function updateSummary() {
  document.querySelector("#summary").innerHTML =
  "Total additions: " + operationCount.additions + " <br> Total subtractions: " + operationCount.subtractions;
}

function checkTotal() {
  if (total > 0) {
    document.querySelector("#totalMessage").innerHTML = "The total is positive.";
  } else if (total < 0) {
    document.querySelector("#totalMessage").innerHTML = "The total is negative.";
  } else {
    document.querySelector("#totalMessage").innerHTML = "The total is zero.";
  }
}

// Refresh the sidebar bits
function updateResults() {
  // Keeps existing result rendering in the button handlers,
  // but ensures the sidebar pieces always stay in sync.
  updateHistory();
  updateSummary();
  checkTotal();
  updateColor();
}

// Recording operations
function recordOperation(opString, delta) {
  // Push operation text
  history.push(opString);

  // Count adds/subs ONLY when delta != 0
  if (delta > 0) operationCount.additions++;
  if (delta < 0) operationCount.subtractions++;

  updateResults();
}

// Each uses document.getElementById(...).addEventListener(...)
// Inside each handler, begin by assigning using total = total +/- n (or = 0),
// then update with querySelector("#resultId").innerHTML = total;
document.getElementById("btnMinus2").addEventListener("click", function () {
  total = total - 2;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();

  // NEW:
  recordOperation("-2", -2);
});

document.getElementById("btnMinus1").addEventListener("click", function () {
  total = total - 1;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();

  // NEW:
  recordOperation("-1", -1);
});

document.getElementById("btnReset").addEventListener("click", function () {
  total = 0;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();

  // NEW: Reset should be recorded but NOT counted as add/sub
  history.push("Reset");
  updateResults();
});

document.getElementById("btnPlus1").addEventListener("click", function () {
  total = total + 1;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();

  // NEW:
  recordOperation("+1", +1);
});

document.getElementById("btnPlus2").addEventListener("click", function () {
  total = total + 2;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();

  // NEW:
  recordOperation("+2", +2);
});

// NEW: Clear All
function ClearAll() {
  total = 0;
  history = [];
  operationCount.additions = 0;
  operationCount.subtractions = 0;

  // keep main result in sync
  document.querySelector("#resultId").innerHTML = total;
  updateResults();
}

// Activate Clear All button and update initial sidebar
document.addEventListener("DOMContentLoaded", function () {
  const clearBtn = document.querySelector("#clearAllBtn");
  if (clearBtn) clearBtn.addEventListener("click", ClearAll);

  // initial UI sync
  document.querySelector("#resultId").innerHTML = total;
  updateResults();
});
