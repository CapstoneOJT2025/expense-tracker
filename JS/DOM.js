window.App = window.App || {};

(function (App) {
  'use strict';

  App.dom = {
    form: document.getElementById("transaction-form"),

    descriptionInput: document.getElementById("description"),
    amountInput: document.getElementById("amount"),
    categoryInput: document.getElementById("category"),
    dateInput: document.getElementById("date"),

    searchInput: document.getElementById("search"),
    filterInput: document.getElementById("filter"),

    transactionList: document.getElementById("transaction-list"),

    balanceEl: document.getElementById("balance"),
    incomeEl: document.getElementById("income"),
    expenseEl: document.getElementById("expense"),
    savingsRateEl: document.getElementById("savings-rate"),

    transactionCountEl: document.getElementById("transaction-count"),
    largestExpenseEl: document.getElementById("largest-expense"),
    largestIncomeEl: document.getElementById("largest-income")
  };

})(window.App);