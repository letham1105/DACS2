// import { motion } from "framer-motion";
// import { Trash, Star } from "lucide-react";
// import { useProductStore } from "../stores/useProductStore";

// const ProductsList = () => {
// 	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

// 	console.log("products", products);

// 	return (
// 		<motion.div
// 			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ duration: 0.8 }}
// 		>
// 			<table className=' min-w-full divide-y divide-gray-700'>
// 				<thead className='bg-gray-700'>
// 					<tr>
// 						<th
// 							scope='col'
// 							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
// 						>
// 							Product
// 						</th>
// 						<th
// 							scope='col'
// 							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
// 						>
// 							Price
// 						</th>
// 						<th
// 							scope='col'
// 							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
// 						>
// 							Category
// 						</th>

// 						<th
// 							scope='col'
// 							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
// 						>
// 							Featured
// 						</th>
// 						<th
// 							scope='col'
// 							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
// 						>
// 							Actions
// 						</th>
// 					</tr>
// 				</thead>

// 				<tbody className='bg-gray-800 divide-y divide-gray-700'>
// 					{products?.map((product) => (
// 						<tr key={product._id} className='hover:bg-gray-700'>
// 							<td className='px-6 py-4 whitespace-nowrap'>
// 								<div className='flex items-center'>
// 									<div className='flex-shrink-0 h-10 w-10'>
// 										<img
// 											className='h-10 w-10 rounded-full object-cover'
// 											src={product.image}
// 											alt={product.name}
// 										/>
// 									</div>
// 									<div className='ml-4'>
// 										<div className='text-sm font-medium text-white'>{product.name}</div>
// 									</div>
// 								</div>
// 							</td>
// 							<td className='px-6 py-4 whitespace-nowrap'>
// 								<div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
// 							</td>
// 							<td className='px-6 py-4 whitespace-nowrap'>
// 								<div className='text-sm text-gray-300'>{product.category}</div>
// 							</td>
// 							<td className='px-6 py-4 whitespace-nowrap'>
// 								<button
// 									onClick={() => toggleFeaturedProduct(product._id)}
// 									className={`p-1 rounded-full ${
// 										product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
// 									} hover:bg-yellow-500 transition-colors duration-200`}
// 								>
// 									<Star className='h-5 w-5' />
// 								</button>
// 							</td>
// 							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
// 								<button
// 									onClick={() => deleteProduct(product._id)}
// 									className='text-red-400 hover:text-red-300'
// 								>
// 									<Trash className='h-5 w-5' />
// 								</button>
// 							</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</motion.div>
// 	);
// };
// export default ProductsList;
import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Star, Edit3 } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, editProduct, products } = useProductStore();
	const [editingProductId, setEditingProductId] = useState(null);
	const [formData, setFormData] = useState({ name: "", price: "", category: "" });

	// Xử lý nhấn nút "Edit"
	const handleEditClick = (product) => {
		setEditingProductId(product._id); // Đặt sản phẩm đang chỉnh sửa
		setFormData({ name: product.name, price: product.price, category: product.category }); // Gán dữ liệu ban đầu
	};

	// Xử lý thay đổi trong form
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Lưu chỉnh sửa
	const handleSaveClick = async () => {
		await editProduct(editingProductId, formData); // Cập nhật sản phẩm
		setEditingProductId(null); // Thoát chế độ chỉnh sửa
	};

	return (
		<motion.div
			className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className="min-w-full divide-y divide-gray-700">
				<thead className="bg-gray-700">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							Product
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							Price
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							Category
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							Featured
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-gray-800 divide-y divide-gray-700">
					{products?.map((product) => (
						<tr key={product._id} className="hover:bg-gray-700">
							{/* Nếu đang chỉnh sửa sản phẩm */}
							{editingProductId === product._id ? (
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
											type="number"
											name="price"
											value={formData.price}
											onChange={handleFormChange}
											className="bg-gray-700 text-white rounded p-2 w-full"
										/>
									</td>
									<td className="px-6 py-4">
										<input
											type="text"
											name="category"
											value={formData.category}
											onChange={handleFormChange}
											className="bg-gray-700 text-white rounded p-2 w-full"
										/>
									</td>
									<td className="px-6 py-4" colSpan={2}>
										<button
											onClick={handleSaveClick}
											className="text-green-400 hover:text-green-300 mr-4"
										>
											Save
										</button>
										<button
											onClick={() => setEditingProductId(null)}
											className="text-red-400 hover:text-red-300"
										>
											Cancel
										</button>
									</td>
								</>
							) : (
								<>
									{/* Hiển thị sản phẩm bình thường */}
									<td className="px-6 py-4">
										<div className="flex items-center">
											<img
												className="h-10 w-10 rounded-full object-cover"
												src={product.image}
												alt={product.name}
											/>
											<div className="ml-4 text-sm font-medium text-white">
												{product.name}
											</div>
										</div>
									</td>
									<td className="px-6 py-4 text-gray-300">${product.price.toFixed(2)}</td>
									<td className="px-6 py-4 text-gray-300">{product.category}</td>
									<td className="px-6 py-4">
										<button
											onClick={() => toggleFeaturedProduct(product._id)}
											className={`p-1 rounded-full ${
												product.isFeatured
													? "bg-yellow-400 text-gray-900"
													: "bg-gray-600 text-gray-300"
											} hover:bg-yellow-500 transition-colors duration-200`}
										>
											<Star className="h-5 w-5" />
										</button>
									</td>
									<td className="px-6 py-4 text-sm font-medium">
										<button
											onClick={() => handleEditClick(product)}
											className="text-blue-400 hover:text-blue-300 mr-4"
										>
											<Edit3 className="h-5 w-5" />
										</button>
										<button
											onClick={() => deleteProduct(product._id)}
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

export default ProductsList;
