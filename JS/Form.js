window.App = window.App || {};

(function (App) {
  'use strict';

  // ==========================
  // FORM SUBMIT
  // ==========================

  function handleFormSubmit(e) {

    e.preventDefault();

    const dom = App.dom;

    const description =
      dom.descriptionInput.value.trim();

    let amount =
      Number(dom.amountInput.value);

    const category =
      dom.categoryInput.value;

    const date =
      dom.dateInput.value;

    const transactionType =
      document.querySelector(
        'input[name="transactionType"]:checked'
      ).value;

    if (
      !description ||
      !amount ||
      !date
    ) {
      alert("Please fill all fields");
      return;
    }

    if (transactionType === "expense") {
      amount = -Math.abs(amount);
    } else {
      amount = Math.abs(amount);
    }

    if (App.editId) {

      App.updateTransaction(
        App.editId,
        description,
        amount,
        category,
        date
      );

    } else {

      App.addTransaction(
        description,
        amount,
        category,
        date
      );

    }

    dom.form.reset();

    dom.dateInput.value =
      new Date()
        .toISOString()
        .split("T")[0];

    App.editId = null;

  }

  // ==========================
  // PUBLIC EXPORTS
  // ==========================

  App.handleFormSubmit = handleFormSubmit;

})(window.App);
