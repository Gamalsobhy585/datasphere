const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

const customers = require('./customers.json');
const transactions = require('./transactions.json');

app.use(cors()); 
app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/transactions', (req, res) => {
    res.json(transactions);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
