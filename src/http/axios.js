import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost:9090/api",
});

// intercept every requests
instanceAxios.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// intercept every response
instanceAxios.interceptors.response.use(
  async function (config) {
    return config.data;
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      localStorage.clear();
      window.location.reload("/");
    }

    const formattedError = {
      code: error.code,
      message: error.message,
      errors: error.response.data.error,
    };
    return Promise.reject(formattedError);
  }
);

export default instanceAxios;
