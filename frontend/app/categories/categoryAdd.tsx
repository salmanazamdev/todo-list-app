import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = ["#D9E76C", "#6CE7C2", "#6CB8E7", "#6C7AE7", "#B96CE7", "#E76CB9", "#E76C6C", "#E7B96C", "#6CE77A", "#6CE7E7"];

export default function CategoryAdd({ navigation }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const handleCreate = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId || !name) return;
    try {
      await axios.post("http://localhost:3000/categories", {
        userId,
        name,
        color,
      });
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new category</Text>
      <TextInput
        style={styles.input}
        placeholder="Category name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />
      <Text style={styles.label}>Category color :</Text>
      <View style={styles.colorRow}>
        {COLORS.map(c => (
          <TouchableOpacity key={c} onPress={() => setColor(c)} style={[styles.colorCircle, { backgroundColor: c }, color === c && styles.colorCircleActive]}>
            {color === c && <Text style={{ color: "#181818", fontWeight: "bold" }}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelBtn}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
          <Text style={styles.createBtnText}>Create Category</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181818", padding: 24 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 18 },
  input: {
    backgroundColor: "#232323",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  label: { color: "#aaa", fontSize: 15, marginBottom: 8 },
  colorRow: { flexDirection: "row", marginVertical: 12, flexWrap: "wrap" },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  colorCircleActive: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 30, gap: 18 },
  cancelBtn: { color: "#aaa", fontSize: 16 },
  createBtn: { backgroundColor: "#8875FF", borderRadius: 8, padding: 10 },
  createBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});