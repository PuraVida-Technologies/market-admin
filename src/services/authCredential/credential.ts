/* eslint-disable prettier/prettier */
import { baseUrl } from "../../util/apiUrls";
import axiosClient from "../axios";

export const userHeaders = axiosClient.defaults.headers;

export const userBaseUrl = baseUrl;
