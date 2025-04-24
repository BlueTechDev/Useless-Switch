document.addEventListener('DOMContentLoaded', () => {
    const switch1 = document.getElementById('switch1');
    const messageEl = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    const levelDisplay = document.getElementById('levelDisplay');
    const menu = document.getElementById('menu');
    const game = document.getElementById('game');

    let defeated = false;
let holdTimer = null;
let level = 1;
let correctSwitch = 1;

function updateLevelDisplay() {
  levelDisplay.textContent = `Level ${level}`;
}

function resetGame() {
  clearTimeout(holdTimer);
  defeated = false;
  switch1.classList.remove('on');
  switch2.classList.remove('on');
  messageEl.textContent = "Go ahead, try it...";
  resetButton.style.display = 'none';

  if (level === 2) {
    switch2.style.display = 'block';
    correctSwitch = Math.random() < 0.5 ? 1 : 2;
  } else {
    switch2.style.display = 'none';
  }

  updateLevelDisplay();
}


// Switch behavior (shared logic)
function handleSwitchPress(switchNumber) {
  if (defeated) return;

  if (level === 1) {
    holdTimer = setTimeout(() => {
      defeated = true;
      messageEl.textContent = "You beat the useless machine. But at what cost?";
      resetButton.style.display = 'inline-block';
      level = 2; // Advance to next level
    }, 5000);
  }

  else if (level === 2) {
    if (switchNumber !== correctSwitch) {
      messageEl.textContent = "Wrong switch. Back to Level 1.";
      setTimeout(() => {
        level = 1;
        resetGame();
      }, 1500);
    } else {
      holdTimer = setTimeout(() => {
        defeated = true;
        messageEl.textContent = "You outsmarted the decoy!";
        resetButton.style.display = 'inline-block';
        level = 3; // Future level
      }, 5000);
    }
  }
}

// Switch 1
switch1.addEventListener('mousedown', () => switch1.classList.add('on'));
switch1.addEventListener('mouseup', () => {
  switch1.classList.remove('on');
  handleSwitchPress(1);
});

// Switch 2
switch2.addEventListener('mousedown', () => switch2.classList.add('on'));
switch2.addEventListener('mouseup', () => {
  switch2.classList.remove('on');
  handleSwitchPress(2);
});

resetButton.addEventListener('click', () => resetGame());
updateLevelDisplay();
});