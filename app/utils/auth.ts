import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
};
