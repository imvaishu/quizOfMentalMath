const { stdin, exit } = process;
const questionList = require("./questions.json");
const chalk = require("chalk");

const displayQuestion = function(questionList, questionNo) {
  console.log(chalk.black.bgCyan(questionList[questionNo].question));
};

const isCorrectAnswer = function(usrResponse, questionList, qNo) {
  return +questionList[qNo].answer == usrResponse;
};

const getMessage = function(usrResponse, questionList, questionNo, score) {
  let message = `Incorrect Answer\t Score: ${score}`;
  message = chalk.red(message);
  if (isCorrectAnswer(usrResponse, questionList, questionNo)) {
    message = `Correct Answer\t Score: ${++score}`;
    message = chalk.green(message);
  }
  return message;
};

const timer = function() {
  return setTimeout(() => {
    console.log("Time Out");
    stdin.emit("data");
  }, 30000);
};

const main = function(questionList) {
  let questionNo = 0;
  let score = 0;
  displayQuestion(questionList, questionNo);
  timer();

  stdin.setEncoding("utf-8");
  stdin.on("data", usrResponse => {
    const message = getMessage(usrResponse, questionList, questionNo, score);
    console.log(message);
    if (questionNo == questionList.length - 1) {
      console.log(chalk.magenta("Quiz Over"));
      exit();
    }

    timer(displayQuestion(questionList, ++questionNo));
  });
  setTimeout(() => {
    console.log("Time Out");
    exit();
  }, 500000);
};

main(questionList);
