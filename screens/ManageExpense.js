import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, patchExpense, removeExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const { addExpense, updateExpense, deleteExpense, expenses } =
    useContext(ExpensesContext);

  const currentExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsloading(true);
    try {
      await removeExpense(editedExpenseId);
      deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense!');
      setIsloading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsloading(true);
    if (isEditing) {
      try {
        await patchExpense(editedExpenseId, expenseData);
        updateExpense(editedExpenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError('Could not edit expense!');
        setIsloading(false);
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
      addExpense({
        ...expenseData,
        id: id,
      });
      navigation.goBack();
      } catch (error) {
        setError('Could not add expense!');
        setIsloading(false);
      }
    }
  }

  if (error && !isLoading) {
    return (
      <ErrorOverlay message={error} onConfirm={cancelHandler} buttonText="Okay" />
    )
  }

  if (isLoading) {
    return (
      <LoadingOverlay />
    );
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        currentExpense={currentExpense}
        confirmText={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    margin: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
