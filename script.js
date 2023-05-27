var validator = /^([1-9]|1[0-5])d(100|[2-9]|[1-9][0-9])$/;
var nowtime = new Date().toLocaleTimeString();

function rollDice() {
  var quantity = document.getElementById('quantity').value;
  var faces = document.getElementById('faces').value;

  if (!(/^\d+$/.test(quantity)) || !(/^\d+$/.test(faces))) {
    alert('Invalid input. Please enter valid quantity and faces values.');
    return;
  }

  quantity = parseInt(quantity);
  faces = parseInt(faces);

  if (quantity < 1 || quantity > 15 || faces < 2 || faces > 100) {
    alert('Invalid input. Quantity must be between 1 and 15, and faces must be between 2 and 100.');
    return;
  }

  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  outputDiv.innerHTML += '<p>Initiated Roll at: ' + new Date().toLocaleString() + '</p>';
  outputDiv.innerHTML += '<p>Rolling ' + quantity + ' x ' + faces + ' sided dice...</p>';

  var results = [];
  var index = 0;

  function displayDiceResult() {
    if (index < quantity) {
      var diceValue = Math.floor(Math.random() * faces) + 1;
      outputDiv.innerHTML += '<p>Dice ' + (index + 1) + ': ' + diceValue + '</p>';
      results.push(diceValue);
      index++;
      setTimeout(displayDiceResult, 500); // Delay of 0.5 seconds
    } else {
      displayTotalResult();
    }
  }

  function displayTotalResult() {
    var total = results.reduce(function(acc, val) {
      return acc + val;
    }, 0);
    outputDiv.innerHTML += '<p class="bold">Total: ' + total + '</p>';
    setTimeout(promptToRollAgain, 0);
  }

  function promptToRollAgain() {
    if (confirm('Would you like to roll again?')) {
      rollDice();
    } else {
      outputDiv.innerHTML += '<p>Thank you for rolling :)</p>';
    }
  }

  displayDiceResult();
}
