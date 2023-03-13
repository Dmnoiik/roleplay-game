import characterData from "./data.js";
import Character from "./Character.js";

let monstersArray = ["orc", "demon", "goblin"];

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}
function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}
function attack() {
  wizard.getDiceHtml();
  monster.getDiceHtml();
  wizard.takeDamage(monster.currentDiceScore);
  monster.takeDamage(wizard.currentDiceScore);
  render();
  if (wizard.isDead) {
    endGame();
  } else if (monster.isDead) {
    if (monstersArray.length === 0) {
      endGame();
    } else {
      monster = getNewMonster();
      render();
    }
  }
}

function endGame() {
  const endMessage =
    wizard.isDead && monster.isDead
      ? "No victors - all creatures are dead"
      : monster.isDead
      ? "The Wizard wins"
      : wizard.isDead
      ? "The monster is Victorious"
      : "";
  const endEmoji = wizard.isDead ? "☠️" : "🔮";
  document.querySelector("body").innerHTML = `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${endMessage}</h3>
    <p class="end-emoji">${endEmoji}</p>
</div>`;
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();
document.getElementById("attack-button").addEventListener("click", attack);
