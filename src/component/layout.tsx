import React from "react";
import NavBarTwo from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
        <NavBarTwo/>
      <div className="pb-8 pt-20">{children}</div>
    </div>
  );
}
