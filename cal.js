let history = [];
function appendToDisplay(value) {
  const result = document.getElementById('result');
  result.value += value;
}

function clearDisplay() {
  document.getElementById('result').value = ''; 
}

function deleteLast() {
  const result = document.getElementById('result');
  result.value = result.value.slice(0, -1); 
}


function calculatorResult() {
  const result = document.getElementById('result');
  const expression = result.value;

  if (isValidExpression(expression)) {
    const evaluatedResult = evaluateExpression(expression);
    addToHistory(expression, evaluatedResult);
    result.value = evaluatedResult;
  } else {
    alert('Expressão inválida');
  }
}

function isValidExpression(expression) {

  const regex = /^[0-9+\-*/^.()]*$/;
  return regex.test(expression);
}

function evaluateExpression(expression) {
  let formattedExpression = expression.replace(/\^/g, '**');
  return Function(`"use strict"; return (${formattedExpression})`)();
}

function addToHistory(expression, result) {
  history.push({ expression, result });
  updateHistory();
}

function updateHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';

  history.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.textContent = `${entry.expression} = ${entry.result}`;
    historyList.appendChild(listItem);
  });
}
