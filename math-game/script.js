const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
const body = document.querySelector("body");
const icon = document.getElementById("icon");

const operators = ["+", "-", "*"];
let answerValue;
let operatorQuestion;

// Icons arrays
const arrCorrectAnswers = [
  "/assets/ok-hand-svgrepo-com.svg",
  "/assets/party-popper-svgrepo-com.svg",
  "/assets/sign-of-the-horns-svgrepo-com.svg",
  "/assets/hundred-points-svgrepo-com.svg", 
  "/assets/clapping-hands-svgrepo-com.svg",
  "/assets/white-heavy-check-mark-svgrepo-com.svg",
  "/assets/beaming-face-with-smiling-eyes-svgrepo-com.svg",
  "/assets/grinning-cat-face-with-smiling-eyes-svgrepo-com.svg",
  "/assets/ballot-box-with-check-svgrepo-com.svg",
  "/assets/1st-place-medal-svgrepo-com.svg"
]

const arrWrongAnswers = [
  "/assets/neutral-face-svgrepo-com.svg",
  "/assets/loudly-crying-face-svgrepo-com.svg",
  "/assets/sad-but-relieved-face-svgrepo-com.svg",
  "/assets/upside-down-face-svgrepo-com.svg",
  "/assets/weary-face-svgrepo-com.svg",
  "/assets/bear-face-svgrepo-com.svg",
  "/assets/broken-heart-svgrepo-com.svg",
  "/assets/camel-svgrepo-com.svg",
  "/assets/crying-cat-face-svgrepo-com.svg",
  "/assets/pensive-face-svgrepo-com.svg"
]


// Random icon answer
const iconAnswer = (answer) => {
    return answer ? arrCorrectAnswers[Math.floor(Math.random() * arrCorrectAnswers.length)] : arrWrongAnswers[Math.floor(Math.random() * arrWrongAnswers.length)]
}


// Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
  // Two random values between 1 and 20
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
  console.log(num1, num2);

  // For getting random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];
  console.log(randomOperator);

  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  // Solve equation
  let solution = eval(`${num1} ${randomOperator} ${num2}`);
  console.log(num1, randomOperator, num2, solution);

  // For placing the input at random position
  let randomVar = randomValue(1, 5);
  console.log(randomVar);

  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"/> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"/> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"/> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"/>`;
  }
};
// User Input Check
submitBtn.addEventListener("click", () => {
  errorMessage.classList.add("hide");
  let userInput = document.getElementById("inputValue").value;

  //If user input is not empty
  if (userInput) {
    icon.style.width = "128px";
    icon.style.height = "128px";
    icon.style.marginBottom = "2rem";
    let image = ""

    result.style.color = "#fff";

    //If the user guessed correct answer
    if (userInput == answerValue) {
      image = iconAnswer(true);
      icon.setAttribute("src", image);
      controls.style.backgroundColor = "#32a852";

      stopGame(`Yippie!! <span> Correct</span> Answer`);
    } 
    //If user inputs operator other than +,-,* 
    else if (operatorQuestion && !operators.includes(userInput)) {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Please enter a valid operator";
    } 
    //If user guessed wrong answer
    else {
      image = iconAnswer(false);
      icon.setAttribute("src", image);
      controls.style.backgroundColor = "#b84640";

      stopGame(`Opps!!<span> Wrong</span> Answer`);
    }
  } 
  //
  else {
    errorMessage.classList.remove("hide");
    errorMessage.innerHTML = "Input Cannot Be Empty"
  }
});

// Start Game
startBtn.addEventListener("click", () => {
  controls.style.backgroundColor = "#f4c531";
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  //Controls and buttons visibility
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();
});

//  Stop Game
const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerHTML = "Restart";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};