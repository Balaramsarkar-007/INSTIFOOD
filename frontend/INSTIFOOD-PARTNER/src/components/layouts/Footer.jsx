import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TruckIcon, 
  CreditCardIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline';

function Footer() {
  const footerLinks = [
    'Contact Us',
    'Privacy Policy',
    'Refund Policy',
    'Terms & Conditions'
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white pt-4 pb-6">
      {/* Service Features */}
      <div className="container mx-auto px-4 md:px-[5rem]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Free Delivery */}
          <div className="flex flex-col items-center text-center">
            <TruckIcon className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Free delivery</h3>
            <p className="text-gray-400">Delivery happens within: 30-60 minutes</p>
          </div>

          {/* Payment Options */}
          <div className="flex flex-col items-center text-center">
            <CreditCardIcon className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment options</h3>
            <p className="text-gray-400">Online payment</p>
          </div>

          {/* Customer Support */}
          <div className="flex flex-col items-center text-center">
            <QuestionMarkCircleIcon className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer support</h3>
            <p className="text-gray-400">+91-976711xxxx</p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 py-8 border-t border-gray-800">
          {footerLinks.map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Store Address */}
        <div className="text-center mt-4">
          <h3 className="text-xl font-semibold mb-4"> INSTIFOOD, Bombay</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
          IIT Area, Powai, Mumbai, Maharashtra 400076, India
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;