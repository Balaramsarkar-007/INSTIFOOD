import React,{useState, useEffect} from 'react';
import { useAuth } from '../../../context/authContext';
import AddressSummaryCard from '../address/AddressSummaryCard';
import AddAddressUI from '../address/AddAddressUI';
import { useOrder } from '../../../context/orderContext';
import { toast } from 'react-toastify';

function OrderAddress() {
    const {user} = useAuth();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const {setOrderAddress} = useOrder();

    const handelAddressSelection = (address) => {
        setSelectedAddress(address);
        setOrderAddress(address);
    }

    // if(!selectedAddress) {
    //     if(user?.addresses?.length > 0) {
    //         setSelectedAddress(user.addresses[0]);
    //         setOrderAddress(user.addresses[0]);
    //     } else {
    //         toast.error('Please add an address to continue');
    //     }
    // }

    useEffect(() => {
      if (!selectedAddress && user?.addresses?.length > 0) {
          const firstAddress = user.addresses[0];
          setSelectedAddress(firstAddress);
          setOrderAddress(firstAddress);
      } else if (!selectedAddress && (!user?.addresses || user.addresses.length === 0)) {
          toast.error('Please add an address to continue');
      }
  }, [user, selectedAddress, setOrderAddress]);

  return (
    <>
         <div className=" p-4">
         <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>
        {user?.addresses?.length > 0 && (
            <div className="space-y-4">
           {user.addresses.map((address) => (
                <div key={address._id} className="relative">
                <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="delivery-address"
                  checked={selectedAddress?._id === address._id}
                  onChange={() => handelAddressSelection(address)}
                  className="mr-3 absolute left-2 top-1/2 transform -translate-y-1/2"
                />
                     <div className="w-full pl-8">
                        <AddressSummaryCard
                            userAddress={address} 
                            isSelected={selectedAddress?._id === address._id}
                            key={address._id}
                        />
                    </div>
                </label>
            </div>
            ))}
        </div>
        )}
        </div>
        <div className='p-4 ml-8'>   
        <AddAddressUI/>
        {selectedAddress && (
        <p className="text-sm text-green-600 mt-4">
          Selected address will be used for delivery
        </p>
      )}
        </div>
    </>
  )
}

export default OrderAddress
