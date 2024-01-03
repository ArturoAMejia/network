import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="bg-black text-white">
      <Navbar />
      {children}
    </main>
  );
};
