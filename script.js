document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountSpan = document.getElementById('total-amount');

    let expenses = [];
    let totalAmount = 0;

    function updateTotal() {
        totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmountSpan.textContent = totalAmount.toFixed(2);
    }

    function addExpense(name, amount) {
        const expense = { name, amount };
        expenses.push(expense);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>€${amount.toFixed(2)}</td>
            <td><button class="delete-btn">Elimina</button></td>
        `;
        row.scope="row";
        expenseList.appendChild(row);

        row.querySelector('.delete-btn').addEventListener('click', () => {
            expenses = expenses.filter(e => e !== expense);
            row.remove();
            updateTotal();
        });

        updateTotal();
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value;
        const amount = parseFloat(expenseAmountInput.value);
        if (name && !isNaN(amount) && amount > 0) {
            addExpense(name, amount);
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        }
    });
});
