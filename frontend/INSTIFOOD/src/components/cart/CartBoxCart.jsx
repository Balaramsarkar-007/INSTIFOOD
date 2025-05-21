import React from "react";
import { useCart } from "../../context/CartContext";
import { Clock, CreditCard, Truck } from 'lucide-react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

function CartBoxCart() {
    const {cart} = useCart();
    const navigate = useNavigate();
    const {user} = useAuth();
    const location = useLocation();

    const ItemTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    let dukanPric = 0;
    const subtotal = ItemTotal+dukanPric;
    const isCartPage = location.pathname === '/cart';
    const isAddressPage = location.pathname === '/cart/address';

    const getBtnText = () => {
      if (isCartPage) return "Continue to Address";
      if (isAddressPage) return "Continue to Order Summary";
      return "Continue to Payment";
    }

    const handleCheckoutBtn = () => {
      if(isCartPage) {
        return navigate('/cart/address');
      }
     
      if(isAddressPage) {
        if(user?.addresses?.length > 0) {
          return navigate('/cart/order-summary');
        } else {
          toast.error("Please add address to continue");
          return;
        }
      }
    }  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 md:space-y-6">
    {/* Header */}
    <div className="pb-4 border-b">
      <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
    </div>

    {/* Price Breakdown */}
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Item Total</span>
        <span className="font-medium">₹{ItemTotal}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Platform Fee</span>
        <span className="font-medium">₹{dukanPric}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Delivery Fee</span>
        <span className="text-green-600 font-medium">FREE</span>
      </div>
    </div>

    {/* Total Amount */}
    <div className="bg-gray-50 rounded-xl p-4 space-y-1">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-800">Grand Total</p>
          <p className="text-sm text-gray-500">Inclusive of all taxes</p>
        </div>
        <span className="text-xl font-bold text-gray-800">₹{subtotal}</span>
      </div>
    </div>

    {/* Delivery Info */}
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-gray-600">
        <Clock size={20} />
        <span className="text-sm">Estimated delivery: 30-60 minutes</span>
      </div>
      
      <div className="flex items-center gap-3 text-gray-600">
        <Truck size={20} />
        <span className="text-sm">Free delivery on your order</span>
      </div>

      <div className="flex items-center gap-3 text-gray-600">
        <CreditCard size={20} />
        <span className="text-sm">Secure payment options available</span>
      </div>
    </div>

    {/* Continue Button */}
    {/* <Link to={'/cart/address'} > */}
    <button onClick={handleCheckoutBtn} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer" >
      {getBtnText()}
    </button>
    {/* </Link> */}
  </div>
  );
}

export default CartBoxCart;
