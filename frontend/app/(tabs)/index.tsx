import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import CategoryPicker from "../categories/categoryPicker";
import { IP_ADDRESS } from "../../constants/endpoint";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // Search/filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Today");
  const [completedFilter, setCompletedFilter] = useState("All");

  // Fetch tasks
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

  // Open modal for add/edit
  const openTaskModal = (task = null) => {
    if (task) {
      setEditMode(true);
      setEditingTask(task);
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setCategory(task.category_id ? { category_id: task.category_id, name: task.category_name, color: task.category_color } : null);
      setDueDate(task.due_date ? new Date(task.due_date) : new Date());
      setDueTime(task.due_time ? new Date(`1970-01-01T${task.due_time}`) : new Date());
    } else {
      setEditMode(false);
      setEditingTask(null);
      setTitle("");
      setDescription("");
      setPriority(1);
      setCategory(null);
      setDueDate(new Date());
      setDueTime(new Date());
    }
    setModalVisible(true);
  };

  // Add or update task
  const handleAddOrUpdateTask = async () => {
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
    try {
      if (editMode && editingTask) {
        await axios.put(`${IP_ADDRESS}/tasks/${editingTask.task_id}`, payload);
      } else {
        await axios.post(`${IP_ADDRESS}/tasks`, payload);
      }
      setModalVisible(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${IP_ADDRESS}/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtering and searching
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesCompleted = completedFilter === "All" || (completedFilter === "Completed" ? task.completed : !task.completed);
    const matchesFilter = filter === "Today" ? true : true;
    return matchesSearch && matchesCompleted && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Index</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for your task..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilter(filter === "Today" ? "All" : "Today")}>
          <Text style={styles.filterText}>{filter}</Text>
          <Ionicons name="chevron-down" size={16} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setCompletedFilter(completedFilter === "All" ? "Completed" : "All")}>
          <Text style={styles.filterText}>{completedFilter}</Text>
          <Ionicons name="chevron-down" size={16} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.task_id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.taskCardRow}>
              <TouchableOpacity>
                <Ionicons name={item.completed ? "checkmark-circle" : "ellipse-outline"} size={22} color={item.completed ? "#8875FF" : "#aaa"} />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDesc}>{item.description}</Text>
                <Text style={styles.taskMeta}>
                  {item.due_date} {item.due_time}
                </Text>
              </View>
              {item.category_name && (
                <View style={[styles.labelTag, { backgroundColor: item.category_color || "#333" }]}>
                  <Text style={styles.labelText}>{item.category_name}</Text>
                </View>
              )}
              <View style={styles.priorityTag}>
                <Ionicons name="flag" size={16} color="#8875FF" />
                <Text style={styles.priorityText}>{item.priority}</Text>
              </View>
              <TouchableOpacity onPress={() => openTaskModal(item)}>
                <Ionicons name="create-outline" size={20} color="#aaa" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(item.task_id)}>
                <Ionicons name="trash-outline" size={20} color="#F76A6A" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="checkbox-outline" size={80} color="#8875FF" />
            <Text style={styles.emptyText}>What do you want to do today?</Text>
            <Text style={styles.emptySubText}>Tap + to add your tasks</Text>
          </View>
        }
      />

      {/* Add Task Button (only show when modal is not open) */}
      {!modalVisible && (
        <TouchableOpacity style={styles.addBtn} onPress={() => openTaskModal()}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Add/Edit Task Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{editMode ? "Edit Task" : "Add Task"}</Text>
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
            {/* Category Picker Modal */}
            <Modal visible={showCategoryPicker} animationType="fade" transparent>
              <Pressable style={styles.modalOverlay} onPress={() => setShowCategoryPicker(false)}>
                <View style={{ width: "90%" }}>
                  <CategoryPicker
                    onSelect={cat => {
                      setCategory(cat);
                      setShowCategoryPicker(false);
                    }}
                    selectedCategory={category}
                  />
                  <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                    <Text style={{ color: "#fff", marginTop: 12, alignSelf: "center" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
            {/* Priority Picker */}
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
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddOrUpdateTask}>
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232323",
    borderRadius: 10,
    marginHorizontal: 18,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 18,
    marginBottom: 10,
    gap: 12,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232323",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterText: { color: "#fff", fontSize: 15, marginRight: 4 },
  taskCard: {
    backgroundColor: "#232323",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 18,
    marginVertical: 8,
  },
  taskCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  taskTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  taskDesc: { color: "#aaa", fontSize: 15, marginTop: 4 },
  taskMeta: { color: "#8875FF", fontSize: 13, marginTop: 6 },
  labelTag: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  labelText: { color: "#181818", fontSize: 13, fontWeight: "bold" },
  priorityTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181818",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#8875FF",
  },
  priorityText: { color: "#8875FF", fontWeight: "bold", marginLeft: 2 },
  addBtn: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    backgroundColor: "#8875FF",
    borderRadius: 32,
    padding: 18,
    elevation: 4,
  },
  emptyBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#fff", fontSize: 20, marginTop: 20 },
  emptySubText: { color: "#aaa", fontSize: 16, marginTop: 8 },
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