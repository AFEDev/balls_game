/**
 * function generates random number from seted parameters - ninimal and maximal posible value
 * @param {} min number;
 * @param {} max number;
 * @returns random number 
 */

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * array of random numbers
 */
let arrayNumbers = [];


/**
 * function generates array of unique unsorted numbers. As parameters function take quantyti of numbers tu 
 * @param {*} quantity number - quantyti of numbers to generate
 * @param {*} max number - maximal muber
 * @returns return array of unique unsorted numbers 
 */
function randUniqe(quantity, max) {
  const set = new Set();
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1);
  }
  return (arrayNumbers = Array.from(set));
}


/**
 * Object, whitch includes function whith has 3 cases: start timer, reset timer & stop timer
 */
const countTimer = {
  id: 0,
  sec: 0,
  timer: function (mode) {
    const timerEl = document.querySelector(".laikmatis");
    switch (mode) {
      case "reset":
        timerEl.innerText = "0.0";
        this.sec = 0;
        clearInterval(this.id);
        break;
      case "start":
        this.sec = 0;
        this.id = setInterval(() => {
          this.sec++;
          timerEl.innerText = (this.sec / 100).toFixed(2);
        }, 10);
        break;
      case "stop":
        clearInterval(this.id);
        break;
    }
  },
};



const containerLeft = document.querySelector(".container_left");
const containerRight = document.querySelector(".container_right");

let arrayColor = [];

/**
 * function generates random number combination for random color in Hexadecimal format
 * @returns random color in Hexadecimal format 
 */

function randColor() {
  for (let i = 1; i < 26; i++) {
    arrayColor[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  return (arrayColor = arrayColor.length < 7 ? arrayColor + "0" : arrayColor);
}

/**
 *  function generates squeres in page dom;
 */
const makeSqueres = () => {
  let div = document.createElement("div");
  containerLeft.appendChild(div);
  div.classList.add("squereStyle");
  div.classList.add("squereL");
  let div2 = document.createElement("div");
  containerRight.appendChild(div2);
  div2.classList.add("squereStyle");
  div2.classList.add("squereR");
};


for (let i = 1; i < 26; i++) {
  makeSqueres();
}

const squereL = document.querySelectorAll(".squereL");
const squereR = document.querySelectorAll(".squereR");


/**
 * function generates random color and numeric circles in left side squeres
 */

const gamyba = () => {
  randUniqe(25, 25);
  randColor();
  squereL.forEach((element, i) => {
    let div = document.createElement("div");
    let text = document.createTextNode(arrayNumbers[i]);
    div.appendChild(text);
    element.appendChild(div);
    div.classList.add("kamuoliukas");
    div.style.backgroundColor = arrayColor[arrayNumbers[i]];
    tester(div); 
  });
};


const reset = document.querySelector(".button");
const start = document.querySelector(".mygtukas_start");

containerRight.style.display = "none";
containerLeft.style.display = "none";

//--------------------------------------START-------------------------------------------------



start.addEventListener("click", () => {
  gamyba();
  countTimer.timer("start");
  containerRight.style.display = "flex";
  containerLeft.style.display = "flex";
  start.disabled = true;
});

console.log(arrayColor);

//function for ball replacement-----------------------------------------------------------------------------

const perkelimas = (x) => {
  let div = document.createElement("div");
  let text = document.createTextNode(x);
  div.appendChild(text);
  squereR[x - 1].appendChild(div);
  div.classList.add("kamuoliukas");
  div.style.backgroundColor = arrayColor[x];
  console.log(arrayColor[x]);
};

let x = 1;
let klaidos = 0;
let laikmatis = document.querySelector(".laikmatis");

/**
 * add event to ech ball, whith tests, if pressed ball is in correct sequence (smallest posible in left squer),
 *  and shows if it wrong ball by 'zooming it'. When pressed last ball, generates message of game results in page DOM
 * @param {*} element 
 */

const tester = (element) => {
  element.addEventListener("click", () => {
    if (element.innerText == x) {
      x++;
      perkelimas(element.innerText);
      element.remove();

      if (element.innerText == 25) {
        countTimer.timer("stop");
        const body = document.querySelector("body");
        let div = document.createElement("div");
        let h1 = document.createElement("h1");
        let h2 = document.createElement("h2");
        let h3 = document.createElement("h3");
        let button = document.createElement("button");
        let textOver = document.createTextNode("GAME OVER");
        let textTime = document.createTextNode(
          `Jūsų žaimo laikas: ${laikmatis.innerText} s.`
        );
        let textMistakes = document.createTextNode(
          `Žaidime padarėte klaidų: ${klaidos}`
        );
        let buttonText = document.createTextNode("AČIŪ");
        div.appendChild(textOver);
        body.appendChild(div);
        div.classList.add("banner");
        h1.appendChild(textOver);
        div.appendChild(h1);
        h2.appendChild(textTime);
        div.appendChild(h2);
        h3.appendChild(textMistakes);
        div.appendChild(h3);
        button.appendChild(buttonText);
        div.appendChild(button);
        button.addEventListener("click", () => {
          banner = document.querySelector(".banner");
          banner.remove();
        });
      }
    } else {
      klaidos++;
      element.style.fontSize = "200px";
      element.style.position = "fixed";
      element.style.width = "50%";
      element.style.height = "50%";
      element.style.left = "20%";
      element.style.top = "20%";
      element.style.zIndex = "99";

      setTimeout(function () {
        element.style.fontSize = null;
        element.style.position = null;
        element.style.width = null;
        element.style.height = null;
        element.style.left = null;
        element.style.top = null;
        element.style.zIndex = null;
      }, 500);
    }
  });
};

//reset button---------------------------------RESET------------------------------------------------------------
reset.addEventListener("click", () => {
  x = 1;
  const kamuoliukaiR = document.querySelectorAll(".kamuoliukas");
  kamuoliukaiR.forEach((element) => {
    element.remove();
  });
  countTimer.timer("reset");
  start.disabled = false;
});
