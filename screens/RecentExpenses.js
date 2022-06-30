import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  // Since RecentExpenses is the first component that loads make the api call to set the expenses state in the context here.
  async function handleFetchExpenses() {
    try {
      let fetchedExpenses = await fetchExpenses();
      setExpenses(fetchedExpenses);
    } catch (error) {
      setError("Could not fetch expenses!");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    handleFetchExpenses();
  }, []);

  function errorHandler() {
    setError(null);
    handleFetchExpenses();
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} buttonText="Try again?" />
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      fallbackText="No expenses registered for the last 7 days"
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
    />
  );
}
