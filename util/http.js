import axios from "axios";

const baseUrl = "https://react-http-max-54195-default-rtdb.firebaseio.com";

export function storeExpense(expenseDate) {
  axios.post(`${baseUrl}/expenses.json`, expenseDate);
}

export async function fetchExpenses() {
  const response = await axios.get(`${baseUrl}/expenses.json`);

  const expenses = [];

  for (let key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}
