import React, { useState } from 'react';
import { MapPinIcon, XMarkIcon,SparklesIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import {toast} from 'react-toastify'

const AddressDetailsModal = ({ onClose, userAddress }) => {
  const {user, setUser} = useAuth();
  const [loading, setLoading] = useState(false);
  const handelDeteleAddress = async () => {
      try{
        setLoading(true);
        const response = await axios.delete('http://localhost:8000/user/account/delete-address', {
          withCredentials: true,
          data: {
            userId: user._id,
            addressId: userAddress._id
          }
        });
        console.log(response.data);
        if(response.status) {
          setUser(response.data.user);
          toast.success('Address Deleted Successfully 😊');
        }
      } catch(er) {
        console.log(er); 
        toast.error(er.message || 'Something went wrong 😔');
      } finally {
        setLoading(false);
      }
  }
    return (
      <>
        {loading ? (
          <div className="flex flex-col my-[10%] items-center space-y-4">
          <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
          <p className="text-2xl font-semibold text-gray-700">Loading...</p>
        </div>
        ) : (
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
  
          {/* Modal Content */}
          <div className="p-8 space-y-6">
            <div className="flex items-center space-x-4">
              <MapPinIcon className="w-12 h-12 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800">Delivery Address Details</h2>
            </div> 
              <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Name:</span>
                  <span className="text-gray-800">{userAddress.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Phone Number:</span>
                  <span className="text-gray-800">+91{userAddress.phone}</span>
                </div>
                {userAddress.email && (
                  <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-800">{userAddress.email}</span>
                </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Address:</span>
                  <span className="text-gray-800">{userAddress.address}</span>
                </div>

                {userAddress.hostelNo && (
                  <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Hostel Number:</span>
                  <span className="text-gray-800">{userAddress.hostelNo}</span>
                </div>
                )}
                
                {userAddress.roomNo && (
                  <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Room Number:</span>
                  <span className="text-gray-800">{userAddress.roomNo}</span>
                </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">PIN:</span>
                  <span className="text-gray-800">{userAddress.pin}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">City:</span>
                  <span className="text-gray-800">{userAddress.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">State:</span>
                  <span className="text-gray-800">{userAddress.state}</span>
                </div>
          </div>
  
          <div className="px-8 py-4 bg-gray-50 border-t">
            <div className="flex justify-end space-x-4">
              <button onClick={()=>handelDeteleAddress()} className="px-4 py-2 text-red-600 hover:bg-blue-50 rounded-md cursor-pointer">
                Delete Address
              </button>
            </div>
          </div>
        </div>
      </div>
        )}
      </>
    );
  };
  

export default AddressDetailsModal
