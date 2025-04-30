import apiRequest from "./apiRequest";

export async function login({ email, password }: any) {
  try {
    const response = await apiRequest.post("/api/auth/login", {
      email,
      password,
    });
    return response.data.data;
  } catch (error: any) {
    console.log(error.response?.data?.message);
    throw error;
  }
}

export async function fetchTasks() {
  try {
    const response = await apiRequest.post("/api/task/search", {});
    return response.data.data.task;
  } catch (error: any) {
    console.log("Failed to fetch tasks:", error.response?.data?.message);
    throw error;
  }
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  try {
    const response = await apiRequest.put(`/api/task/?id=${taskId}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error: any) {
    console.log("Failed to update task:", error.response?.data?.message);
    throw error;
  }
}

export async function fetchRecurringTasks(upcoming: boolean = true) {
  try {
    const response = await apiRequest.get(`/api/task/recurring?upcoming=${upcoming}`);
    return response.data.data.task;
  } catch (error: any) {
    console.log("Failed to fetch recurring tasks:", error.response?.data?.message);
    throw error;
  }
}
