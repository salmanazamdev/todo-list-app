import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CategoryPicker from "../categories/categoryPicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function UpdateTask({ visible, onClose, onSave, initialTask }) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [priority, setPriority] = useState(initialTask?.priority || 1);
  const [category, setCategory] = useState(initialTask?.category || null);
  const [dueDate, setDueDate] = useState(initialTask?.due_date ? new Date(initialTask.due_date) : new Date());
  const [dueTime, setDueTime] = useState(initialTask?.due_time ? new Date(`1970-01-01T${initialTask.due_time}`) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setPriority(initialTask.priority || 1);
      setCategory(initialTask.category || null);
      setDueDate(initialTask.due_date ? new Date(initialTask.due_date) : new Date());
      setDueTime(initialTask.due_time ? new Date(`1970-01-01T${initialTask.due_time}`) : new Date());
    }
  }, [initialTask]);

  const handleSave = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId || !title) return;
    const payload = {
      userId,
      title,
      description,
      dueDate: dueDate.toISOString().split("T")[0],
      dueTime: dueTime.toTimeString().split(" ")[0],
      priority,
      category_id: category?.category_id,
      completed: false,
    };
    await onSave(payload);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{initialTask ? "Edit Task" : "Add Task"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#aaa"
          />
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Ionicons name="calendar-outline" size={24} color="#8875FF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Ionicons name="alarm-outline" size={24} color="#8875FF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPriorityPicker(true)}>
              <Ionicons name="flag" size={24} color="#8875FF" />
              <Text style={{ color: "#fff", marginLeft: 4 }}>{priority}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCategoryPicker(true)}>
              <View style={[styles.catBox, { backgroundColor: category?.color || "#333" }]}>
                <Text style={{ color: "#181818", fontWeight: "bold" }}>{category?.name || "Category"}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setShowDatePicker(false);
                if (date) setDueDate(date);
              }}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={dueTime}
              mode="time"
              display="default"
              onChange={(e, time) => {
                setShowTimePicker(false);
                if (time) setDueTime(time);
              }}
            />
          )}
          <CategoryPicker
            visible={showCategoryPicker}
            onSelect={cat => {
              setCategory(cat);
              setShowCategoryPicker(false);
            }}
            onClose={() => setShowCategoryPicker(false)}
          />
          <Modal visible={showPriorityPicker} transparent animationType="fade">
            <View style={styles.priorityOverlay}>
              <View style={styles.priorityBox}>
                <Text style={styles.modalTitle}>Task Priority</Text>
                <View style={styles.priorityGrid}>
                  {[...Array(10)].map((_, i) => (
                    <Pressable
                      key={i + 1}
                      style={[
                        styles.priorityCell,
                        priority === i + 1 && styles.priorityCellActive,
                      ]}
                      onPress={() => setPriority(i + 1)}
                    >
                      <Ionicons name="flag" size={20} color={priority === i + 1 ? "#fff" : "#8875FF"} />
                      <Text style={{ color: priority === i + 1 ? "#fff" : "#8875FF", fontWeight: "bold" }}>{i + 1}</Text>
                    </Pressable>
                  ))}
                </View>
                <View style={styles.modalActions}>
                  <TouchableOpacity onPress={() => setShowPriorityPicker(false)}>
                    <Text style={styles.cancelBtn}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveBtn} onPress={() => setShowPriorityPicker(false)}>
                    <Text style={styles.saveBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    elevation: 8,
  },
  modalTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 8, gap: 12 },
  catBox: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
    backgroundColor: "#333",
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 18, gap: 18 },
  cancelBtn: { color: "#aaa", fontSize: 16 },
  saveBtn: { backgroundColor: "#8875FF", borderRadius: 8, padding: 10 },
  saveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  priorityOverlay: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "center",
    alignItems: "center",
  },
  priorityBox: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    elevation: 8,
  },
  priorityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginVertical: 12,
  },
  priorityCell: {
    width: 48,
    height: 48,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    flexDirection: "column",
    gap: 2,
  },
  priorityCellActive: {
    backgroundColor: "#8875FF",
  },
});