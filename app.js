const form = document.getElementById("transaction-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const transactionList = document.getElementById("transaction-list");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    console.log("Form Submitted");

});
