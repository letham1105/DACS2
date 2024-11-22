import { useEffect } from "react";
// import Slider from "react-slick";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

import banner from "../minidemo.png";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "dist/jean.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "dist/tshirt.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "dist/shoe.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "dist/glass.jpg" },
	{ href: "/jackets", name: "Jackets", imageUrl: "dist/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "dist/suit.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "dist/bag.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			{/* Banner với ảnh duy nhất không có lớp phủ */}
			<div className="h-96 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
			</div>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-black mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-700 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;
