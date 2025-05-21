import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import axios from "axios";
import { toast } from "react-toastify";
import { SparklesIcon } from "@heroicons/react/24/outline";

function OrderList() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const getOrderLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/user/order/orderlist",
          {}
        );
        if (response.data.orderList) {
          setAllOrders(response.data.orderList);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    getOrderLists();
    return () => controller.abort();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col my-[10%] items-center space-y-4">
          <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
          <p className="text-2xl font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <>
        {allOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                No Orders Yet
              </h3>
              <p className="text-gray-600">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
            </div>
          </div>
        ) : (<div className="rounded-lg p-6 bg-white shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Showing All orders</h2>
          </div>

          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
            {allOrders.map((order) => (
              <OrderCard order={order} key={order.orderId} />
            ))}
          </div>
        </div>)}
        </>
      )}
    </>
  );
}

export default OrderList;
