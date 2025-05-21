import React, { useState } from "react";
import AddAddressUI from "./AddAddressUI";
import { useAuth } from "../../../context/authContext";
import AddressCard from "./AddressCard";
import { use } from "react";

function AddressList({ onSelectAddress, isCartPage}) {
  const { user } = useAuth();
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address._id);
    onSelectAddress?.(address)
  }

  return (
    <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Your Addresses</h1>
        {user?.addresses?.length > 0 && (
         <div className="space-y-4">
         {user.addresses.map((address) => (
          <AddressCard
            key={address._id}
            userAddress={address}
            isSelected={selectedAddressId === address._id}
            onSelected={() => handleAddressSelect(address)}
            selectable={isCartPage}
          />
         ))}
         </div>
        )}
        <AddAddressUI/>
  </div>
  );
}

export default AddressList;
