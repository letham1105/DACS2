import { useState, useEffect } from "react";
// import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";
import { Edit3, Trash } from "lucide-react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const UserList = () => {
	// const { user, logout } = useUserStore();
	const [users, setUsers] = useState([]);
	const [editingUserId, setEditingUserId] = useState(null);
	const [formData, setFormData] = useState({ name: "", email: "" });

	// Fetch danh sách người dùng
	const fetchUsers = async () => {
		try {
			const response = await axios.get("/user");
			setUsers(response.data);
		} catch {
			toast.error("Failed to fetch users.");
		}
	};

	// Khi component mount, fetch users
	useEffect(() => {
		fetchUsers();
	}, []);

	// Xử lý khi nhấn nút chỉnh sửa
	const handleEditClick = (user) => {
		setEditingUserId(user._id);
		setFormData({ name: user.name, email: user.email });
	};

	// Xử lý thay đổi trong form
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Lưu chỉnh sửa
	const handleSaveClick = async () => {
		try {
			await axios.put(`/user/${editingUserId}`, formData);
			toast.success("User updated successfully.");
			setEditingUserId(null);
			fetchUsers();
		} catch  {
			toast.error("Failed to update user.");
		}
	};

	// Xóa người dùng
	const handleDeleteClick = async (userId) => {
		if (!window.confirm("Are you sure you want to delete this user?")) return;

		try {
			await axios.delete(`/user/${userId}`);
			toast.success("User deleted successfully.");
			fetchUsers();
		} catch {
			toast.error("Failed to delete user.");
		}
	};

	return (
		<motion.div
			className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto mt-10"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h1 className="text-white text-2xl font-semibold text-center p-4">User Management</h1>
			<table className="min-w-full divide-y divide-gray-700">
				<thead className="bg-gray-700">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							Email
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-gray-800 divide-y divide-gray-700">
					{users.map((user) => (
						<tr key={user._id} className="hover:bg-gray-700">
							{editingUserId === user._id ? (
								<>
									<td className="px-6 py-4">
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleFormChange}
											className="bg-gray-700 text-white rounded p-2 w-full"
										/>
									</td>
									<td className="px-6 py-4">
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleFormChange}
											className="bg-gray-700 text-white rounded p-2 w-full"
										/>
									</td>
									<td className="px-6 py-4">
										<button
											onClick={handleSaveClick}
											className="text-green-400 hover:text-green-300 mr-4"
										>
											Save
										</button>
										<button
											onClick={() => setEditingUserId(null)}
											className="text-red-400 hover:text-red-300"
										>
											Cancel
										</button>
									</td>
								</>
							) : (
								<>
									<td className="px-6 py-4 text-gray-300">{user.name}</td>
									<td className="px-6 py-4 text-gray-300">{user.email}</td>
									<td className="px-6 py-4 text-sm font-medium">
										<button
											onClick={() => handleEditClick(user)}
											className="text-blue-400 hover:text-blue-300 mr-4"
										>
											<Edit3 className="h-5 w-5" />
										</button>
										<button
											onClick={() => handleDeleteClick(user._id)}
											className="text-red-400 hover:text-red-300"
										>
											<Trash className="h-5 w-5" />
										</button>
									</td>
								</>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};

export default UserList;
