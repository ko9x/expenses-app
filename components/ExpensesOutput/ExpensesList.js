import { FlatList, Text } from "react-native";

const renderExpenseItem = ({item}) => {
    return <Text>{item.description}</Text>
}

export default function ExpensesList({expenses}) {
    return (
        <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        />
    );
};