import React, { useState, useEffect } from "react";
import { View, Button, Text, FlatList, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MOODS = ["😊", "😐", "😣"];

type MoodEntry = {
  date: string;
  mood: string;
};

export default function MoodScreen() {
  const scheme = useColorScheme();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    loadMoods();
  }, []);

  const getTodayKey = () => {
    const today = new Date().toISOString().split("T")[0];
    return `mood-${today}`;
  };

  const saveMood = async (mood: string) => {
    const entry: MoodEntry = { date: getTodayKey(), mood };
    try {
      await AsyncStorage.setItem(getTodayKey(), JSON.stringify(entry));
      await loadMoods();
      setSelectedMood(mood);
    } catch (e) {
      console.error("Lỗi khi lưu tâm trạng:", e);
    }
  };

  const loadMoods = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const moodKeys = keys.filter((k) => k.startsWith("mood-"));
      const items = await AsyncStorage.multiGet(moodKeys);
      const entries: MoodEntry[] = items
        .map(([key, value]) => (value ? JSON.parse(value) : null))
        .filter(Boolean);
      entries.sort((a, b) => (a.date < b.date ? 1 : -1));
      setMoodEntries(entries);
    } catch (e) {
      console.error("Lỗi khi tải tâm trạng:", e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: scheme === "dark" ? "#000" : "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
          color: scheme === "dark" ? "#fff" : "#000",
        }}
      >
        Hôm nay bạn cảm thấy thế nào?
      </Text>
      {MOODS.map((mood) => (
        <Button key={mood} title={mood} onPress={() => saveMood(mood)} />
      ))}
      {selectedMood && (
        <Text
          style={{ marginTop: 20, color: scheme === "dark" ? "#fff" : "#000" }}
        >
          Bạn đã chọn: {selectedMood}
        </Text>
      )}
      <Text
        style={{
          fontWeight: "bold",
          marginTop: 20,
          color: scheme === "dark" ? "#fff" : "#000",
        }}
      >
        Lịch sử tâm trạng:
      </Text>
      <FlatList
        data={moodEntries}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Text style={{ color: scheme === "dark" ? "#fff" : "#000" }}>
            {item.date}: {item.mood}
          </Text>
        )}
      />
    </View>
  );
}
