const questionList = require("./questions.json");
const { stdin, stdout, exit } = process;
const displayQuestion = function(questionList, qNo) {
  console.log(questionList[qNo].question);
};
const isCorrect = function(answer, questionList, qNo) {
  const ans = +questionList[qNo].answer;
  return ans == answer;
};
const main = function(questionList) {
  let qNo = 0;
  displayQuestion(questionList, qNo);
  stdin.on("data", answer => {
    let message = "Incorrect Answer";
    if (isCorrect(answer, questionList, qNo)) {
      message = "Correct Answer";
    }
    console.log(message);
    displayQuestion(questionList, ++qNo);
  });
};
main(questionList);
