import characterData from "./data.js";
import Character from "./Character.js";

let monstersArray = ["orc", "demon", "goblin"];
let isWaiting = false;
function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}
function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}
function attack() {
  if (!isWaiting) {
    wizard.setDiceHtml();
    monster.setDiceHtml();
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    render();
    if (wizard.isDead) {
      endGame();
    } else if (monster.isDead) {
      isWaiting = true;
      if (monstersArray.length === 0) {
        endGame();
      } else {
        setTimeout(() => {
          monster = getNewMonster();
          render();
          isWaiting = false;
        }, 1000);
      }
    }
  }
}

function endGame() {
  isWaiting = true;

  const endMessage =
    wizard.isDead && monster.isDead
      ? "No victors - all creatures are dead"
      : monster.isDead
      ? "The Wizard wins"
      : wizard.isDead
      ? `The ${monster.name} is Victorious`
      : "";
  const endEmoji = wizard.isDead ? "☠️" : "🔮";
  setTimeout(() => {
    document.querySelector("body").innerHTML = `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${endMessage}</h3>
    <p class="end-emoji">${endEmoji}</p>
</div>`;
  }, 1500);
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();
document.getElementById("attack-button").addEventListener("click", attack);
