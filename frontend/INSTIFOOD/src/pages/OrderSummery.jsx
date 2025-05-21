import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  MapPin,
  CreditCard,
  Truck,
  Clock,
  IndianRupee,
} from "lucide-react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/orderContext";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OrderSummery() {
  const { cart, clearCart} = useCart();
  const { order, clearOrder } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [loading, setLoading] = useState(false);


  // Calculate total price
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 0; // Free delivery
  const platformFee = 0; // Example platform fee
  const totalPrice = subtotal + platformFee + deliveryFee;

  // Payment methods
  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <IndianRupee size={24} className="text-green-600" />,
      description: "Pay directly to delivery person",
    },
    {
      id: "online",
      name: "Online Payment",
      icon: <CreditCard size={24} className="text-blue-600" />,
      description: "Pay via credit/debit card, UPI, net banking",
    },
  ];

  const deliveryTypes = [
    {
      id: "room-delivery",
      name: "Room Delivery",
    },
    {
      id: "pick-up-from-shop",
      name: "Pickup from Shop",
    },
  ]


  useEffect(() => {
    if(paymentMethod === "Cash on Delivery") {
      order.paymentMethod = paymentMethod;
      order.userId = user._id;
      order.ownerId = cart[0].shopId;
      order.deliveryType = deliveryType;
    };

  },[paymentMethod, deliveryType])

  const handelOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/user/order", order);
      console.log(response.data);
      if(response.data) {
        navigate("/cart/order-placed", { state: { orderDetails: response.data.order } });
        clearCart();
        clearOrder();
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong, Please try again later");
    } finally { 
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col my-[10%] items-center space-y-4">
          <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
          <p className="text-2xl font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Order Confirmation Header */}
        <div className="bg-green-500 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CheckCircle2 size={40} />
            <div>
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <p className="text-sm">
                Review your order before final confirmation
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold mb-4">Ordered Items</h3>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-3 pb-3 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-semibold">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="p-6 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>

          {/* Delivery Address */}
          <div className="p-6 border-b">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin size={24} className="text-green-600" />
            <h3 className="text-xl font-semibold">Delivery Address</h3>
          </div>
          {order.orderAddress && (
            <div>
              <p className="font-medium">Phone Number : {order.orderAddress.phone}</p>
              <p>
               Hostel Number : {order.orderAddress.hostelNo}
              </p>
              <p>Room Number : {order.orderAddress.roomNo}</p>
              <p>
              {order.orderAddress.city} - {order.orderAddress.state} - {order.orderAddress.pin}
              </p>
            </div>
          )}
        </div>

        {/* Delivery Type Selection */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3 mb-4">
            <Truck size={24} className="text-blue-600" />
            <h3 className="text-xl font-semibold">Delivery Type</h3>
          </div>
          <div className="flex flex-row space-x-8">
            {deliveryTypes.map((delivery) => (
              <div key={delivery.id} className="flex items-center space-x-3">
                <input 
                  type="radio" 
                  name="deliveryType"
                  value={delivery.id}
                  id={delivery.id}
                  checked={deliveryType === delivery.name}
                  onChange={() => setDeliveryType(delivery.name)}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <label 
                  htmlFor={delivery.id} 
                  className="text-gray-700 font-medium cursor-pointer"
                >
                  {delivery.name}
                </label>
              </div>
            ))}
          </div>
          </div>

          {/* Payment Method Selection */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard size={24} className="text-purple-600" />
            <h3 className="text-xl font-semibold">Select Payment Method</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.name)}
                className={`
                                    border rounded-lg p-4 cursor-pointer transition-all
                                    ${
                                      paymentMethod === method.name
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }
                                `}
              >
                <div className="flex items-center space-x-3 mb-2">
                  {method.icon}
                  <h4 className="font-semibold">{method.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{method.description}</p>
                {paymentMethod === method.id && (
                  <CheckCircle2
                    size={20}
                    className="text-green-500 absolute top-2 right-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Confirm Order Button */}
        <div className="p-6">
          <button
          onClick={handelOrder}
            disabled={!paymentMethod && !deliveryType}  
            className={`
                            w-full py-3 rounded-lg transition-colors text-lg font-semibold cursor-pointer
                            ${
                              paymentMethod && deliveryType
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }
                        `}
          >
            {paymentMethod ? "Confirm Order" : "Select Payment Method"}
          </button>
        </div>
      </div>
    </div>
      )}
    </>
  );
}

export default OrderSummery;
