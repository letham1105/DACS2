import express from "express";
import { addReview, getReviewsByProduct} from "../controllers/review.controller.js";  // Đảm bảo import deleteReview đúng
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route thêm đánh giá
router.post("/", protectRoute, addReview);

// Route lấy danh sách đánh giá theo sản phẩm
router.get("/:productId", getReviewsByProduct);

export default router;
