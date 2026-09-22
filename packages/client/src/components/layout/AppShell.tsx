import type { ReactNode } from "react";

import AdminShell from "./AdminShell";
import Footer from "./Footer";
import Navbar from "../navigation/Navbar";

import { useAuth } from "../../hooks/useAuth";

interface AppShellProps {
  children: ReactNode;
}

function AppShell({ children }: AppShellProps) {
  const { user, isLoading } = useAuth();

  if (!isLoading && user?.role === "admin") {
    return <AdminShell>{children}</AdminShell>;
  }

  return (
    <div className="app-shell relative overflow-x-clip">
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

export default AppShell;