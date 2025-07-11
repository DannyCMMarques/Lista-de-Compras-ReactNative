import { COLORS } from "@/src/utils/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  checkItem: { flexDirection: "row", gap: 20 },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7,
  },
  nomeItem: { fontSize: 16, fontWeight: "500", color: "#1f2937" },
  riscado: { textDecorationLine: "line-through", color: "#9ca3af" },
  quantidadeItem: { fontSize: 14, color: COLORS.verde_principal },
  quantidadeItemDesativado: { color: "#9ca3af" },
  unidDelete: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  }
});