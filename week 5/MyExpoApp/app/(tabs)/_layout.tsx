import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="screen2"
        options={{
          title: "Screen 2",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📖</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="screen3"
        options={{
          title: "Screen 3",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>⚙️</Text>
          ),
        }}
      />
    </Tabs>
  );
}