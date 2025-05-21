import React, { useState } from "react";
import { TrendingUp, Users, DollarSign, Timer } from "lucide-react";
import { useAuth } from "../contextApi/authContext";
import StatCard from "../components/dashoard/StateCard";
import OrderCard from "../components/order/OrderCard";

const DashboardPage = () => {
  const {owner} = useAuth();
  const [activeOrders] = useState([
    {
      id: "1",
      customer: "John Doe",
      items: ["Chicken Burger", "French Fries", "Coke"],
      total: 25.99,
      status: "new",
      time: "10:30 AM",
    },
    {
      id: "2",
      customer: "Sarah Wilson",
      items: ["Margherita Pizza", "Garlic Bread"],
      total: 32.5,
      status: "new",
      time: "10:45 AM",
    },
    {
      id: "3",
      customer: "John Doe",
      items: ["Chicken Burger", "French Fries", "Coke"],
      total: 25.99,
      status: "new",
      time: "10:30 AM",
    },
    {
      id: "4",
      customer: "Sarah Wilson",
      items: ["Margherita Pizza", "Garlic Bread"],
      total: 32.5,
      status: "new",
      time: "10:45 AM",
    },
  ]);

  const stats = [
    { icon: TrendingUp, title: "Today's Orders", value: "24", color: "green" },
    { icon: DollarSign, title: "Revenue", value: "$523.50", color: "blue" },
    { icon: Users, title: "Customers", value: "156", color: "purple" },
    { icon: Timer, title: "Avg. Time", value: "18 min", color: "orange" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col ">
        <div className="flex-1 p-4 lg:p-8 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Active Orders</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
