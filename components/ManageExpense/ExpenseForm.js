import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import { getFormattedDate } from "../../util/date";
import CustomButton from "../UI/CustomButton";
import CustomInput from "./CustomInput";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  confirmText,
  currentExpense,
}) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: currentExpense ? currentExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: currentExpense ? getFormattedDate(currentExpense.date) : "",
      isValid: true,
    },
    description: {
      value: currentExpense ? currentExpense.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const datePattern = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/;
    const dateIsValid = inputValues.date.value.match(datePattern);
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expenseData);
    } else {
      setInputValues((currentInput) => {
        return {
          amount: {
            value: currentInput.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: currentInput.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currentInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
    }
  }

  const invalidForm =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <CustomInput
          invalid={!inputValues.amount.isValid}
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <CustomInput
          invalid={!inputValues.date.isValid}
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <CustomInput
        invalid={!inputValues.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {invalidForm && (
        <View
          style={{
            alignSelf: "center",
            backgroundColor: GlobalStyles.colors.primary100,
            width: "97.8%",
            padding: 5,
            marginBottom: 10,
            borderBottomEndRadius: 6,
            borderBottomStartRadius: 6,
          }}
        >
          <Text style={styles.errorText}>Please check your input values</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton style={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.button} onPress={submitHandler}>
          {confirmText}
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
