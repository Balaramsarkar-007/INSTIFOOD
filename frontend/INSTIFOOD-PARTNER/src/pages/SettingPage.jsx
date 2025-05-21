import React from 'react';
import ShopListingForm from '../components/setting/ShopListingForm';
import ShopCard from '../components/setting/ShopCard';
import {useAuth} from '../contextApi/authContext';

function Setting() {
  const {owner} = useAuth();
  return (
    <div className='my-6'>
    {/* <div className='text-2xl font-semibold text-gray-800 text-center'>Shop Settings</div> */}
      {owner.shopName ? <ShopCard /> : <ShopListingForm />}

    </div>
  )
}

export default Setting
