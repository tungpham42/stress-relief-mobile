import React from "react";
import { Animated, Text, View, useColorScheme } from "react-native";

export default function BreathingCircle() {
  const scheme = useColorScheme();
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 2,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: scheme === "dark" ? "#000" : "#fff",
      }}
    >
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#a0e1e5",
          borderRadius: 50,
          transform: [{ scale }],
        }}
      />
      <Text
        style={{ marginTop: 20, color: scheme === "dark" ? "#fff" : "#000" }}
      >
        Hít vào... Thở ra...
      </Text>
    </View>
  );
}
