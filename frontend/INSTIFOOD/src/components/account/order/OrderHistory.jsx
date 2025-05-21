import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { SparklesIcon } from "@heroicons/react/24/outline";

function OrderHistory() {
  const { orderId } = useParams();
  const [orderedData, setorderdData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function orderPlace() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/order/${orderId}`
        );
        console.log(response.data);
        if (response.data.orderedData) {
          setorderdData(response.data.orderedData);
        }
      } catch (error) {
        console.log("error", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    orderPlace();
  }, [orderId]); // Added orderId as dependency

  // Only calculate these if orderedData exists
  const totalItems = orderedData?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const orderDate = orderedData?.timeStamp ? new Date(orderedData.timeStamp).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : '';

  if (loading) {
    return (
      <div className="flex flex-col my-[10%] items-center space-y-4">
        <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
        <p className="text-2xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!orderedData) {
    return <div className="text-center py-8">No order data found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50">
      {/* Restaurant Info */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src="/api/placeholder/40/40"
          alt="Restaurant"
          className="rounded-md"
        />
        <div>
          <h2 className="font-semibold">{orderedData.shopName}</h2>
          <p className="text-sm text-gray-500">
            {orderDate} | {totalItems} Items | ₹{orderedData.amount}
          </p>
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="mb-8">
        {orderedData.orderStatus?.map((status, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{status.statusType}</h3>
              <p className="text-sm text-gray-500">
                {new Date(status.updatedAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs  rounded ${
                status.status === "PENDING"
                  ? "text-red-600 bg-red-100"
                  : "text-green-600 bg-green-100"
              }`}
            >
              {status.status}
            </span>
          </div>
        ))}
      </div>

      {/* Order Items */}
      <div className="mb-6 bg-white rounded-lg shadow-sm">
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="font-semibold mb-4 text-lg">{totalItems} ITEMS</h3>
          {orderedData.items?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-md"
            >
              <img
                src={item.image_url || "/api/placeholder/48/48"}
                alt={item.name}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  {item.quantity} × ₹{item.price}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{item.quantity * item.price}</p>
              </div>
            </div>
          ))}

          {/* Bill Details */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Item MRP</span>
              <span>₹{orderedData.amount}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between font-semibold mt-4">
              <span>Grand total</span>
              <span>₹{orderedData.amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold mb-4">YOUR DETAILS</h3>
          <div className="space-y-3">
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">Name:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.orderAddress?.name}
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">Mobile No:</span>
              <span className="font-medium text-lg text-gray-800">
                +91{orderedData.orderAddress?.phone}
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">Address:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.orderAddress?.address}
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">City:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.orderAddress?.city}
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">State:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.orderAddress?.state}
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">Pin:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.orderAddress?.pin}
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">Payment Mode:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.paymentMethod}
              </span>
            </div>
            {orderedData.transationId && (
              <div className="flex mt-4">
                <span className="text-gray-600 text-lg w-50">Transaction ID:</span>
                <span className="font-medium text-lg text-gray-800">
                  {orderedData.transationId}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mb-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold mb-4">ADDITIONAL INFO</h3>
          <div className="space-y-3">
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">Hostel No:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.orderAddress?.hostelNo}
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">Room Number:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.orderAddress?.roomNo}
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-600 text-lg w-50">Delivery Or Takeaway?:</span>
              <span className="font-medium text-lg text-gray-800">
                {orderedData.deliveryType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
