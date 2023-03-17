/* eslint-disable prettier/prettier */
import axios from "axios";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const baseURL = publicRuntimeConfig.NEXT_PUBLIC_BASE_URL;
const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let user;

    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("auth");
      user = userData && JSON.parse(userData);
    }

    let AuthStr;

    if (user.auth) {
      AuthStr = "Bearer " + user.auth.token;
      if (config.headers) config.headers["Authorization"] = AuthStr ?? "";
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res?.status == 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
