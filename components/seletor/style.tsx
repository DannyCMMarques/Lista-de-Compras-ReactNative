import { StyleSheet, ViewStyle } from 'react-native';


const baseBox: ViewStyle = {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    padding: 8,
};

export const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height:"auto",
    },
    itemBox: {
        ...baseBox,
        width: 45,
        height: 45,
    },
    itemBoxComDescricao: {
        ...baseBox,
        width: 75,
        height: 70,
    },
    label: {
        fontSize: 10,
        marginTop: 4,
        color: '#374151',
        textAlign: 'center',
    },
});
