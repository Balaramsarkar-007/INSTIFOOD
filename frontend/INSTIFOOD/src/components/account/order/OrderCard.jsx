import React from "react";
import {Link} from 'react-router-dom';

function OrderCard({order}) {
 
  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);
  const orderDate = new Date(order.timeStamp).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const orderStatus = order.orderStatus[order.orderStatus.length - 1];
  return (
    <Link to={`/order/${order._id}`} className="block">
    <div className="border rounded-lg p-4 space-y-3 w-full sm:w-[25rem] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] shadow-[0_10px_20px_rgba(0,_0,_0,_0.1)] hover:-translate-y-1 bg-white cursor-pointer">
      <div className="flex items-center space-x-3">
        <img
          src={order.ownerId?.shopImage || "https://via.placeholder.com/150"}
          alt={order.ownerId.shopName || "Shop Name"}
          className="w-12 h-12 rounded-md object-cover shadow-md"
        />
        <span className="text-red-500 font-medium truncate">
          {order.ownerId.shopName}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-900 font-semibold">Order ID : {order.orderId}</p>
          <p className="text-gray-500">{totalItems} items</p>
        </div>
        <p className="text-lg font-medium">₹{order.amount}</p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 ${orderStatus.status === "PENDING" ? "bg-red-500" : "bg-blue-500"} rounded-full animate-pulse`}></div>
          <span className="text-gray-600">{orderStatus.status}</span>
        </div>
        <span className="text-gray-500">{orderDate}</span>
      </div>
    </div>
   </Link>
  );
}

export default OrderCard;
