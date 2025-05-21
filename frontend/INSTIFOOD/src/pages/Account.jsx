import React from "react";
import Sidebar from "../components/account/Sidebar";
import OrderList from "../components/account/order/OrderList";
import Header from "../components/account/Header";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/authContext";
import { Outlet } from 'react-router-dom';

const Account = () => {
  const { loading } = useAuth();
  
  return (
    <>
      {loading ? (
        <div className="flex flex-col my-[10%] items-center space-y-4">
          <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
          <p className="text-2xl font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="mx-auto max-w-[1200px] bg-gray-50 ">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 my-8 overflow-y-hidden scrollbar-hide">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
