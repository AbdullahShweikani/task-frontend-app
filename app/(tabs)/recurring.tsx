import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { fetchRecurringTasks } from "../utils/request";
import { Task } from "./assigned";

export default function RecurringTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRecurringTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load recurring tasks");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔁 Upcoming Recurring Tasks</Text>
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No upcoming recurring tasks found.</Text>
      ) : (
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
                {item.description ? (
                  <Text style={styles.description}>{item.description}</Text>
                ) : null}

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

                <View style={styles.infoRow}>
                  <Text style={styles.label}>📌 Status:</Text>
                  <Text style={[styles.status, { color: borderColor }]}>
                    {item.status}
                  </Text>

                  {item.recurrencePattern ? (
                    <>
                      <Text style={styles.label}>🔁 Recurs:</Text>
                      <Text style={[styles.recurrence, { color: borderColor }]}>
                        {item.recurrencePattern}
                      </Text>
                    </>
                  ) : null}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  emptyText: {
    marginTop: 40,
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
    gap: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    textAlign: "center",
  },
  dateValue: {
    fontSize: 14,
    color: "#374151",
    marginRight: 16,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    textAlign: "center",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  recurrence: {
    fontSize: 14,
    textAlign: "center",
  },
});
