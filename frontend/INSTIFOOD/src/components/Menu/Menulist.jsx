import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import Cart from "../cart/Cart";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

function MenuList() {
  const { shopId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function getItems() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/shop/${shopId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.items) {
          setMenuItems(response.data.items);
          setSelectedCategory(response.data.items[0].category);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, [shopId]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col my-[10%] items-center space-y-4">
          <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
          <p className="text-2xl font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Categories */}
            <div className="md:w-64 flex-shrink-0 hidden md:block">
              <div className="sticky top-24 bg-white rounded-lg shadow-sm">
                <nav className="flex flex-col">
                  {[...new Set(menuItems.map((item) => item.category))].map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors ${
                          selectedCategory === category
                            ? "border-l-4 border-orange-500 bg-orange-50 text-orange-500"
                            : ""
                        }`}
                      >
                        <span>{category}</span>
                      </button>
                    )
                  )}
                </nav>
              </div>
            </div>

            {/* for mobile compatable */}
            <div className="md:hidden flex justify-between items-center mb-4">
              <button
                className="md:hidden flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span>View MenuList</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              {/* Mobile Menu Drawer */}
                      {isMobileMenuOpen && (
                      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 md:hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
                        {/* Drawer Header */}
                    <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
                      <h3 className="text-lg font-semibold flex items-center">
                        MenuList
                      </h3>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="p-4">

                    {[...new Set(menuItems.map((item) => item.category))].map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => {setSelectedCategory(category), setIsMobileMenuOpen(false)}}
                        className={`px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors ${
                          selectedCategory === category
                            ? "border-l-4 border-orange-500 bg-orange-50 text-orange-500"
                            : ""
                        }`}
                      >
                        <span>{category}</span>
                      </button>
                    )
                  )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Menu Items */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                {selectedCategory}
                <span className="ml-2 text-sm text-white bg-orange-500 px-2 py-1 rounded-full">
                  {
                    menuItems.filter(
                      (item) => item.category === selectedCategory
                    ).length
                  }
                </span>
              </h2>

              <div className="bg-white rounded-lg shadow-sm">
                {menuItems
                  .filter((item) => item.category === selectedCategory)
                  .map((item) => (
                    <MenuItem key={item._id} item={item} />
                  ))}
              </div>
            </div>

            <div className="hidden md:block w-full md:w-[25rem] flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-gray-200 mx-2 md:mx-0 md:mr-4">
                <Cart />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuList;
