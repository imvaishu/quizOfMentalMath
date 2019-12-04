const { stdin, exit } = process;
const questionList = require("./questions.json");

const displayQuestion = function(questionList, questionNo) {
  console.log(questionList[questionNo].question);
};

const isCorrectAnswer = function(answer, questionList, qNo) {
  return +questionList[qNo].answer == answer;
};

const main = function(questionList) {
  let questionNo = 0;
  let score = 0;
  displayQuestion(questionList, questionNo);

  stdin.on("data", answer => {
    let message = `Incorrect Answer\t Score: ${score}`;
    if (isCorrectAnswer(answer, questionList, questionNo)) {
      message = `Correct Answer\t Score: ${++score}`;
    }

    console.log(message);
    if (questionNo == questionList.length - 1) {
      console.log("Quiz Over");
      exit();
    }

    displayQuestion(questionList, ++questionNo);
  });
};

main(questionList);
