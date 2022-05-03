import { useContext, useLayoutEffect } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

export default function RecentExpenses() {
    const {expenses} = useContext(ExpensesContext);

    const recentExpenses = expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    })

    useLayoutEffect(() => {
    }, [expenses])

    return <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses}/>
};