"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { useState } from "react";

const UpgradeSlider = () => {
  const [clicked, setClicked] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setClicked((prev) => (prev === index ? null : index));
  };
  return (
    <div className="upgrade-slider-wrap">

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".upgrade-prev",
          nextEl: ".upgrade-next",
        }}
        slidesPerView={2}
        spaceBetween={12}
        speed={600}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 2 },
          1200: { slidesPerView: 2 },
          1400: { slidesPerView: 2 },
        }}
      >
        <SwiperSlide>
          <div className="slider-item">
            <div
              className={`d-flex align-items-center gap-2 border p-2 rounded ${clicked === 1 ? "addon-item active" : ""}`}
              onClick={() => handleClick(1)}
            >
              <div className="avatar rounded-circle border">
                <ImageWithBasePath
                  src="assets/img/food/food-1.png"
                  alt="food"
                  className="img-fluid img-1"
                />
              </div>
              <div>
                <p className="fw-medium mb-1 text-dark">Extra Chicken</p>
                <p className="mb-0 fw-medium">$2</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slider-item">
            <div
              className={`d-flex align-items-center gap-2 border p-2 rounded ${clicked === 2 ? "addon-item active" : ""}`}
              onClick={() => handleClick(2)}
            >
              <div className="avatar rounded-circle border">
                <ImageWithBasePath
                  src="assets/img/food/food-2.png"
                  alt="food"
                  className="img-fluid img-1"
                />
              </div>
              <div>
                <p className="fw-medium mb-1 text-dark">Grilled Chicken</p>
                <p className="mb-0 fw-medium">$8</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slider-item">
            <div
              className={`d-flex align-items-center gap-2 border p-2 rounded ${clicked === 3 ? "addon-item active" : ""}`}
              onClick={() => handleClick(3)}
            >
              <div className="avatar rounded-circle border">
                <ImageWithBasePath
                  src="assets/img/food/food-3.png"
                  alt="food"
                  className="img-fluid img-1"
                />
              </div>
              <div>
                <p className="fw-medium mb-1 text-dark">Chicken Soup</p>
                <p className="mb-0 fw-medium">$2</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default UpgradeSlider;
