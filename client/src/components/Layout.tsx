import axiosClient from "@/utils/api";
import { ReactNode } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
  jwtToken: string | undefined;
  decodeToken: {
    user_id: string;
    username: string;
  };
};

export default function Layout({ children, jwtToken, decodeToken }: Props) {
  const router = useRouter();
  function handleLogout() {
    axiosClient
      .put(
        "/api/user/logout",
        {
          username: decodeToken.username,
          user_id: decodeToken.user_id,
        },
        {
          headers: { Authorization: jwtToken },
        }
      )
      .then((result) => {
        if (result.data.status === "Logout") {
          destroyCookie(null, "token");
          router.replace("/");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  return (
    <div className="w-screen h-full px-3 py-3">
      <button className="btn btn-error btn-sm float-end" onClick={handleLogout}>
        Logout
      </button>
      {children}
    </div>
  );
}
