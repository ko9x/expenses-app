import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

export default function AllExpenses() {
    const {expenses} = useContext(ExpensesContext);
    return <ExpensesOutput fallbackText="No registered expenses found" expensesPeriod="Total" expenses={expenses} />
};