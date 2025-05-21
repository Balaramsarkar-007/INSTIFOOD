import React, {useEffect} from 'react';
import { Store, ClipboardList, Settings, BarChart2, LogOut, ChefHat } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItem = [
  { icon: BarChart2, text: 'Dashboard', path: '/dashboard' },
  { icon: Store, text: 'Menu', path: '/menu' },
  { icon: ClipboardList, text: 'Orders', path: '/orders' },
  { icon: Settings, text: 'Settings', path: '/settings' },
  { icon: LogOut, text: 'Logout', path: '/logout' },
];

const NavItem = ({ icon: Icon, text, isActive, onClick, className, path }) => (
  <Link to={path}>
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-center lg:justify-start p-3 rounded-xl transition-colors hover:bg-blue-100 cursor-pointer ${className}`}
  >
    <Icon className="w-6 h-6" />
    <span className="hidden lg:block ml-3">{text}</span>
  </button>
  </Link>
);

const Sidebar = () => {
  const [activeItem, setActiveItem] = React.useState();
  const location = useLocation();
  
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <div className="w-20 lg:w-70 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 lg:h-20 border-b border-gray-200">
        <ChefHat className="w-8 h-8 text-blue-600 lg:hidden" />
        <span className="text-2xl font-extrabold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
                INSTIFOOD PARTNER
        </span>
      </div>
      
      <nav className="p-3 lg:p-4 space-y-2">
       { navItem.map((item, idx) => (
        <NavItem 
          icon={item.icon} 
          text={item.text} 
          path={item.path} 
          key={idx}
          className={activeItem === item.path ? "bg-blue-50 text-blue-600" : "text-gray-600"}
          onClick={() => setActiveItem(item.path)}
        />
       ))}
      </nav>
    </div>
  );
};

export default Sidebar;