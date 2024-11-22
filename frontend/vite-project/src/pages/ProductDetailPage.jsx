import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import PeopleAlsoBought from "../components/PeopleAlsoBought"; // Import Component
import toast from "react-hot-toast";


const ProductDetailPage = () => {
  const { productId } = useParams();
  const { products, fetchAllProducts, loading } = useProductStore();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchAllProducts();
    } else {
      const selectedProduct = products.find((item) => item._id === productId);
      setProduct(selectedProduct || null);
    }
  }, [products, productId, fetchAllProducts]);
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn việc kích hoạt link khi nhấn nút "Add to Cart"
    e.preventDefault();
    if (!user) {
        toast.error("Please login to add products to cart", { id: "login" });
        return;
    } else {
        // add to cart
        addToCart(product);
        toast.success("Added to cart!", { id: "cart" });
    }
};

 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-gray-700">Product not found</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {product.name}
        </motion.h1>

        {/* Product Details */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] object-contain rounded-lg shadow-lg bg-gray-100"
            />
          </div>

          <div className="flex flex-col space-y-6">
            <p className="text-lg text-gray-600 font-semibold">{product.description}</p>
            <div className="text-2xl font-semibold text-black">
              ${product.price}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-500 transition duration-200"
              >
                Add to Cart
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
              >
                Go Back
              </button>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="mt-12 p-6 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Product Details
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Category: {product.category || "N/A"}</li>
            <li>Available Stock: {product.stock || "N/A"}</li>
            <li>SKU: {product.sku || "N/A"}</li>
          </ul>
        </motion.div>

        {/* People Also Bought */}
        <PeopleAlsoBought />
      </div>
    </div>
  );
};

export default ProductDetailPage;
