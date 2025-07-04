import { COLORS } from '@/constants/Colors';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    content: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.cinza_principal,
    },
});
