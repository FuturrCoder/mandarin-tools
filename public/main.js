// disable page reload on form submit
document.querySelector('#wordsForm').addEventListener('submit', (e) => {
  e.preventDefault();
});

// if the entered number of rows and columns are not odd, disable the free square option
// otherwise enable
function checkRowsCols() {
  const rows = document.querySelector('#rowsInput').value;
  const cols = document.querySelector('#colsInput').value;
  const freeSquare = document.querySelector('#addFreeSquare');
  if (rows % 2 === 0 || cols % 2 === 0) {
    freeSquare.disabled = true;
    freeSquare.checked = false;
  } else {
    freeSquare.disabled = false;
  }
}

// generate bingo sheet with the entered settings
function generateBingo() {
  const wordsInput = document.querySelector('#wordsInput').value;
  const rows = document.querySelector('#rowsInput').value;
  const cols = document.querySelector('#colsInput').value;
  const addFreeSquare = document.querySelector('#addFreeSquare').checked;
  const allowDuplicates = document.querySelector('#allowDuplicates').checked;
  const sideLength = document.querySelector('#sideLength').value;
  const fontSize = document.querySelector('#fontSize').value;
  const fontFamily = document.querySelector('#fontFamily').value;
  if (wordsInput === '' || rows <= 0 || cols <= 0 || sideLength <= 0) {
    return;
  }
  let words = wordsInput.split('\n')
    .map((str) => {return str.trim();})
    .filter((str) => {return str !== '';});
  const table = document.querySelector('#bingoSheet');
  table.innerHTML = '';
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
          table.innerHTML = '';
          alert('Not enough words to finish bingo sheet without allowing duplicates');
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
}