import characterData from "./data.js";
import Character from "./Character.js";

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = orc.getCharacterHtml();
}
function attack() {
  wizard.getDiceHtml();
  orc.getDiceHtml();
  wizard.takeDamage(orc.currentDiceScore);
  orc.takeDamage(wizard.currentDiceScore);
  render();
  if (wizard.isDead || orc.isDead) {
    endGame();
  }
}

function endGame() {
  const endMessage =
    wizard.isDead && orc.isDead
      ? "No victors - all creatures are dead"
      : orc.isDead
      ? "The Wizard wins"
      : wizard.isDead
      ? "The Orc is Victorious"
      : "";
  const endEmoji = wizard.isDead ? "☠️" : "🔮";
  document.querySelector("body").innerHTML = `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${endMessage}</h3>
    <p class="end-emoji">${endEmoji}</p>
</div>`;
}

const wizard = new Character(characterData.hero);
const orc = new Character(characterData.monster);
render();
document.getElementById("attack-button").addEventListener("click", attack);
