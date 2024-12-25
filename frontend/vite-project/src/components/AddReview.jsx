// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../lib/axios";

// const AddReview = ({ userId }) => {
//   const { productId } = useParams();
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("/review", {
//         productId,
//         userId,
//         rating,
//         comment,
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Failed to add review:", error);
//       alert("Failed to add review.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Review</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="rating"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Rating:
//             </label>
//             <select
//               id="rating"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               className="text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             >
//               {[1, 2, 3, 4, 5].map((r) => (
//                 <option key={r} value={r}>
//                   {r} Star{r > 1 && "s"}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="comment"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Comment:
//             </label>
//             <textarea
//               id="comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               className="text-black block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               rows="5"
//               placeholder="Write your comment here..."
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition duration-300"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddReview;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";

const AddReview = () => {
  const { user } = useUserStore();
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      console.error("productId is required to fetch reviews");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/review/${productId}`);
        setReviews(response.data.reviews);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleAddReview = async () => {
    if (!user) {
      alert("Please login to add a review.");
      return;
    }

    if (!productId) {
      alert("Product ID is required to add a review.");
      return;
    }

    try {
      await axios.post("/review", {
        productId,
        userId: user._id,
        rating,
        comment,
      });
      alert("Review added successfully!");
      setRating(0);
      setComment("");
      // Refresh reviews after adding a new one
      const response = await axios.get(`/review/${productId}`);
      setReviews(response.data.reviews);
    } catch {
      alert("Failed to add review. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-xl text-gray-700">Loading reviews...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Customer Reviews</h2>
      {/* Display the productId */}
      <p className="text-xl text-gray-600 mb-4">Product ID: <span className="font-semibold">{productId}</span></p>

      {/* Display existing reviews */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border p-6 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg text-gray-800">{review.userId.name}</span>
                <span className="text-yellow-500 text-lg">{review.rating} ⭐</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Form to add a new review */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-semibold text-gray-900">Add Your Review</h3>
        <div className="mt-6 flex flex-col space-y-6">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border-2 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} ⭐
              </option>
            ))}
          </select>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Write your review..."
            className="border-2 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <button
            onClick={handleAddReview}
            className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
