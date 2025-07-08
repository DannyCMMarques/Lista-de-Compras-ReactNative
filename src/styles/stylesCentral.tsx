import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';


export const stylesCentral = StyleSheet.create({
    miniContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 8,
        padding: 12,
        borderColor: COLORS.cinza_principal,
        borderWidth: 1,
    },
    container: {
        padding: 16,
    },
});
