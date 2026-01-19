console.log("app.js loaded");

let score = 0;
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");

document.getElementById("tapBtn").onclick = () => {
  score++;
  scoreEl.textContent = score;
  statusEl.textContent = "TAP!";
};

document.getElementById("resetBtn").onclick = () => {
  score = 0;
  scoreEl.textContent = score;
  statusEl.textContent = "RESET";
};

document.getElementById("saveBtn").onclick = () => {
  localStorage.setItem("simpleTapScore", score);
  statusEl.textContent = "SAVED";
};

const saved = localStorage.getItem("simpleTapScore");
if (saved !== null) {
  score = Number(saved);
  scoreEl.textContent = score;
  statusEl.textContent = "LOADED";
}
