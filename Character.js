import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

class Character {
  constructor(data) {
    Object.assign(this, data);
    this.diceArrayHtml = getDicePlaceholderHtml(this.diceCount);
    this.maxHealth = this.health;
  }

  setDiceHtml() {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArrayHtml = this.currentDiceScore
      .map((dice) => `<div class="dice">${dice}</div>`)
      .join("");
  }

  takeDamage = (attackScoreArray) => {
    const totalAttackScore = attackScoreArray.reduce(
      (total, currentElement) => {
        return total + currentElement;
      }
    );
    this.health = this.health - totalAttackScore;
    if (this.health <= 0) {
      this.isDead = true;
      this.health = 0;
    }
  };

  getHealthBarHtml() {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
              <div class="health-bar-inner ${
                percent > 25 ? "" : "danger"
              }" style="width: ${percent}%;"> 
              </div>
            </div>`;
  }

  getCharacterHtml() {
    const { name, avatar, health, diceArrayHtml } = this;
    const healthBar = this.getHealthBarHtml();
    return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceArrayHtml}
                </div>
            </div>`;
  }
}

export default Character;
