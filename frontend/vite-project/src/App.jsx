import { Navigate, Route, Routes } from "react-router-dom";


import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

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
// import ProfilePage from "./pages/ProfilePage";
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
				</Routes>
				{/* <Route path="/profile" element={<ProfilePage />} /> */}
			</div>
			<Toaster />
			<footer className="bg-black text-gray-400 py-10">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
    {/* Logo và mô tả */}
    <div>
      <h2 className="text-white text-2xl font-bold mb-4">E-Commerce</h2>
      <p className="text-gray-400">
	  Welcome to our store – your one-stop destination for all your needs. Offering top-quality products at unbeatable prices. Explore now and experience shopping like never before!
      </p>
    </div>

    {/* Liên kết nhanh */}
    <div>
      <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-white transition">Home</a></li>
        <li><a href="/about" className="hover:text-white transition">Cart</a></li>
        <li><a href="/shop" className="hover:text-white transition">Category</a></li>
        <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
      </ul>
    </div>

    {/* Mạng xã hội */}
    <div>
      <h3 className="text-white text-xl font-semibold mb-4">Follow Us</h3>
      <div className="flex space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.676 0H1.325C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.325 24h11.495v-9.294H9.692V11.09h3.128V8.414c0-3.1 1.893-4.787 4.658-4.787 1.325 0 2.463.099 2.795.143v3.24h-1.917c-1.505 0-1.796.715-1.796 1.764v2.31h3.587l-.467 3.617h-3.12V24h6.116c.732 0 1.324-.592 1.324-1.324V1.324C24 .592 23.408 0 22.676 0z"/>
          </svg>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.633 4.833c-.835.37-1.73.617-2.675.725a4.682 4.682 0 0 0 2.063-2.574 9.275 9.275 0 0 1-2.96 1.13 4.656 4.656 0 0 0-7.924 4.244 13.194 13.194 0 0 1-9.548-4.838 4.653 4.653 0 0 0 1.444 6.207A4.61 4.61 0 0 1 .94 9.58v.058a4.656 4.656 0 0 0 3.733 4.564 4.602 4.602 0 0 1-2.095.08 4.658 4.658 0 0 0 4.348 3.243A9.343 9.343 0 0 1 .585 19.74 13.206 13.206 0 0 0 7.17 21c8.89 0 13.755-7.368 13.755-13.755 0-.21 0-.42-.014-.63a9.882 9.882 0 0 0 2.422-2.52z"/>
          </svg>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-pink-500 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5a4.25 4.25 0 0 1 4.25 4.25v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm4.25 3A5.25 5.25 0 1 0 17.25 12 5.26 5.26 0 0 0 12 6.5zm0 1.5a3.75 3.75 0 1 1-3.75 3.75A3.75 3.75 0 0 1 12 8zm4.75-2.75a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z"/>
          </svg>
        </a>
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
