import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import NavBar from "./NavBar";

export default function RootLayout() {
  return (
    <div className="flex flex-col h-full" data-testid="root-layout">
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
