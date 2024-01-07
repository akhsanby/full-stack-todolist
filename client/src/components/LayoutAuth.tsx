import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function LayoutAuth({ children }: Props) {
  return <div className="w-screen h-screen flex justify-center items-center">{children}</div>;
}
