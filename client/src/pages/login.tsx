import LayoutAuth from "@/components/LayoutAuth";
import { withRouter } from "next/router";
import type { Router } from "next/router";
import { useState } from "react";
import { setCookie } from "nookies";
import axiosClient from "@/utils/api";

type Props = {
  router: Router;
};

function Login({ router }: Props) {
  const [username, setUsername] = useState<string>("");

  function handleLogin() {
    axiosClient
      .post("/api/user/register", {
        username,
      })
      .then((result) => {
        const { status, data } = result.data;
        if (status === "OK") {
          setCookie(null, "token", data.token);
          router.push("/home");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  return (
    <LayoutAuth>
      <div className="card shadow-xl bg-gray-700">
        <div className="card-body p-[1rem]">
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="input input-bordered w-full text-white" />
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={() => handleLogin()}>
              Enter To App
            </button>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}

export default withRouter(Login);
