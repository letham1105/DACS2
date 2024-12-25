import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  console.log("User data:", user); // Debug log để kiểm tra trạng thái user.

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md  z-40 transition-all duration-300 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black items-center space-x-2 flex">
            Lyn Store
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-4">
            {/* Home Link */}
            <Link
              to="/"
              className="text-black hover:text-gray-600 transition duration-300 ease-in-out"
            >
              Home
            </Link>
              {/* Home Link */}
              <Link
              to="/aboutus"
              className="text-black hover:text-gray-600 transition duration-300 ease-in-out"
            >
              About us
            </Link>
            <Link
              to="/contactus"
              className="text-black hover:text-gray-600 transition duration-300 ease-in-out"
            >
              Contact us
            </Link>
            


            {/* Profile Link next to Home (Chỉ hiển thị cho người dùng không phải admin) */}
            {user && !isAdmin && (
              <Link
                to="/profile"
                className="text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out flex items-center"
              >
                <UserCircle size={20} className="text-black" />
              </Link>
            )}

            {/* Cart */}
            {user && (
              <Link
                to="/cart"
                className="relative group text-black hover:text-gray-600 transition duration-300 ease-in-out"
              >
                <ShoppingCart className="inline-block mr-1 group-hover:text-black" size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-gray-200 text-black rounded-full px-2 py-0.5 
                    text-xs group-hover:bg-gray-400 transition duration-300 ease-in-out"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
                   {/*OrderHistory*/} 
           <a href="/order-history" className="hover:text-blue-300 flex items-center">
        {/* Icon lịch sử mua hàng */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 6H16M8 10H16M10 14H14M5 7h14l1 12H4L5 7z"
          />
        </svg>
      </a>

            {/* Admin Dashboard */}
            {isAdmin && (
              <Link
                className="bg-gray-600 hover:bg-gray-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to="/secret-dashboard"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
    

            {/* User Section */}
            {user ? (
              <>
                {/* Logout */}
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 
                  rounded-md flex items-center transition duration-300 ease-in-out"
                  onClick={logout}
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline ml-2">Log Out</span>
                </button>
              </>
            ) : (
              <>
                {/* Signup */}
                <Link
                  to="/signup"
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                  rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>

                {/* Login */}
                <Link
                  to="/login"
                  className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 
                  rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
