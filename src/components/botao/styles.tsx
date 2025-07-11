import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

let heighButton = 70;
let paddingButton = 20;
if (width < 420) {
    heighButton = 50;
    paddingButton = 15;
}
export const styles = StyleSheet.create({
    botaoComponente: {
        height: heighButton,
        padding: paddingButton,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    textButton: {
        fontSize: 16,
        textAlign: "center",
        fontWeight:600,
    }
});
