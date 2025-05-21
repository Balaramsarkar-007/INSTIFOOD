import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function Layout({children}) {
  return (
    <>
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard Overview" />
        <main className="flex-1 overflow-y-auto">
          {children || "Layout page"}
        </main>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Layout;
