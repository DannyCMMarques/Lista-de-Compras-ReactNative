import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

let fontSize = 17;
let widthIcon = 30;
let heightIcon = 30;
if (width < 420) {
    fontSize = 15;
    widthIcon = 25;
    heightIcon = 25;
}
export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
        gap: 6,
    },
    iconContainer: {
        width: widthIcon,
        height: heightIcon,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: fontSize,
        fontWeight: 600,
    },
});
