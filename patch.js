const fs = require('fs');
let code = fs.readFileSync('src/Components/LeftSideComponents/Input.jsx', 'utf8');

code = code.replace(
  '<DisplaySec1 dispBalAmt={formattedBalance} Income={formattedIncome} Expense={formattedExpense} />',
  '<DisplaySec1 dispBalAmt={balance} Income={income} Expense={expense} />'
);

code = code.replace(
  '<div id="transaction-list">',
  '<div id="transaction-list" role="list" aria-label="Transactions">'
);

fs.writeFileSync('src/Components/LeftSideComponents/Input.jsx', code);
