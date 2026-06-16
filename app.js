const form = document.getElementById("transaction-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const transactionList = document.getElementById("transaction-list");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = description.value;
    const money = amount.value;

    const newTransaction = document.createElement("li");

    newTransaction.textContent =
        `${text} : $${money}`;

    transactionList.appendChild(newTransaction);

    description.value = "";
    amount.value = "";

});
