import Review from "../models/review.model.js"; // Dùng import thay cho require

// Thêm đánh giá mới
export const addReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    // Validate dữ liệu
    if (!productId || !userId || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const review = await Review.create({ productId, userId, rating, comment });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};

// Lấy danh sách đánh giá theo sản phẩm
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).populate("userId", "name email");

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

// import Review from "../models/review.model.js";
// import Order from "../models/order.model.js";

// import Product from "../models/product.model.js";

// export const addReview = async (req, res) => {
//   const { productId, userId, rating, comment } = req.body;

//   try {
//     // Kiểm tra nếu người dùng đã mua sản phẩm
//     const order = await Order.findOne({ 
//       userId,
//       "items.productId": productId,
//     });

//     if (!order) {
//       return res.status(403).json({ message: "Bạn chưa mua sản phẩm này." });
//     }

//     // Tạo mới đánh giá
//     const review = {
//       userId,
//       rating,
//       comment,
//       createdAt: new Date(),
//     };

//     // Thêm đánh giá vào sản phẩm
//     await Product.findByIdAndUpdate(productId, {
//       $push: { reviews: review },
//     });

//     res.status(201).json({ message: "Đánh giá đã được thêm thành công." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Đã xảy ra lỗi." });
//   }
// };


// // Lấy danh sách đánh giá theo sản phẩm
// export const getReviewsByProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { page = 1, limit = 10 } = req.query; // Paginate reviews

//     const reviews = await Review.find({ productId })
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       .populate("userId", "name email");

//     const totalReviews = await Review.countDocuments({ productId });

//     res.status(200).json({
//       reviews,
//       totalReviews,
//       totalPages: Math.ceil(totalReviews / limit),
//       currentPage: page,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
//   }
// };
