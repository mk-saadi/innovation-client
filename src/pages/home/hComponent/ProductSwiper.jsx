/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ProductSwiper = ({ product }) => {
	const images = product?.images;

	return (
		<div className="w-full p-2">
			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination]}
				className="w-full mySwiper h-fit"
				rewind={true}
			>
				{images &&
					images.map((image, index) => (
						<SwiperSlide
							key={index}
							className="w-auto h-min active:cursor-grabbing cursor-grab"
						>
							<img
								className="md:h-[320px] lg:h-[420px] xl:h-[440px] max-h-[300px] w-fit"
								src={image}
								alt={`Product Image ${index + 1}`}
							/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default ProductSwiper;
