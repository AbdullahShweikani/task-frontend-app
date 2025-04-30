import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiRequest = axios.create({
  baseURL: "http://localhost:3500",
});

apiRequest.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiRequest;
