import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Modal from '../../../Modal/Modal';
import AddressForm from './AddressForm';

function AddAddressUI() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    <div onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-gray-300 rounded-lg p-6 h-40 max-w-md flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500 hover:bg-gray-50">
      {/* Plus icon */}
      <div className="mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-lg font-medium text-gray-700 transition-colors duration-300 group-hover:text-blue-600">
        Add new address
      </h3>
      <p className="text-sm text-gray-500 mt-1 transition-colors duration-300 group-hover:text-blue-500">
        Click to add a new delivery address
      </p>
    </div>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddressForm onSuccess={() => setIsModalOpen(false)} />
    </Modal>
  </>
  )
}

export default AddAddressUI
