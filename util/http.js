import axios from "axios";

export function storeExpense(expenseDate) {
    axios.post('https://react-http-max-54195-default-rtdb.firebaseio.com/expenses.json', expenseDate);
};