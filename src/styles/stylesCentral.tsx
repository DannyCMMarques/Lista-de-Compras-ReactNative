import { COLORS } from '@/constants/Colors';
import { StyleSheet } from 'react-native';


export const stylesCentral = StyleSheet.create({
    miniContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        borderColor: COLORS.cinza_principal,
        borderWidth: 1,
    },
    container: {
        padding: 16,
    },
});
