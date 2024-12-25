import { useState, useEffect } from "react";
// import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";

const Reviews = ({ productId }) => {
//   const { user } = useUserStore();
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

//   const handleAddReview = async () => {
//     if (!user) {
//       alert("Please login to add a review.");
//       return;
//     }

//     try {
//       await axios.post("/review", {
//         productId,
//         userId: user._id,
//         rating,
//         comment,
//       });
//       alert("Review added successfully!");
//       setRating(0);
//       setComment("");
//       // Refresh reviews after adding a new one
//       const response = await axios.get(`/review/${productId}`);
//       setReviews(response.data.reviews);
//     } catch  {
//       alert("Failed to add review. Please try again.");
//     }
//   };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Customer Reviews</h2>
      {/* Display existing reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-black">{review.userId.name}</span>
                <span className="text-black">{review.rating} ⭐</span>
              </div>
              <p className="mt-2 text-black">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-black">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Form to add a new review */}
      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold">Add Your Review</h3>
        <div className="flex flex-col space-y-4 mt-4">
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border rounded-md p-2"
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
            className="border rounded-md p-2"
          />
          <button
            onClick={handleAddReview}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Reviews;
// import { useState, useEffect } from "react";
// import { useUserStore } from "../stores/useUserStore";
// import axios from "../lib/axios";

// const Reviews = ({ productId }) => {
//   const { user } = useUserStore();
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`/review/${productId}`);
//         setReviews(response.data.reviews);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch reviews:", error);
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [productId]);

//   const handleAddReview = async () => {
//     if (!user) {
//       alert("Please login to add a review.");
//       return;
//     }

//     try {
//       await axios.post("/review", {
//         productId,
//         userId: user._id,
//         rating,
//         comment,
//       });
//       alert("Review added successfully!");
//       setRating(0);
//       setComment("");
//       // Refresh reviews after adding a new one
//       const response = await axios.get(`/review/${productId}`);
//       setReviews(response.data.reviews);
//     } catch  {
//       alert("Failed to add review. Please try again.");
//     }
//   };

//   if (loading) {
//     return <p>Loading reviews...</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-black">Customer Reviews</h2>
//       {/* Display existing reviews */}
//       <div className="space-y-4">
//         {reviews.length > 0 ? (
//           reviews.map((review) => (
//             <div key={review._id} className="border p-4 rounded-lg shadow-sm">
//               <div className="flex justify-between">
//                 <span className="font-semibold">{review.userId.name}</span>
//                 <span>{review.rating} ⭐</span>
//               </div>
//               <p className="mt-2 text-black">{review.comment}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-black">No reviews yet. Be the first to review!</p>
//         )}
//       </div>

//       {/* Form to add a new review */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">Add Your Review</h3>
//         <div className="flex flex-col space-y-4 mt-4">
//           <select
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             className="border rounded-md p-2"
//           >
//             <option value={0}>Select Rating</option>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <option key={star} value={star}>
//                 {star} ⭐
//               </option>
//             ))}
//           </select>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows={4}
//             placeholder="Write your review..."
//             className="border rounded-md p-2"
//           />
//           <button
//             onClick={handleAddReview}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Submit Review
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reviews;
