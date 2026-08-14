import React, { type ReactNode } from "react";
import Navigation from "~/components/Navigation";

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="mt-10">{children}</main>
    </>
  );
};

export default MainLayout;
