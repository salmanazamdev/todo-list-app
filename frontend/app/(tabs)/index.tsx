import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP_ADDRESS } from "@/constants/endpoint";


export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(5);
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const fetchTasks = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) return;
    try {
      const res = await axios.get(`${IP_ADDRESS}/tasks/${userId}`);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId || !title) return;
    try {
      await axios.post(`${IP_ADDRESS}/tasks`, {
        userId,
        title,
        description,
        dueDate: dueDate.toISOString().split("T")[0],
        dueTime: dueTime.toTimeString().split(" ")[0],
        priority,
      });
      setModalVisible(false);
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Index</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Empty State or Task List */}
      {tasks.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="checkbox-outline" size={80} color="#8875FF" />
          <Text style={styles.emptyText}>What do you want to do today?</Text>
          <Text style={styles.emptySubText}>Tap + to add your tasks</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.task_id?.toString() || item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDesc}>{item.description}</Text>
              <Text style={styles.taskMeta}>
                {item.due_date} {item.due_time} | Priority: {item.priority}
              </Text>
            </View>
          )}
        />
      )}

      {/* Add Task Button */}
      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Add Task Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Task</Text>
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
              <TextInput
                style={[styles.input, { width: 60 }]}
                placeholder="Priority"
                value={priority.toString()}
                onChangeText={v => setPriority(Number(v))}
                keyboardType="numeric"
                placeholderTextColor="#aaa"
              />
            </View>
            {/* Date Picker */}
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
            {/* Time Picker */}
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
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddTask}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181818" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#181818",
  },
  headerText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  emptyBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#fff", fontSize: 20, marginTop: 20 },
  emptySubText: { color: "#aaa", fontSize: 16, marginTop: 8 },
  addBtn: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    backgroundColor: "#8875FF",
    borderRadius: 32,
    padding: 18,
    elevation: 4,
  },
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
  modalActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 18, gap: 18 },
  cancelBtn: { color: "#aaa", fontSize: 16 },
  saveBtn: { backgroundColor: "#8875FF", borderRadius: 8, padding: 10 },
  saveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  taskItem: {
    backgroundColor: "#232323",
    borderRadius: 12,
    padding: 16,
    margin: 10,
  },
  taskTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  taskDesc: { color: "#aaa", fontSize: 15, marginTop: 4 },
  taskMeta: { color: "#8875FF", fontSize: 13, marginTop: 6 },
});