import ShopCard from './ShopCard';
import React, {useEffect} from 'react';
import axios from 'axios';

function ShopList({shops}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop) => (
        <ShopCard key={shop._id} shop={shop} />
      ))}
    </div>
  );
}

export default ShopList;