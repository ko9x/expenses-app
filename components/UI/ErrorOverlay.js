import { Text, View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function ErrorOverlay({message, onConfirm, buttonText}) {
    return <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error occurred!</Text>
        <Text style={styles.text}>{message}</Text>
        <Button title={buttonText} onPress={onConfirm} />
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {fontSize: 20,
    fontWeight: 'bold'},
})