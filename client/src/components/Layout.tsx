import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-full px-3 py-3">
      <button className="btn btn-error btn-sm float-end">Logout</button>
      {children}
    </div>
  );
}
