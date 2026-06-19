// ==========================
// DOM ELEMENTS
// ==========================

const form = document.getElementById("transaction-form");

const descriptionInput =
document.getElementById("description");

const amountInput =
document.getElementById("amount");

const categoryInput =
document.getElementById("category");

const dateInput =
document.getElementById("date");

const searchInput =
document.getElementById("search");

const filterInput =
document.getElementById("filter");

const transactionList =
document.getElementById("transaction-list");

const balanceEl =
document.getElementById("balance");

const incomeEl =
document.getElementById("income");

const expenseEl =
document.getElementById("expense");

const savingsRateEl =
document.getElementById("savings-rate");

const transactionCountEl =
document.getElementById("transaction-count");

const largestExpenseEl =
document.getElementById("largest-expense");

const largestIncomeEl =
document.getElementById("largest-income");

// ==========================
// STORAGE
// ==========================

let transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

let editId = null;

// ==========================
// DEFAULT DATE
// ==========================

dateInput.value =
new Date()
.toISOString()
.split("T")[0];

// ==========================
// INITIAL LOAD
// ==========================

renderTransactions();
updateDashboard();

// ==========================
// FORM SUBMIT
// ==========================

form.addEventListener("submit", function(e){

e.preventDefault();

const description =
descriptionInput.value.trim();

let amount =
Number(amountInput.value);

const category =
categoryInput.value;

const date =
dateInput.value;

const transactionType =
document.querySelector(
'input[name="transactionType"]:checked'
).value;

if(
!description ||
!amount ||
!date
){
alert("Please fill all fields");
return;
}

if(transactionType === "expense"){
amount = -Math.abs(amount);
}else{
amount = Math.abs(amount);
}

if(editId){

updateTransaction(
editId,
description,
amount,
category,
date
);

}else{

addTransaction(
description,
amount,
category,
date
);

}

form.reset();

dateInput.value =
new Date()
.toISOString()
.split("T")[0];

editId = null;

});

// ==========================
// SEARCH
// ==========================

searchInput.addEventListener(
"input",
renderTransactions
);

// ==========================
// FILTER
// ==========================

filterInput.addEventListener(
"change",
renderTransactions
);

// ==========================
// ADD TRANSACTION
// ==========================

function addTransaction(
description,
amount,
category,
date
){

const transaction = {

id: Date.now(),

description,

amount,

category,

date

};

transactions.push(transaction);

saveTransactions();

renderTransactions();

updateDashboard();

}

// ==========================
// EDIT
// ==========================

function editTransaction(id){

const transaction =
transactions.find(
t => t.id === id
);

if(!transaction) return;

descriptionInput.value =
transaction.description;

amountInput.value =
Math.abs(transaction.amount);

categoryInput.value =
transaction.category;

dateInput.value =
transaction.date;

if(transaction.amount >= 0){

document.querySelector(
'input[value="income"]'
).checked = true;

}else{

document.querySelector(
'input[value="expense"]'
).checked = true;

}

editId = id;

window.scrollTo({
top:0,
behavior:"smooth"
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
){

transactions =
transactions.map(transaction =>

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

renderTransactions();

updateDashboard();

}

// ==========================
// DELETE
// ==========================

function deleteTransaction(id){

const confirmDelete =
confirm(
"Delete this transaction?"
);

if(!confirmDelete) return;

transactions =
transactions.filter(
transaction =>
transaction.id !== id
);

saveTransactions();

renderTransactions();

updateDashboard();

}

// ==========================
// SAVE LOCAL STORAGE
// ==========================

function saveTransactions(){

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

}

// ==========================
// DASHBOARD
// ==========================

function updateDashboard(){

const income =
transactions
.filter(
t => t.amount > 0
)
.reduce(
(total,t) =>
total + t.amount,
0
);

const expense =
transactions
.filter(
t => t.amount < 0
)
.reduce(
(total,t) =>
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

balanceEl.textContent =
`₹${balance.toLocaleString()}`;

incomeEl.textContent =
`₹${income.toLocaleString()}`;

expenseEl.textContent =
`₹${expense.toLocaleString()}`;

savingsRateEl.textContent =
`${savingsRate}%`;

// ANALYTICS

transactionCountEl.textContent =
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

largestExpenseEl.textContent =
`₹${largestExpense.toLocaleString()}`;

largestIncomeEl.textContent =
`₹${largestIncome.toLocaleString()}`;

}

// ==========================
// RENDER
// ==========================

function renderTransactions(){

const searchTerm =
searchInput.value.toLowerCase();

const filterValue =
filterInput.value;

const filtered =
transactions.filter(transaction => {

const matchesSearch =
transaction.description
.toLowerCase()
.includes(searchTerm);

let matchesFilter = true;

if(filterValue === "income"){
matchesFilter =
transaction.amount > 0;
}

if(filterValue === "expense"){
matchesFilter =
transaction.amount < 0;
}

return (
matchesSearch &&
matchesFilter
);

});

if(filtered.length === 0){

transactionList.innerHTML =

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

transactionList.innerHTML =

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
${transaction.description}
</div>

<div class="transaction-category">
${transaction.category}
</div>

<div class="transaction-date">
${transaction.date}
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
onclick="editTransaction(${transaction.id})"
>
Edit
</button>

<button
class="delete-btn"
onclick="deleteTransaction(${transaction.id})"
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
// GLOBAL FUNCTIONS
// ==========================

window.editTransaction =
editTransaction;

window.deleteTransaction =
deleteTransaction;
