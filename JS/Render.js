window.App = window.App || {};

(function (App) {
  'use strict';

  // Escapes user-entered text before inserting into innerHTML, so a
  // transaction description like "<img src=x onerror=alert(1)>" is
  // displayed as plain text instead of executing as HTML.
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str ?? '';
    return div.innerHTML;
  }

  function renderTransactions() {

    const dom = App.dom;

    const searchTerm =
      dom.searchInput.value.toLowerCase();

    const filterValue =
      dom.filterInput.value;

    const filtered =
      App.transactions.filter(transaction => {

        const matchesSearch =
          transaction.description
            .toLowerCase()
            .includes(searchTerm);

        let matchesFilter = true;

        if (filterValue === "income") {
          matchesFilter =
            transaction.amount > 0;
        }

        if (filterValue === "expense") {
          matchesFilter =
            transaction.amount < 0;
        }

        return (
          matchesSearch &&
          matchesFilter
        );

      });

    if (filtered.length === 0) {

      dom.transactionList.innerHTML =

        `
        <div class="empty-state">

          <h3>
            No Transactions Found
          </h3>

          <p>
            Add your first transaction.
          </p>

        </div>
        `;

      return;

    }

    dom.transactionList.innerHTML =

      filtered
        .slice()
        .reverse()
        .map(transaction => {

          const amountClass =
            transaction.amount > 0
              ? "amount-positive"
              : "amount-negative";

          const amountSign =
            transaction.amount > 0
              ? "+"
              : "-";

          return `

            <div class="transaction">

              <div class="transaction-left">

                <div class="transaction-title">
                  ${escapeHtml(transaction.description)}
                </div>

                <div class="transaction-category">
                  ${escapeHtml(transaction.category)}
                </div>

                <div class="transaction-date">
                  ${escapeHtml(transaction.date)}
                </div>

              </div>

              <div class="transaction-right">

                <span class="${amountClass}">
                  ${amountSign} ₹${Math.abs(
                    transaction.amount
                  ).toLocaleString()}
                </span>

                <button
                  class="edit-btn"
                  onclick="App.editTransaction(${transaction.id})"
                >
                  Edit
                </button>

                <button
                  class="delete-btn"
                  onclick="App.deleteTransaction(${transaction.id})"
                >
                  Delete
                </button>

              </div>

            </div>

          `;

        })
        .join("");

  }

  // ==========================
  // PUBLIC EXPORTS
  // ==========================

  App.renderTransactions = renderTransactions;

})(window.App);