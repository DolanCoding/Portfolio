import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  //https://portfolio-9qv4.onrender.com
  //http://localhost:3001
  timeout: 500000,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchSomething = async (method, url, setLoading, setError) => {
  try {
    const response = await apiClient[method](url); // Use the Axios instance
    // Axios automatically parses JSON
    return response;
  } catch (error) {
    console.error("Fetching projects failed:", error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

export { fetchSomething, apiClient };
