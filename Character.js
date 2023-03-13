import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

function Character(data) {
  Object.assign(this, data);
  this.diceArray = getDicePlaceholderHtml(this.diceCount);
  this.maxHealth = this.health;
  this.getDiceHtml = () => {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((dice) => `<div class="dice">${dice}</div>`)
      .join("");
  };

  this.takeDamage = (attackScoreArray) => {
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

  this.getHealthBarHtml = () => {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
              <div class="health-bar-inner ${
                percent > 25 ? "" : "danger"
              }" style="width: ${percent}%;"> 
              </div>
            </div>`;
  };

  this.getCharacterHtml = () => {
    const { name, avatar, health, diceArray } = this;
    const healthBar = this.getHealthBarHtml();
    return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceArray}
                </div>
            </div>`;
  };
}

export default Character;
