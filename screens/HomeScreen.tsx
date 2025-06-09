import React from "react";
import { View, Button, useColorScheme } from "react-native";

export default function HomeScreen({ navigation }: any) {
  const scheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 10,
        padding: 20,
        backgroundColor: scheme === "dark" ? "#000" : "#fff",
      }}
    >
      <Button title="Thiền" onPress={() => navigation.navigate("Meditation")} />
      <Button
        title="Bài tập thở"
        onPress={() => navigation.navigate("Breathing")}
      />
      <Button
        title="Theo dõi tâm trạng"
        onPress={() => navigation.navigate("Mood")}
      />
    </View>
  );
}
