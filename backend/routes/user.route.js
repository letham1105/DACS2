import express from "express";
import { getAllUsers, deleteUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

// Lấy danh sách tất cả người dùng
router.get("/", getAllUsers);

// Xóa người dùng theo ID
router.delete("/:id", deleteUser);

// Cập nhật thông tin người dùng theo ID
router.put("/:id", updateUser);

export default router;
