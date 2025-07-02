// app/(tabs)/_layout.tsx
import { Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#10B981",
                tabBarInactiveTintColor: "#6B7280",
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E7EB",
                    height: 80,
                    paddingBottom: Platform.OS === "android" ? 35 : 20,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="configuracao/index"
                options={{
                    title: "Configurações",
                    tabBarIcon: ({ color }) => (
                        <Feather name="settings" size={20} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
