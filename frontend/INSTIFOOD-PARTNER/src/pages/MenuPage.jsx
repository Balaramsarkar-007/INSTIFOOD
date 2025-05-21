import React, { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import CategoryList from '../components/menu/CategoryList';
import MenuItem from '../components/menu/MenuItem';
import MenuItemForm from '../components/menu/MenuItemForm';

const MenuPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Starters' },
    { id: 2, name: 'Main Course' },
    { id: 3, name: 'Desserts' },
    { id: 4, name: 'Beverages' },
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Chicken Burger',
      description: 'Grilled chicken patty with fresh lettuce and special sauce',
      price: 12.99,
      category: 2,
      available: true,
    },
    // Add more items as needed
  ]);

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddItem = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSaveItem = (item) => {
    if (editingItem) {
      setMenuItems(menuItems.map(i => i.id === editingItem.id ? {...item, id: editingItem.id} : i));
    } else {
      setMenuItems([...menuItems, { ...item, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleDeleteItem = (item) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(i => i.id !== item.id));
    }
  };

  const handleToggleAvailability = (item) => {
    setMenuItems(menuItems.map(i => 
      i.id === item.id ? {...i, available: !i.available} : i
    ));
  };

  const filteredItems = menuItems.filter(item => 
    item.category === activeCategory.id &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 flex">
      {/* Sidebar with categories */}
      <div className="w-64 border-r border-gray-200 p-4 bg-gray-50">
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddCategory={() => {/* Add category logic */}}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Menu Items</h1>
          <button
            onClick={handleAddItem}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New Item
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Menu items list */}
        <div className="space-y-4">
          {filteredItems.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onToggleAvailability={handleToggleAvailability}
            />
          ))}
        </div>

        {/* Add/Edit form modal */}
        {showForm && (
          <MenuItemForm
            item={editingItem}
            onSave={handleSaveItem}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MenuPage;