import { faker } from "@faker-js/faker";

function generatePreAssessmentDetails(info) {
  function generateQuestionAndAnswer() {
    const answers = ["Yes", "No", "Either", "Text"];

    const question = faker.lorem.sentence();

    const answer = answers[Math.floor(Math.random() * answers.length)];

    return { question, answer };
  }

  function generateQuestionnaire(numQuestions = 5) {
    const questionnaire = [];

    for (let i = 0; i < numQuestions; i++) {
      questionnaire.push(generateQuestionAndAnswer());
    }

    return questionnaire;
  }

  return {
    name: info.name || faker.person.firstName(),
    status: info.status || "Active",
    BMICalculator: faker.helpers.arrayElement(["Yes", "No"]),
    minimumPassingScore: faker.number.int({ min: 10, max: 50 }),
    minimumBMI: faker.number.int({ min: 10, max: 50 }),
    questionsAndAnswers: generateQuestionnaire(info.questionCount || 5),
  };
}
module.exports = generatePreAssessmentDetails;
