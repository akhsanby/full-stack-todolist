import nookies from "nookies";
import axios from "axios";
import { UpdateSyncTodoTypes } from "@/utils/types";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default axiosClient;

export function updateSyncTodoAPI(body: UpdateSyncTodoTypes, user_id: string) {
  const { token: jwtToken } = nookies.get();
  return axiosClient.patch(`/api/todo/sync/${user_id}`, body, {
    headers: {
      Authorization: jwtToken,
    },
  });
}
