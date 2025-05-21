import { useState } from 'react';
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AddressSummaryCard from './AddressSummaryCard';
import AddressDetailsModal from '../../../Modal/AddressDetailsModal';

function AddressCard({ userAddress }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <div className="p-4">
        <AddressSummaryCard onClick={() => setIsModalOpen(true)} userAddress={userAddress} />
        {isModalOpen && (
          <AddressDetailsModal onClose={() => setIsModalOpen(false)} userAddress={userAddress} />
        )}
      </div>

  )
}

export default AddressCard
