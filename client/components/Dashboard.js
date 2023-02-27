import React from "react";
import NavbarDashboard from "./dashboard/NavbarDashboard";
import Sidebar from "./dashboard/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div>
      <NavbarDashboard />
      <div className="flex justify-between items-center">
        <Sidebar />
        <main className="absolute left-[14%] top-[10%] roboto w-[85%]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
