import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginValue } from "./utils/validation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { login } from "./utils/request";

export default function LoginScreen() {
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginValue>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValue) => {
    try {
      const { token, user } = await login(data);

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      router.replace("/(tabs)/assigned");
    } catch (error: any) {
      Alert.alert(
        "Login failed",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setValue("email", text)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#9ca3af"
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setValue("password", text)}
          secureTextEntry
          placeholderTextColor="#9ca3af"
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#ef4444",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
  },
});
