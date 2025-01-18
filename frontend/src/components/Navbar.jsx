import React from 'react';
import { Link } from 'react-router-dom';
import { FaFeatherAlt } from 'react-icons/fa'; // Mengganti ikon dengan ikon feather (bisa diganti sesuai kebutuhan)

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-100 via-red-500 to-red-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white">
              <img src="images/garudalogo.png" alt="Garuda Logo" className="h-12 w-auto" />
              <span className="ml-1 text-2xl font-bold tracking-wide text-gradient">KITAGARUDA</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white focus:outline-none hover:text-yellow-300"
              aria-label="Open Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
