import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function RecentExpenses() {
  const {expenses, setExpenses} = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  useEffect(() => {
    async function handleFetchExpenses() {
        let fetchedExpenses = await fetchExpenses();
        setIsLoading(false);
        setExpenses(fetchedExpenses);
    }
    handleFetchExpenses();
  }, []);

  if (isLoading) {
      return (
        <LoadingOverlay />
      )
  }

  return (
    <ExpensesOutput
      fallbackText="No expenses registered for the last 7 days"
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
    />
  );
}
