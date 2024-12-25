// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../lib/axios";

// const OrderHistory = ({ userId }) => {
    
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!userId) {
//         console.error("User ID is undefined or null");
//         return;
//       }
//     const fetchOrders = async () => {
//         try {
//             const response = await axios.get(`/order/${userId}`);
//             console.log("Fetched orders:", response.data); // Kiểm tra dữ liệu trả về
//             if (response.data.orders) {
//               setOrders(response.data.orders);
//             } else {
//               console.error("Orders not found");
//             }
//             setLoading(false);
//           } catch (error) {
//             console.error("Error fetching orders:", error);
//             setLoading(false);
//           }
//     };

//     fetchOrders();
//   }, [userId]);

//   const handleAddReview = (productId) => {
//     navigate(`/review/${productId}`);
//   };

//   if (loading) return <p>Loading your orders...</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4 text-black">Order History</h2>
//       {orders.length > 0 ? (
//         orders.map((order) => (
//           <div key={order._id} className="border rounded p-4 mb-4">
//             <p>
//               <strong>Order ID:</strong> {order._id}
//             </p>
//             <p>
//               <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
//             </p>
//             <p>
//               <strong>Purchased Products:</strong>
//             </p>
//             <ul className="list-disc ml-6">
//               {order.products.map((item) => (
//                 <li key={item.product._id}>
//                   {item.product.name} - {item.quantity} pcs - ${item.price.toFixed(2)}
//                   <button
//                     onClick={() => handleAddReview(item.product._id)}
//                     className="ml-4 text-blue-600 underline"
//                   >
//                     Add Review
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p className="text-black">No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";

const OrderHistory = () => {
  const { user } = useUserStore(); // Lấy thông tin người dùng từ store
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user._id) { // Kiểm tra nếu user không tồn tại hoặc user._id là undefined
      console.error("User is not logged in or user ID is undefined");
      navigate("/login"); // Chuyển hướng đến trang login nếu người dùng chưa đăng nhập
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/order/${user._id}`); // Sử dụng user._id làm userId
        console.log("Fetched orders:", response.data); // Kiểm tra dữ liệu trả về
        if (response.data.orders) {
          setOrders(response.data.orders);
        } else {
          console.error("Orders not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]); // Thêm navigate vào dependency để cập nhật khi thay đổi

  const handleAddReview = (productId) => {
    navigate(`/review/${productId}`);
  };

  if (loading) return <p className="text-black text-center">Loading your orders...</p>;

  return (
    <div className="p-6 bg-gray-50 text-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Order History</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="border border-gray-300 rounded-lg shadow-lg p-6 mb-6 bg-white hover:bg-gray-100 transition-all duration-300">
            <p className="text-lg font-medium">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p className="text-md text-gray-600">
              <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
            </p>
            <p className="mt-4 font-semibold">Purchased Products:</p>
            <ul className="list-disc ml-6 space-y-2">
              {order.products
                .filter((item) => item.product) // Lọc bỏ sản phẩm không hợp lệ
                .map((item) => (
                  <li key={item.product._id} className="flex justify-between items-center">
                    <span>{item.product.name} - {item.quantity} pcs - ${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddReview(item.product._id)}
                      className="ml-4 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Add Review
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
