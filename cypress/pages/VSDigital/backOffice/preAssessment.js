import * as locators from "../../../locators/VSDigital/backOffice/preAssessment.json";

class PreAssessmentPage {
  elements = {
    ...locators,
    inputField: (field, element) =>
      cy
        .contains(this.elements.inputFieldLocator, element)
        .parent()
        .parent()
        .contains("label", field)
        .parent()
        .find("input"),
    selectField: (field, element) =>
      cy
        .contains(this.elements.selectFieldLocator, element)
        .parent()
        .parent()
        .contains("label", field)
        .parent()
        .find("select"),
    radioField: (field, value, element) =>
      cy
        .contains(this.elements.radioFieldLocator, element)
        .parent()
        .parent()
        .contains("label", field)
        .parent()
        .contains("label", value)
        .parent()
        .find("input"),
    editorField: (field, element) =>
      cy
        .contains(this.elements.questionLocator, element)
        .parent()
        .parent()
        .contains("label", field)
        .parent()
        .find(this.elements.editorFieldLocator),
    addQuestionBtn: () => cy.get(this.elements.addQuestionBtnLocator),
    saveBtn: () => cy.contains(this.elements.saveBtnLocator, "Save"),
  };

  visit() {
    cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/addpreassessment`);
    return;
  }

  editVisit(id) {
    return cy.visit(
      `${Cypress.env("BACKOFFICE_LINK")}/addpreassessment/edit/${id}`
    );
  }

  generateInfo(info) {
    this.elements.inputField("Name", "INFO").clear().type(info.name);
    this.elements.selectField("Status", "INFO").select(info.status);
    this.elements
      .radioField("BMI Calculator", info.BMICalculator, "INFO")
      .check();
    this.elements
      .inputField("Minimum Passing Score %", "INFO")
      .clear()
      .type(info.minimumPassingScore);
    this.elements
      .inputField("Minimum BMI", "INFO")
      .last()
      .clear()
      .type(info.minimumBMI);
    cy.wait(1000);
  }

  generateQuestion(info, index) {
    this.elements.addQuestionBtn().click();
    this.elements
      .editorField("Title", `Question ${index}`)
      .clear()
      .type(info.question);
    this.elements
      .radioField("Answer", info.answer, `Question ${index}`)
      .check();
    cy.wait(1000);
  }

  addPreAssessment(info) {
    cy.wait(5000);
    this.generateInfo(info);
    info.questionsAndAnswers.forEach((qna, index) => {
      this.generateQuestion(qna, index + 1);
    });
    this.elements.saveBtn().click();
  }

  validatePreAssessment(info) {
    cy.wait(5000);
    this.elements.inputField("Name", "INFO").should("have.value", info.name);
    this.elements
      .selectField("Status", "INFO")
      .find("option:selected")
      .should("contain.text", info.status);
    this.elements
      .radioField("BMI Calculator", info.BMICalculator, "INFO")
      .should("be.checked");
    this.elements
      .inputField("Minimum Passing Score %", "INFO")
      .should("have.value", info.minimumPassingScore);
    this.elements
      .inputField("Minimum BMI", "INFO")
      .last()
      .should("have.value", info.minimumBMI);

    cy.get(this.elements.questionListLocator).each((ele, ind) => {
      cy.wrap(ele)
        .find("label")
        .contains("Title")
        .parent()
        .find(this.elements.editorFieldLocator)
        .invoke("text")
        .should("contain", info.questionsAndAnswers[ind].question);

      cy.wrap(ele)
        .find("label")
        .contains("Answer")
        .parent()
        .contains("label", info.questionsAndAnswers[ind].answer)
        .parent()
        .find("input")
        .should("be.checked");
    });
  }
}

export default PreAssessmentPage;
