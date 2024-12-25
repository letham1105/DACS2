import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
      const { userId, products, totalAmount } = req.body;
  
      // Kiểm tra nếu userId không tồn tại
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Tạo mới một đơn hàng
      const newOrder = new Order({
        user: userId,
        products,
        totalAmount,
      });
  
      await newOrder.save();
  
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getOrderHistory = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Kiểm tra nếu userId không tồn tại
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Tìm tất cả các đơn hàng của user theo `userId`
      const orders = await Order.find({ user: userId }).populate({
        path: "products.product",
        select: "name price", // Chỉ lấy tên và giá của sản phẩm
      });
  
      // Trả về danh sách đơn hàng
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
