'use strict'
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const transaction = document.getElementById('transaction');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions'),
);

const transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//update values
const updatedValues = function(){
    const amount = transactions.map(transaction => transaction.amount);
    const plusTransactions = amount.filter(amount => amount > 0);
    const minusTransactions = amount.filter(amount => amount < 0);
    const incomeValue = plusTransactions.reduce((acc,amount) => acc +amount, 0 );
    const expenseValue = minusTransactions.reduce((acc,amount) => acc +amount, 0 );
    moneyPlus.innerHTML = incomeValue;
    moneyMinus.innerHTML = expenseValue;
    balance.innerHTML = incomeValue + expenseValue;
}

//Add transactions to Dom list
const addTransactionDom = function(transaction){
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    //Add class name
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `${transaction.transaction} <span> ${sign} ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);
}
transactions.forEach((transaction) => addTransactionDom(transaction));
const removeTransaction = function(id){
    transaction = transactions.filter((transaction) => transaction.id !== id);
};