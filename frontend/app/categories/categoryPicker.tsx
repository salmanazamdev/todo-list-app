import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { IP_ADDRESS } from "@/constants/endpoint";

export default function CategoryPicker({ onSelect, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${IP_ADDRESS}/categories`)
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Category</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.category_id}
            style={[
              styles.catBox,
              { backgroundColor: cat.color || "#232323" },
              selectedCategory?.category_id === cat.category_id && styles.catBoxActive,
            ]}
            onPress={() => onSelect(cat)}
          >
            <Image source={{ uri: cat.image_url }} style={styles.icon} />
            <Text style={styles.catName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#232323", borderRadius: 16, padding: 18 },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 12, alignSelf: "center" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  catBox: {
    width: 90, height: 90, borderRadius: 12, margin: 8,
    justifyContent: "center", alignItems: "center", backgroundColor: "#232323"
  },
  catBoxActive: { borderWidth: 2, borderColor: "#8875FF" },
  icon: { width: 36, height: 36, marginBottom: 8 },
  catName: { color: "#181818", fontWeight: "bold", fontSize: 15 },
});