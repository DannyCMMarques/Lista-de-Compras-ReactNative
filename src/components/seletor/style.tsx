import { StyleSheet, ViewStyle,Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

let widthItemComDescricao = 75;
let heightItemComDescricao = 70;

if (width < 420) {
    widthItemComDescricao = 71;
    heightItemComDescricao = 60;
}
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
        width: widthItemComDescricao,
        height: heightItemComDescricao,
    },
    label: {
        fontSize: 10,
        marginTop: 4,
        color: '#374151',
        textAlign: 'center',
    },
});
