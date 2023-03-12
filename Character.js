import { getDiceRollArray, getDicePlaceholderHtml } from "./utils.js";

function Character(data) {
  Object.assign(this, data);

  this.diceArray = getDicePlaceholderHtml(this.diceCount);

  this.getDiceHtml = function () {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((dice) => `<div class="dice">${dice}</div>`)
      .join("");
  };

  this.takeDamage = function (attackScoreArray) {
    console.log(`${this.name} is damaged`);
    console.log(attackScoreArray);
  };

  this.getCharacterHtml = function () {
    const { name, avatar, health, diceArray } = this;
    return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                <div class="dice-container">
                    ${diceArray}
                </div>
            </div>`;
  };
}

export default Character;
