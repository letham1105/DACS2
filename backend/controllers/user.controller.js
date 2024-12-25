import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password"); // Không trả về mật khẩu
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch users" });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findByIdAndDelete(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to delete user" });
	}
};
export const updateUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const updateData = req.body;

		const user = await User.findByIdAndUpdate(userId, updateData, {
			new: true, // Trả về dữ liệu đã cập nhật
			runValidators: true, // Áp dụng validate theo schema
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({ message: "User updated successfully", user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to update user" });
	}
};
