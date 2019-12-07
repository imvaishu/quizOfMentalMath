const { stdin, exit } = process;
const questionList = require("./questions.json");
const chalk = require("chalk");

const displayQuestion = function(questionList, questionNo) {
  console.log(chalk.yellow(questionList[questionNo].question));
};

const isCorrectAnswer = function(usrResponse, questionList, qNo) {
  return +questionList[qNo].answer == usrResponse;
};

const main = function(questionList) {
  let questionNo = 0;
  let score = 0;
  displayQuestion(questionList, questionNo);

  stdin.setEncoding("utf-8");
  stdin.on("data", usrResponse => {
    let message = `Incorrect Answer\t Score: ${score}`;
    message = chalk.red(message);
    if (isCorrectAnswer(usrResponse, questionList, questionNo)) {
      message = `Correct Answer\t Score: ${++score}`;
      message = chalk.green(message);
    }

    console.log(message);
    if (questionNo == questionList.length - 1) {
      console.log(chalk.magenta("Quiz Over"));
      exit();
    }

    displayQuestion(questionList, ++questionNo);
  });
  setTimeout(() => {
    console.log("Time Out");
    exit();
  }, 500000);
};

main(questionList);
