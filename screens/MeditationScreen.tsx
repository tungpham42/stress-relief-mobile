import React, { useEffect } from "react";
import { Button, View } from "react-native";
import { Audio } from "expo-av";

export default function MeditationScreen() {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/relax.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Phát nhạc thư giãn" onPress={playSound} />
    </View>
  );
}
