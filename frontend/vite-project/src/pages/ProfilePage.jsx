// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useUserStore } from "../stores/useUserStore";
// // import { toast } from "react-hot-toast";

// // const ProfilePage = () => {
// //   const { user, checkAuth, checkingAuth, logout } = useUserStore();
// //   const navigate = useNavigate();
// //   const [profilePicture, setProfilePicture] = useState(null);

// //   // Kiểm tra trạng thái xác thực khi load trang
// //   useEffect(() => {
// //     if (!user) {
// //       checkAuth();
// //     }
// //   }, [user, checkAuth]);

// //   // Xử lý tải ảnh đại diện
// //   const handleProfilePictureUpload = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         setProfilePicture(reader.result); // Lưu ảnh vào state (base64)
// //         toast.success("Cập nhật ảnh đại diện thành công!");
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   // Hiển thị trạng thái khi đang xác thực
// //   if (checkingAuth) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <p className="text-gray-600">Đang tải thông tin người dùng...</p>
// //       </div>
// //     );
// //   }

// //   // Nếu chưa đăng nhập
// //   if (!user) {
// //     toast.error("Bạn cần đăng nhập để truy cập trang này!");
// //     navigate("/login"); // Điều hướng về trang đăng nhập
// //     return null;
// //   }

// //   // Nếu đã đăng nhập, hiển thị trang hồ sơ
// //   return (
// //     <div className="min-h-screen bg-gray-100 py-16">
// //       <div className="container mx-auto px-4">
// //         <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
// //           {/* Ảnh đại diện */}
// //           <div className="flex flex-col items-center">
// //             <div className="relative w-24 h-24">
// //               <img
// //                 src={profilePicture || "https://i.pinimg.com/control2/474x/44/cf/44/44cf44170a1c14b9dde98d3204d69373.jpg"}
// //                 alt="Profile"
// //                 className="w-full h-full rounded-full object-cover shadow-md"
// //               />
// //               <label
// //                 htmlFor="profile-upload"
// //                 className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-blue-600"
// //               >
// //                 <span>+</span>
// //               </label>
// //               <input
// //                 id="profile-upload"
// //                 type="file"
// //                 className="hidden"
// //                 accept="image/*"
// //                 onChange={handleProfilePictureUpload}
// //               />
// //             </div>
// //             <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
// //             <p className="text-gray-500">{user.email}</p>
// //           </div>

// //           {/* Thông tin chi tiết */}
// //           <div className="mt-8 space-y-4">
// //             <div className="flex justify-between">
// //               <span className="font-medium text-gray-700">Tên:</span>
// //               <span className="text-gray-500">{user.name}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="font-medium text-gray-700">Email:</span>
// //               <span className="text-gray-500">{user.email}</span>
// //             </div>
// //             {/* Thêm các trường khác nếu cần */}
// //           </div>

