window.App = window.App || {};

(function (App) {
  'use strict';

  // ==========================
  // STORAGE / STATE
  // ==========================

  App.transactions =
    JSON.parse(
      localStorage.getItem("transactions")
    ) || [];

  App.editId = null;

  // ==========================
  // SAVE LOCAL STORAGE
  // ==========================

  function saveTransactions() {

    localStorage.setItem(
      "transactions",
      JSON.stringify(App.transactions)
    );

  }

  // ==========================
  // ADD TRANSACTION
  // ==========================

  function addTransaction(
    description,
    amount,
    category,
    date
  ) {

    const transaction = {

      id: Date.now(),

      description,

      amount,

      category,

      date

    };

    App.transactions.push(transaction);

    saveTransactions();

    App.renderTransactions();

    App.updateDashboard();

  }

  // ==========================
  // EDIT
  // ==========================

  function editTransaction(id) {

    const transaction =
      App.transactions.find(
        t => t.id === id
      );

    if (!transaction) return;

    const dom = App.dom;

    dom.descriptionInput.value =
      transaction.description;

    dom.amountInput.value =
      Math.abs(transaction.amount);

    dom.categoryInput.value =
      transaction.category;

    dom.dateInput.value =
      transaction.date;

    if (transaction.amount >= 0) {

      document.querySelector(
        'input[value="income"]'
      ).checked = true;

    } else {

      document.querySelector(
        'input[value="expense"]'
      ).checked = true;

    }

    App.editId = id;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

  // ==========================
  // UPDATE
  // ==========================

  function updateTransaction(
    id,
    description,
    amount,
    category,
    date
  ) {

    App.transactions =
      App.transactions.map(transaction =>

        transaction.id === id

          ? {
              ...transaction,
              description,
              amount,
              category,
              date
            }

          : transaction

      );

    saveTransactions();

    App.renderTransactions();

    App.updateDashboard();

  }

  // ==========================
  // DELETE
  // ==========================

  function deleteTransaction(id) {

    const confirmDelete =
      confirm(
        "Delete this transaction?"
      );

    if (!confirmDelete) return;

    App.transactions =
      App.transactions.filter(
        transaction =>
          transaction.id !== id
      );

    saveTransactions();

    App.renderTransactions();

    App.updateDashboard();

  }

  // ==========================
  // PUBLIC EXPORTS
  // ==========================

  App.saveTransactions = saveTransactions;
  App.addTransaction = addTransaction;
  App.editTransaction = editTransaction;
  App.updateTransaction = updateTransaction;
  App.deleteTransaction = deleteTransaction;

})(window.App);