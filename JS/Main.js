window.App = window.App || {};

(function (App) {
  'use strict';

  function init() {

    const dom = App.dom;

    // ==========================
    // DEFAULT DATE
    // ==========================

    dom.dateInput.value =
      new Date()
        .toISOString()
        .split("T")[0];

    // ==========================
    // INITIAL LOAD
    // ==========================

    App.renderTransactions();
    App.updateDashboard();

    // ==========================
    // EVENT LISTENERS
    // ==========================

    dom.form.addEventListener(
      "submit",
      App.handleFormSubmit
    );

    dom.searchInput.addEventListener(
      "input",
      App.renderTransactions
    );

    dom.filterInput.addEventListener(
      "change",
      App.renderTransactions
    );

  }

  init();

})(window.App);

window.editTransaction = (id) => window.App.editTransaction(id);
window.deleteTransaction = (id) => window.App.deleteTransaction(id);