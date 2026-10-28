import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-[#091336] via-[#0e1e5b] to-[#1e1145] text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - responsive styling */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 sidebar-scroll bg-gradient-to-t from-black/20 to-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
