import { useState, useEffect } from 'react';
import ShopList from '../components/shop/ShopList';
import axios from 'axios';

function HomePage() {
  const [shops, setShops] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getShops() {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/');
        if(response.data.shops) {
          setShops(response.data.shops);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getShops();
    return () => controller.abort();
  }, []);

  if (loading) return (
    <div className="bg-gray-100 p-8">
    <div className="container mx-auto">

        <div className="h-8 bg-gray-200 rounded-lg w-64 mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-16 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );

  if (error) {
    return (
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <h2 className="text-xl text-red-600">Error: {error}</h2>
        <p className="mt-2">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Restaurants</h1>
      <ShopList shops={shops} key={shops._id}/>
    </div>
  );
}

export default HomePage;