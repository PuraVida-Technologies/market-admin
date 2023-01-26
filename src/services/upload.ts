import axios from "axios";
import { baseUrl } from "@/util/apiUrls";

export const uploadFile = (
  file: File
): Promise<{ filename: string; url: string }> => {
  const userData = sessionStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const href = baseUrl + "/media/single";

  const formData = new FormData();
  formData.append("image", file, file.name);
  return axios
    .post(href, formData, {
      headers: {
        Authorization: "Bearer " + user?.auth?.token,
      },
    })
    .then((data) => data.data.s3Result)
    .catch(() => ({ filename: "", url: "" }));
};
