document.addEventListener('DOMContentLoaded', function () {
    const expenseNameInput = document.getElementById('Expense-name');
    const amountInput = document.getElementById('Amount');
    const dateInput = document.getElementById('date');
    const categoryInput = document.querySelector('select');
    const expenseTable = document.querySelector('#table tbody');
    const totalAmountDisplay = document.getElementById('Total-amount');
    const addButton = document.querySelector('button[type="submit"]');

    let totalAmount = 0;

    function addExpense() {
        const expenseName = expenseNameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;
        const category = categoryInput.value;

        if (!expenseName || isNaN(amount) || category === '' || !date) {
            alert('Please fill in all fields with valid data.');
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expenseName}</td>
            <td>${amount.toFixed(2)}</td>
            <td>${category}</td>
            <td>${date}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        expenseTable.appendChild(row);

        totalAmount += amount;
        totalAmountDisplay.textContent = totalAmount.toFixed(2);

        clearInputs();

        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function () {
            deleteExpense(row, amount);
        });
    }

    function clearInputs() {
        expenseNameInput.value = '';
        amountInput.value = '';
        categoryInput.selectedIndex = 0; // Reset the select to the first option
        dateInput.value = '';
    }

    function deleteExpense(row, amount) {
        row.remove();
        totalAmount -= amount;
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    addButton.addEventListener('click', function (e) {
        e.preventDefault();
        addExpense();
    });
});
