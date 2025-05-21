import React, { useState, useEffect } from 'react';
import { Check, Package, MapPin, Calendar, ArrowRight, Printer } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderPlaced = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    if(!orderDetails) {
      navigate('/');
    }
    setShowAnimation(true);
  }, [orderDetails, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
            <Check className="w-12 h-12 text-green-500 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">Thank you for ordering with us.</p>
        </div>

        {/* Order Details Card */}
        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-1000 delay-300 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Order ID Banner */}
          <div className="bg-green-500 text-white px-6 py-4 flex justify-between items-center">
            <div>
              <p className="text-sm">Order ID</p>
              <p className="text-xl font-bold">{orderDetails.orderId}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 space-y-6">
                  <div className="flex items-start space-x-4">
                    <Calendar className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                    <div>
                    <h3 className="font-semibold text-gray-900">Order Date</h3>
                    <p className="text-gray-600">
                      {new Date(orderDetails.timeStamp).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                      })}
                    </p>
                    </div>
                  </div>

                  {/* Items */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount</span>
                <span>{orderDetails.amount}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 flex justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
            <button
              onClick={() => navigate('/account/orders')}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;