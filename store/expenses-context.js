import { createContext, useReducer } from "react";

DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-04-29"),
  },
  {
    id: "e2",
    description: "A pair of pants",
    amount: 69.99,
    date: new Date("2022-03-18"),
  },
  {
    id: "e3",
    description: "A single banana",
    amount: 9.99,
    date: new Date("2022-04-06"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 24.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "A frog",
    amount: 24.99,
    date: new Date("2022-04-26"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
        const updatableExpense = state[updatableExpenseIndex];
        const updatedItem = { ...updatableExpense, ...action.payload.data };
        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updatedItem;
        return updatedExpenses;
    case "DELETE":
        return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
      expenses: expensesState,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense
  }

  return <ExpensesContext.Provider value={value} >{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
