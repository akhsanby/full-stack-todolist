import LayoutAuth from "@/components/LayoutAuth";
import { withRouter } from "next/router";
import type { Router } from "next/router";

type Props = {
  router: Router;
};

function Login({ router }: Props) {
  return (
    <LayoutAuth>
      <div className="card w-96 shadow-xl bg-gray-700">
        <div className="card-body">
          <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs text-white" />
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => router.replace("/home")}>
              Enter To App
            </button>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}

export default withRouter(Login);