// //           {/* Nút đăng xuất */}
// //           <div className="mt-6 flex justify-center">
// //             <button
// //               onClick={() => {
// //                 logout();
// //                 toast.success("Đã đăng xuất thành công!");
// //                 navigate("/login");
// //               }}
// //               className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
// //             >
// //               Đăng xuất
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { user, checkAuth, checkingAuth, logout, editProfile } = useUserStore();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Load thông tin khi mở form chỉnh sửa
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  // Kiểm tra trạng thái xác thực khi load trang
  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  // Xử lý tải ảnh đại diện
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result); // Lưu ảnh vào state (base64)
        toast.success("Update success");
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý chỉnh sửa thông tin
  const handleEdit = () => {
    editProfile(formData);
    setEditing(false);
  };

  // Hiển thị trạng thái khi đang xác thực
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading.....</p>
      </div>
    );
  }

  // Nếu chưa đăng nhập
  if (!user) {
    toast.error("Log in to view your profile!");
    navigate("/login"); // Điều hướng về trang đăng nhập
    return null;
  }

  // Nếu đã đăng nhập, hiển thị trang hồ sơ
  // return (
  //   <div className="min-h-screen bg-gray-100 py-16">
  //     <div className="container mx-auto px-6 sm:px-8">
  //       <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
  //         {/* Ảnh đại diện */}
  //         <div className="flex flex-col items-center">
  //           <div className="relative w-32 h-32">
  //             <img
  //               src={profilePicture || "https://i.pinimg.com/474x/44/cf/44/44cf44170a1c14b9dde98d3204d69373.jpg"}
  //               alt="Profile"
  //               className="w-full h-full rounded-full object-cover shadow-lg"
  //             />
  //             <label
  //               htmlFor="profile-upload"
  //               className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-blue-700"
  //             >
  //               <span>+</span>
  //             </label>
  //             <input
  //               id="profile-upload"
  //               type="file"
  //               className="hidden"
  //               accept="image/*"
  //               onChange={handleProfilePictureUpload}
  //             />
  //           </div>
  //           <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>
  //           <p className="text-gray-500">{user.email}</p>
  //         </div>

  //         {/* Form chỉnh sửa thông tin */}
  //         {editing ? (
  //           <div className="mt-8 space-y-6">
  //             <div className="flex flex-col">
  //               <label htmlFor="name" className="font-medium text-gray-700">Tên:</label>
  //               <input
  //                 type="text"
  //                 id="name"
  //                 value={formData.name}
  //                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  //                 className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //             <div className="flex flex-col">
  //               <label htmlFor="email" className="font-medium text-gray-700">Email:</label>
  //               <input
  //                 type="email"
  //                 id="email"
  //                 value={formData.email}
  //                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  //                 className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //             <div className="flex justify-end space-x-6">
  //               <button
  //                 onClick={() => setEditing(false)}
  //                 className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
  //               >
  //                 Hủy
  //               </button>
  //               <button
  //                 onClick={handleEdit}
  //                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  //               >
  //                 Lưu
  //               </button>
  //             </div>
  //           </div>
  //         ) : (
  //           <>
  //             {/* Hiển thị thông tin chi tiết */}
  //             <div className="mt-8 space-y-4">
  //               <div className="flex justify-between">
  //                 <span className="font-medium text-gray-700">Tên:</span>
  //                 <span className="text-gray-500">{user.name}</span>
  //               </div>
  //               <div className="flex justify-between">
  //                 <span className="font-medium text-gray-700">Email:</span>
  //                 <span className="text-gray-500">{user.email}</span>
  //               </div>
  //             </div>

  //             {/* Nút chỉnh sửa */}
  //             <div className="mt-6 flex justify-center">
  //               <button
  //                 onClick={() => setEditing(true)}
  //                 className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
  //               >
  //                 Chỉnh sửa
  //               </button>
  //             </div>
  //           </>
  //         )}

  //         {/* Nút đăng xuất */}
  //         <div className="mt-8 flex justify-center">
  //           <button
  //             onClick={() => {
  //               logout();
  //               toast.success("Đã đăng xuất thành công!");
  //               navigate("/login");
  //             }}
  //             className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
  //           >
  //             Đăng xuất
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
 return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-4xl mx-auto transition-transform duration-300 ease-in-out hover:scale-105">
          {/* Ảnh đại diện */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              <img
                src={profilePicture || "https://i.pinimg.com/474x/44/cf/44/44cf44170a1c14b9dde98d3204d69373.jpg"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover shadow-lg transform transition duration-300 hover:scale-110"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-700 transform transition duration-200 hover:scale-110"
              >
                <span>+</span>
              </label>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          {/* Form chỉnh sửa thông tin */}
          {editing ? (
            <div className="mt-8 space-y-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium text-gray-700">Tên:</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
              <div className="flex justify-between mt-6 space-x-4">
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200 w-full sm:w-auto"
                >
                Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition duration-200 w-full sm:w-auto"
                >
               Save
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Hiển thị thông tin chi tiết */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-500">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
              </div>

            
            </>
          )}

          {/* Nút đăng xuất */}
          <div className="mt-8 flex justify-between space-x-4">
            <button
              onClick={() => {
                logout();
                toast.success("Log out success");
                navigate("/login");
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-200 transform hover:scale-105 w-full sm:w-auto"
            >
              Log out
            </button>
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-black text-white rounded-lg shadow-lg hover:bg-gray-500 transition duration-200 transform hover:scale-105 w-full sm:w-auto"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
