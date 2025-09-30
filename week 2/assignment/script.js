// Required start: a variable called total assigned to 0
var total = 0;

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

// Each uses document.getElementById(...).addEventListener(...)
// Inside each handler, begin by assigning using total = total +/- n (or = 0),
// then update with querySelector("#resultId").innerHTML = total;

document.getElementById("btnMinus2").addEventListener("click", function () {
  total = total - 2;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();
});

document.getElementById("btnMinus1").addEventListener("click", function () {
  total = total - 1;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();
});

document.getElementById("btnReset").addEventListener("click", function () {
  total = 0;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();
});

document.getElementById("btnPlus1").addEventListener("click", function () {
  total = total + 1;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();
});

document.getElementById("btnPlus2").addEventListener("click", function () {
  total = total + 2;
  document.querySelector("#resultId").innerHTML = total;
  updateColor();
});