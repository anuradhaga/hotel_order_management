"use client";
import { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";

type Category = {
  id: string;
  href: string;
  title: string;
  count: string;
  image: string;
  isActive?: boolean;
};

const categories: Category[] = [
  {
    id: "all-menu",
    href: "#all-menu",
    title: "All Menus",
    count: "200 Menus",
    image: "assets/img/food/food-1.png",
    isActive: true,
  },
  {
    id: "seafood-menu",
    href: "#seafood-menu",
    title: "Sea Food",
    count: "200 Menus",
    image: "assets/img/food/food-2.png",
  },
  {
    id: "pizza-menu",
    href: "#pizza-menu",
    title: "Pizza",
    count: "180 Menus",
    image: "assets/img/food/food-3.png",
  },
  {
    id: "salad-menu",
    href: "#salad-menu",
    title: "Salads",
    count: "180 Menus",
    image: "assets/img/food/food-4.png",
  },
  {
    id: "tacos-menu",
    href: "#tacos-menu",
    title: "Tacos",
    count: "150 Menus",
    image: "assets/img/food/food-5.png",
  },
  {
    id: "soup-menu",
    href: "#soup-menu",
    title: "Soups",
    count: "180 Menus",
    image: "assets/img/food/food-6.png",
  },
];

const CategorySlider = () => {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const breakpoints = useMemo(
    () => ({
      0: { slidesPerView: 2 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 4 },
      1400: { slidesPerView: 4 },
      1600: { slidesPerView: 5 },
    }),
    []
  );

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <>
      {/* Menu Item */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <h5 className="mb-0 me-2">Menu Categories</h5>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap orders-list">
          <label className="d-flex align-items-center fs-14 text-dark">
            <input
              className="form-check-input m-0 me-2"
              type="checkbox"
              defaultChecked
            />
            <span className="dot success me-1" />
            Veg
          </label>
          <label className="d-flex align-items-center fs-14 text-dark">
            <input className="form-check-input m-0 me-2" type="checkbox" />
            <span className="dot me-1" />
            Non Veg
          </label>
          <label className="d-flex align-items-center fs-14 text-dark">
            <input className="form-check-input m-0 me-2" type="checkbox" />
            <span className="dot warning me-1" />
            Egg
          </label>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="input-group input-group-flat w-auto">
            <input type="text" className="form-control" placeholder="Search" />
            <span className="input-group-text">
              <i className="icon-search text-dark" />
            </span>
          </div>
          <Link
            href="#"
            className="btn btn-icon btn-sm btn-outline-white rounded-circle"
            aria-label="refresh"
          >
            <i className="icon-refresh-ccw" />
          </Link>
          <Link
            href="#"
            className="btn btn-icon btn-sm btn-outline-white rounded-circle"
            aria-label="refresh"
          >
            <i className="icon-list-filter" />
          </Link>
          <div className="d-flex align-items-center gap-2">
            <button type="button" className="slick-arrow category-prev" onClick={goPrev}>
              <i className="icon-arrow-left" />
            </button>
            <button type="button" className="slick-arrow category-next" onClick={goNext}>
              <i className="icon-arrow-right" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Slider */}
      <Swiper
        className="nav nav-tabs nav-tabs-solid category-tab border-0 category-slider mb-2"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        speed={2000}
        loop
        observer
        observeParents
        spaceBetween={0}
        slidesPerView={5}
        breakpoints={breakpoints}
        wrapperTag="ul"
      >
        {categories.map((category) => (
          <SwiperSlide tag="li" className="nav-item px-2" key={category.id}>
            <Link
              href={category.href}
              className={`nav-link shadow w-100 ${
                category.isActive ? " active" : ""
              }`}
              data-bs-toggle="tab"
            >
              <div className="avatar avatar-lg rounded-circle flex-shrink-0">
                <ImageWithBasePath
                  src={category.image}
                  alt="food"
                  className="img-fluid"
                />
              </div>
              <div>
                <h6 className="fs-14 fw-semibold mb-1">{category.title}</h6>
                <p className="text-body fw-normal mb-0">{category.count}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CategorySlider;
