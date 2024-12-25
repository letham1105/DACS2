import { Navigate, Route, Routes } from "react-router-dom";


import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import Aboutus from "./pages/Aboutus.jsx";
import Contactus from "./pages/Contactus.jsx";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";
import OrderHistory from "./pages/OrderHistory";
import EventEmitter from 'events';
import AddReview from "./components/AddReview.jsx";


function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);
  
  EventEmitter.defaultMaxListeners = 20;
	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-white text-white relative overflow-hidden'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full ]' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/contactus' element={<Contactus />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					<Route path='/category/:category' element={<CategoryPage />} />
					<Route path="/product/:productId" element={<ProductDetailPage />} />
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
				  <Route path="/order-history" element={<OrderHistory/>}/>
          <Route path="/review/:productId" element={<AddReview />} />

          <Route path="/profile" element={<ProfilePage />} />
          
				</Routes>
				
			</div>
			<Toaster />
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-400 py-12">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
    {/* Logo và mô tả */}
    <div>
      <h2 className="text-white text-3xl font-bold mb-6">Lyn Store</h2>
      <p className="text-gray-300 leading-relaxed">
        Discover your style with Lyn Store. Experience seamless shopping and premium quality products tailored for you. Shop now and redefine your choices!
      </p>
    </div>

    {/* Liên kết nhanh */}
    <div>
      <h3 className="text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
        Quick Links
      </h3>
      <ul className="space-y-3">
        <li>
          <a href="/" className="hover:text-teal-400 transition duration-300">
            Home
          </a>
        </li>
        <li>
          <a href="/cart" className="hover:text-teal-400 transition duration-300">
            Cart
          </a>
        </li>
        <li>
          <a href="/category" className="hover:text-teal-400 transition duration-300">
            Category
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-teal-400 transition duration-300">
            Contact
          </a>
        </li>
      </ul>
    </div>

    {/* Mạng xã hội và ảnh */}
    <div className="flex flex-col items-start">
      <h3 className="text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
        Follow Us
      </h3>
      {/* Icon mạng xã hội */}
      <div className="flex space-x-6 mb-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.676 0H1.325C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.325 24h11.495v-9.294H9.692V11.09h3.128V8.414c0-3.1 1.893-4.787 4.658-4.787 1.325 0 2.463.099 2.795.143v3.24h-1.917c-1.505 0-1.796.715-1.796 1.764v2.31h3.587l-.467 3.617h-3.12V24h6.116c.732 0 1.324-.592 1.324-1.324V1.324C24 .592 23.408 0 22.676 0z" />
          </svg>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.633 4.833c-.835.37-1.73.617-2.675.725a4.682 4.682 0 0 0 2.063-2.574 9.275 9.275 0 0 1-2.96 1.13 4.656 4.656 0 0 0-7.924 4.244 13.194 13.194 0 0 1-9.548-4.838 4.653 4.653 0 0 0 1.444 6.207A4.61 4.61 0 0 1 .94 9.58v.058a4.656 4.656 0 0 0 3.733 4.564 4.602 4.602 0 0 1-2.095.08 4.658 4.658 0 0 0 4.348 3.243A9.343 9.343 0 0 1 .585 19.74 13.206 13.206 0 0 0 7.17 21c8.89 0 13.755-7.368 13.755-13.755 0-.21 0-.42-.014-.63a9.882 9.882 0 0 0 2.422-2.52z" />
          </svg>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-pink-500 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5a4.25 4.25 0 0 1 4.25 4.25v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm4.25 3A5.25 5.25 0 1 0 17.25 12 5.26 5.26 0 0 0 12 6.5zm0 1.5a3.75 3.75 0 1 1-3.75 3.75A3.75 3.75 0 0 1 12 8zm4.75-2.75a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" />
          </svg>
        </a>
      </div>
      <p>Featured Product</p> <br/>
      {/* Hình ảnh dạng hình vuông */}
      <div className="grid grid-cols-2 gap-2 w-90">
  <img
    src="https://i.pinimg.com/control2/736x/6a/01/73/6a01731db8a625968d3adf2a8e09b4d3.jpg"
    alt="Product 1"
    className="w-full h-14 object-cover rounded-lg"
  />
  <img
    src="https://i.pinimg.com/control2/736x/8c/d2/37/8cd2371ec10fde39072b7a7abdd9f419.jpg"
    alt="Product 2"
    className="w-full h-14 object-cover rounded-lg"
  />
  <img
    src="https://i.pinimg.com/control2/736x/79/f0/d2/79f0d2951f7905101e44905d96c8aa06.jpg"
    alt="Product 3"
    className="w-full h-14 object-cover rounded-lg"
  />
  <img
    src="https://i.pinimg.com/236x/95/c9/35/95c935c52f85147e1723df08e7de7de0.jpg"
    alt="Product 4"
    className="w-full h-14 object-cover rounded-lg"
  />
</div>

    </div>
  </div>
  <div className="text-center text-gray-500 mt-8">
    © 2024 Lyn Store. All Rights Reserved.
  </div>
</footer>


		</div>
	);
}




export default App;
