// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrzqvp37HsbLfjpjgqaw3aDCumIOam9jY",
  authDomain: "mandarin-tools.firebaseapp.com",
  databaseURL: "https://mandarin-tools-default-rtdb.firebaseio.com",
  projectId: "mandarin-tools",
  storageBucket: "mandarin-tools.appspot.com",
  messagingSenderId: "253346526157",
  appId: "1:253346526157:web:fe8355c92c2a2bdf9a8a84",
  measurementId: "G-5R3QGFC8RR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

// disable page reload on form submit
document.querySelector("#wordsForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

window.checkRowsCols = checkRowsCols;
window.generateBingo = generateBingo;
window.shareBingo = shareBingo;

// if the entered number of rows and columns are not odd, disable the free square option
// otherwise enable
function checkRowsCols() {
  const rows = document.querySelector("#rowsInput").value;
  const cols = document.querySelector("#colsInput").value;
  const freeSquare = document.querySelector("#addFreeSquare");
  if (rows % 2 === 0 || cols % 2 === 0) {
    freeSquare.disabled = true;
    freeSquare.checked = false;
  } else {
    freeSquare.disabled = false;
  }
}

// generate bingo sheet with the entered settings
function generateBingo() {
  const wordsInput = document.querySelector("#wordsInput").value;
  const rows = document.querySelector("#rowsInput").value;
  const cols = document.querySelector("#colsInput").value;
  const addFreeSquare = document.querySelector("#addFreeSquare").checked;
  const allowDuplicates = document.querySelector("#allowDuplicates").checked;
  const sideLength = document.querySelector("#sideLength").value;
  const fontSize = document.querySelector("#fontSize").value;
  const fontFamily = document.querySelector("#fontFamily").value;
  if (wordsInput === "" || rows <= 0 || cols <= 0 || sideLength <= 0) {
    return;
  }
  let words = wordsInput.split("\n")
    .map((str) => {return str.trim().split(" ")[0];})
    .filter((str) => {return str !== "";});
  const table = document.querySelector("#bingoSheet");
  table.innerHTML = "";
  table.style.width = `${cols * sideLength}px`;
  table.style.height = `${rows * sideLength}px`;
  table.style.fontSize = `${fontSize}px`;
  table.style.fontFamily = fontFamily;
  for (let rowNum = 0; rowNum < rows; rowNum++) {
    const tr = table.insertRow();
    tr.style.height = `${sideLength}px`;
    for (let colNum = 0; colNum < cols; colNum++) {
      const td = tr.insertCell();
      const rand = Math.floor(Math.random() * words.length);
      let word = words[rand];
      if (!allowDuplicates) {
        if (words.length === 0) {
          table.innerHTML = "";
          alert("Not enough words to finish bingo sheet without allowing duplicates");
          document.querySelector("#sharing").style.display = "none";
          return;
        }
        words = words.filter((str) => {return str !== word;});
      }
      if (addFreeSquare && rowNum === (rows - 1) / 2 && colNum === (cols - 1) / 2) {
        word = "FREE";
      }
      td.appendChild(document.createTextNode(word));
      td.style.width = `${sideLength}px`;
    }
  }
  document.querySelector("#sharing").style.display = "block";
}

// generate a code, add it and the bingo sheet to Firebase, and display the code
function shareBingo() {
  const table = document.querySelector("#bingoSheet");
  let data = "";
  for (let row of table.rows) {
    for (let cell of row.cells) {
      data += cell.innerHTML + ",";
    }
  }
  
}