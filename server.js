const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const DB_FILE = 'db.json';

const readData = () => {
    if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
    return JSON.parse(fs.readFileSync(DB_FILE));
};

const writeData = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.get('/api/expenses', (req, res) => {
    res.json(readData());
});

app.post('/api/expenses', (req, res) => {
    const expenses = readData();
    const newExpense = {
        id: Date.now(),
        name: req.body.name,
        amount: parseFloat(req.body.amount)
    };
    expenses.push(newExpense);
    writeData(expenses);
    res.json(newExpense);
});

app.delete('/api/expenses/:id', (req, res) => {
    let expenses = readData();
    expenses = expenses.filter(exp => exp.id != req.params.id);
    writeData(expenses);
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
