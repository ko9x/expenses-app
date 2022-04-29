import { View } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-04-29')
    },
    {
        id: 'e2',
        description: 'A pair of pants',
        amount: 69.99,
        date: new Date('2022-03-18')
    },
    {
        id: 'e3',
        description: 'A single banana',
        amount: 9.99,
        date: new Date('2022-04-06')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 24.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'A frog',
        amount: 24.99,
        date: new Date('2022-04-26')
    }
]

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}