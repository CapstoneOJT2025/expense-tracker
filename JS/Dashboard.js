window.App = window.App || {};

(function (App) {
  'use strict';

  function updateDashboard() {

    const dom = App.dom;
    const transactions = App.transactions;

    const income =
      transactions
        .filter(
          t => t.amount > 0
        )
        .reduce(
          (total, t) =>
            total + t.amount,
          0
        );

    const expense =
      transactions
        .filter(
          t => t.amount < 0
        )
        .reduce(
          (total, t) =>
            total + Math.abs(t.amount),
          0
        );

    const balance =
      income - expense;

    const savingsRate =
      income === 0
        ? 0
        : Math.round(
            (balance / income) * 100
          );

    dom.balanceEl.textContent =
      `₹${balance.toLocaleString()}`;

    dom.incomeEl.textContent =
      `₹${income.toLocaleString()}`;

    dom.expenseEl.textContent =
      `₹${expense.toLocaleString()}`;

    dom.savingsRateEl.textContent =
      `${savingsRate}%`;

    // ANALYTICS

    dom.transactionCountEl.textContent =
      transactions.length;

    const expenseTransactions =
      transactions.filter(
        t => t.amount < 0
      );

    const incomeTransactions =
      transactions.filter(
        t => t.amount > 0
      );

    const largestExpense =
      expenseTransactions.length
        ? Math.max(
            ...expenseTransactions.map(
              t => Math.abs(t.amount)
            )
          )
        : 0;

    const largestIncome =
      incomeTransactions.length
        ? Math.max(
            ...incomeTransactions.map(
              t => t.amount
            )
          )
        : 0;

    dom.largestExpenseEl.textContent =
      `₹${largestExpense.toLocaleString()}`;

    dom.largestIncomeEl.textContent =
      `₹${largestIncome.toLocaleString()}`;

  }

  // ==========================
  // PUBLIC EXPORTS
  // ==========================

  App.updateDashboard = updateDashboard;

})(window.App);