const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');

const loadExpenses = async () => {
  const res = await fetch('/api/expenses');
  const data = await res.json();
  list.innerHTML = '';
  data.forEach(exp => {
    const li = document.createElement('li');
    li.innerHTML = `${exp.name} - $${exp.amount.toFixed(2)} 
      <button onclick="deleteExpense(${exp.id})">Delete</button>`;
    list.appendChild(li);
  });
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;
  await fetch('/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, amount }),
  });
  form.reset();
  loadExpenses();
});

const deleteExpense = async (id) => {
  await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
  loadExpenses();
};

loadExpenses();
