/* eslint-disable prettier/prettier */
import { userUrl } from "../../util/apiUrls";
import axiosClient from "../axios";

export const userHeaders = axiosClient.defaults.headers;

export const userBaseUrl = userUrl;
