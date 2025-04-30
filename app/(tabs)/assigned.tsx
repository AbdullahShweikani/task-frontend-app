import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchTasks, updateTaskStatus } from "../utils/request";

export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: string;
  recurrencePattern:any
}

const AssignedTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const taskList = await fetchTasks();
      setTasks(taskList);
    } catch {
      Alert.alert("Error", "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch {
      Alert.alert("Error", "Could not update task.");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Assigned Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => {
          let borderColor;
          switch (item.status) {
            case "To Do":
              borderColor = "#facc15";
              break;
            case "In Progress":
              borderColor = "#3b82f6";
              break;
            case "Done":
              borderColor = "#10b981";
              break;
            default:
              borderColor = "#e5e7eb";
          }

          return (
            <View style={[styles.card, { borderColor }]}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>{" "}
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>Start:</Text>
                <Text style={styles.dateValue}>
                  {new Date(item.startDate).toLocaleDateString()}
                </Text>
                <Text style={styles.dateLabel}>Due:</Text>
                <Text style={styles.dateValue}>
                  {new Date(item.dueDate).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.label}>Status:</Text>
              <Picker
                selectedValue={item.status}
                onValueChange={(value) => changeStatus(item.id, value)}
                style={styles.picker}
              >
                <Picker.Item label="To Do" value="To Do" />
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="Done" value="Done" />
              </Picker>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 6,
    marginTop: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
    flexWrap: "wrap",
    gap: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  dateValue: {
    fontSize: 14,
    color: "#374151",
    marginRight: 16,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
    marginTop: 6,
  },
  picker: {
    height: 42,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
});

export default AssignedTasks;
