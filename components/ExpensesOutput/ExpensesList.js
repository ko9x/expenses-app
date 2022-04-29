import { FlatList } from "react-native";

export default function ExpensesList({expenses}) {
    return (
        <FlatList
        data={expenses}
        renderItem={}
        keyExtractor={(expense) => expense.id}
        />
    );
};