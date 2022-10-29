/* eslint-disable prettier/prettier */
import axios from "axios";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const baseURL = publicRuntimeConfig.BASE_URL;

// an instance
const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let user;

    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("auth");
      user = userData && JSON.parse(userData);
    }

    console.log({ user });


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
      console.log(
        axiosClient.defaults.headers.common["Authorization"],
        "was sent"
      );
    }
    console.error("Looks like there was a problem. Status Code:" + res.status);
    return Promise.reject(error);
  }
);

export default axiosClient;
