import axiosClient from "@/utils/api";

type TokenTypes = string | undefined;

const isAuthorized = async (token: TokenTypes) => {
  if (!token) {
    return false;
  }

  axiosClient
    .get("/api/user", {
      headers: { Authorization: token },
    })
    .then((result) => {
      if (result.data.status === "Authorized") {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default isAuthorized;
