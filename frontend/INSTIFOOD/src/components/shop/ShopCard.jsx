import { Link } from 'react-router-dom';


function ShopCard({ shop }) {
  return (
    <Link to={`/shop/${shop._id}`}>
      <div className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img 
          src={shop.shopImage} 
          alt={shop.shopName} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mt-2">
            <h2 className="text-xl font-semibold text-[1.7rem]">{shop.shopName}</h2>
            <div className='h-[4.5rem] w-[4.5rem] bg-yellow-400 rounded-xl flex items-center justify-center'>
              <h1 className="text-xl font-semibold font-[1000] text-[2.5rem]">{shop.shopAddress}</h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ShopCard;