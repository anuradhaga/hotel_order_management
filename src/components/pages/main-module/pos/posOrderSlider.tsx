"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";

type TabKey = "all" | "dinein" | "takeaway" | "delivery" | "table";

type OrderSlide = {
  orderId: string;
  customer: string;
  time: string;
  eta: string;
  progress: string;
  timer: string;
  table?: string;
  badge: {
    icon: string;
    label: string;
  };
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All Orders" },
  { key: "dinein", label: "Dine In" },
  { key: "takeaway", label: "Take Away" },
  { key: "delivery", label: "Delivery" },
  { key: "table", label: "Table" },
];

const slidesData: Record<TabKey, OrderSlide[]> = {
  all: [
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
    {
      orderId: "56998",
      customer: "Maria Gonzalez",
      time: "11:45 AM",
      eta: "-8 Mins",
      progress: "10%",
      timer: "49:33",
      badge: { icon: "icon-check-check", label: "Take Away" },
    },
    {
      orderId: "65698",
      customer: "Liam O'Connor",
      time: "11:10 AM",
      table: "Table 1",
      eta: "45 Mins",
      progress: "80%",
      timer: "33:00",
      badge: { icon: "icon-wine", label: "Dine In" },
    },
    {
      orderId: "96589",
      customer: "Sophia Kim",
      time: "11:20 AM",
      eta: "22 Mins",
      progress: "70%",
      timer: "70:00",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
  ],
  dinein: [
    {
      orderId: "96589",
      customer: "Sophia Kim",
      time: "11:20 AM",
      eta: "22 Mins",
      progress: "70%",
      timer: "70:00",
      badge: { icon: "icon-wine", label: "Dine In" },
    },
    {
      orderId: "56998",
      customer: "Maria Gonzalez",
      time: "11:45 AM",
      eta: "-8 Mins",
      progress: "10%",
      timer: "49:33",
      badge: { icon: "icon-wine", label: "Dine In" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-wine", label: "Dine In" },
    },
    {
      orderId: "65698",
      customer: "Liam O'Connor",
      time: "11:10 AM",
      table: "Table 1",
      eta: "45 Mins",
      progress: "80%",
      timer: "33:00",
      badge: { icon: "icon-wine", label: "Dine In" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-wine", label: "Dine In" },
    },
  ],
  takeaway: [
    {
      orderId: "56998",
      customer: "Maria Gonzalez",
      time: "11:45 AM",
      eta: "-8 Mins",
      progress: "10%",
      timer: "49:33",
      badge: { icon: "icon-check-check", label: "Take Away" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-check-check", label: "Take Away" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
    {
      orderId: "96589",
      customer: "Sophia Kim",
      time: "11:20 AM",
      eta: "22 Mins",
      progress: "70%",
      timer: "70:00",
      badge: { icon: "icon-check-check", label: "Take Away" },
    },
    {
      orderId: "65698",
      customer: "Liam O'Connor",
      time: "11:10 AM",
      table: "Table 1",
      eta: "45 Mins",
      progress: "80%",
      timer: "33:00",
      badge: { icon: "icon-check-check", label: "Take Away" },
    },
  ],
  delivery: [
    {
      orderId: "65698",
      customer: "Liam O'Connor",
      time: "11:10 AM",
      table: "Table 1",
      eta: "45 Mins",
      progress: "80%",
      timer: "33:00",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
    {
      orderId: "56998",
      customer: "Maria Gonzalez",
      time: "11:45 AM",
      eta: "-8 Mins",
      progress: "10%",
      timer: "49:33",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
    {
      orderId: "96589",
      customer: "Sophia Kim",
      time: "11:20 AM",
      eta: "22 Mins",
      progress: "70%",
      timer: "70:00",
      badge: { icon: "icon-check-check", label: "Delivery" },
    },
  ],
  table: [
    {
      orderId: "65698",
      customer: "Liam O'Connor",
      time: "11:10 AM",
      table: "Table 1",
      eta: "45 Mins",
      progress: "80%",
      timer: "33:00",
      badge: { icon: "icon-concierge-bell", label: "Table" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-concierge-bell", label: "Table" },
    },
    {
      orderId: "56998",
      customer: "Maria Gonzalez",
      time: "11:45 AM",
      eta: "-8 Mins",
      progress: "10%",
      timer: "49:33",
      badge: { icon: "icon-concierge-bell", label: "Table" },
    },
    {
      orderId: "14589",
      customer: "James Smith",
      time: "11:30 AM",
      eta: "12 Mins",
      progress: "10%",
      timer: "20:00",
      badge: { icon: "icon-concierge-bell", label: "Table" },
    },
    {
      orderId: "96589",
      customer: "Sophia Kim",
      time: "11:20 AM",
      eta: "22 Mins",
      progress: "70%",
      timer: "70:00",
      badge: { icon: "icon-concierge-bell", label: "Table" },
    },
  ],
};

const OrdersSlider = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const swipers = useRef<Record<TabKey, SwiperInstance | null>>({
    all: null,
    dinein: null,
    takeaway: null,
    delivery: null,
    table: null,
  });

  const swiperBreakpoints = useMemo(
    () => ({
      0: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      992: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
      1400: { slidesPerView: 3 },
    }),
    []
  );

  useEffect(() => {
    const current = swipers.current[activeTab];
    current?.update();
  }, [activeTab]);

  const goPrev = () => {
    swipers.current[activeTab]?.slidePrev();
  };

  const goNext = () => {
    swipers.current[activeTab]?.slideNext();
  };

  const renderSlide = (slide: OrderSlide, index: number) => (
    <SwiperSlide key={`${slide.orderId}-${index}`}>
      <div className="slide-item">
        <div className="order-item">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div>
              <p className="fs-12 mb-1">#{slide.orderId}</p>
              <h6 className="fs-14 fw-semibold mb-1">{slide.customer}</h6>
              {slide.table ? (
                <p className="fs-13 mb-0 d-flex align-items-center gap-2">
                  {slide.time}
                  <span className="even-line" />
                  {slide.table}
                </p>
              ) : (
                <p className="fs-13 mb-0">{slide.time}</p>
              )}
            </div>
            <div className="text-end">
              <span className="badge bg-light text-dark d-flex align-items-center mb-3">
                <i className={`${slide.badge.icon} text-dark me-1`} />
                {slide.badge.label}
              </span>
              <div
                className={`time badge ${
                  slide.eta === "-8 Mins" ? "bg-danger" : "bg-success"
                } rounded-pill fs-12 fw-normal`}
              >
                <span className="me-1">
                  <i className="icon-clock-arrow-up" />
                </span>
                {slide.eta}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-3">
            <div className="progress-item">
              <div
                className="progress-bar bg-success"
                style={{ width: slide.progress }}
              />
            </div>
            <p className="mb-0 fs-10 fw-normal d-flex align-items-center">
              <i className="icon-clock me-1" />
              {slide.timer}
            </p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );

  return (
    <div className="slider-wrapper mb-4 pb-4 border-bottom">
      <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
        <h3 className="mb-0">Recent Orders</h3>
        <div className="d-flex align-items-center flex-wrap justify-content-between gap-2 flex-fill">
          <ul
            className="nav nav-tabs nav-tabs-solid border-0 align-items-center flex-wrap gap-2"
            role="tablist"
          >
            {tabs.map((tab) => (
              <li className="nav-item" key={tab.key}>
                <button
                  type="button"
                  className={`nav-link shadow-sm ${
                    activeTab === tab.key ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="slick-arrow all-prev"
              onClick={goPrev}
            >
              <i className="icon-arrow-left" />
            </button>
            <button
              type="button"
              className="slick-arrow all-next"
              onClick={goNext}
            >
              <i className="icon-arrow-right" />
            </button>
          </div>
        </div>
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`tab-pane fade ${
              activeTab === tab.key ? "active show" : ""
            }`}
            id={tab.key}
          >
            <Swiper
              className={`${tab.key}-slider`}
              onSwiper={(swiper) => {
                swipers.current[tab.key] = swiper;
              }}
              slidesPerView={3}
              spaceBetween={0}
              speed={2000}
              loop
              observer
              observeParents
              breakpoints={swiperBreakpoints}
            >
              {slidesData[tab.key].map((slide, index) =>
                renderSlide(slide, index)
              )}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSlider;
