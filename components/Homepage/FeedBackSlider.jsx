"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./sliderStyle.css";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";

const FeedBackSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const feedbacks = [
    {
      rating: 3.5,
      date: "Feb 7, 2024",
      text: "Great for beginner to intermediate social media managers, an example when Hootsuite is perfect is when you are still learning campaign management targets, the analytics are really great.",
      name: "Joanne Valley Hignett",
      role: "Digital Marketing Specialist",
      company: "Chandos Construction",
      employees: "501-1000 employees",
    },
    {
      rating: 1.5,
      date: "Feb 13, 2024",
      text: "Hootsuite has helped my company reach our target audience on multiple trending social media platforms. Even for an individual with a beginner to intermediate experience with business aspects of social media, this bundled tool allows you to reach your target audience with ease with consideration for time efficiency and practicality.",
      name: "Zaina Kroschinski",
      role: "Customer Service Specialist",
      company: "Remax Excellence Rental Advisors",
      employees: "Real Estate | 11-50 employees",
    },
    {
      rating: 2.5,
      date: "Jan 12, 2024",
      text: "As a busy financial security advisor, I couldn’t have time to handle my social media. On the other hand, I needed to be active on social media. Hootsuite helped me to manage my platforms easily and saved a lot of my time. than you Hootsuite!",
      name: "Abdollah Safavi",
      role: "Financial Advisor",
      company: "Freedom 55 Financial",
      employees: "1001-5000 employees",
    },
    {
      rating: 4.5,
      date: "Jan 12, 2024",
      text: "As a busy financial security advisor, I couldn’t have time to handle my social media. On the other hand, I needed to be active on social media. Hootsuite helped me to manage my platforms easily and saved a lot of my time. than you Hootsuite!",
      name: "Abdollah Safavi",
      role: "Financial Advisor",
      company: "Freedom 55 Financial",
      employees: "1001-5000 employees",
    },
    {
      rating: 3.5,
      date: "Jan 12, 2024",
      text: "As a busy financial security advisor, I couldn’t have time to handle my social media. On the other hand, I needed to be active on social media. Hootsuite helped me to manage my platforms easily and saved a lot of my time. than you Hootsuite!",
      name: "Abdollah Safavi",
      role: "Financial Advisor",
      company: "Freedom 55 Financial",
      employees: "1001-5000 employees",
    },
    {
      rating: 0,
      date: "Jan 12, 2024",
      text: "As a busy financial security advisor, I couldn’t have time to handle my social media. On the other hand, I needed to be active on social media. Hootsuite helped me to manage my platforms easily and saved a lot of my time. than you Hootsuite!",
      name: "Abdollah Safavi",
      role: "Financial Advisor",
      company: "Freedom 55 Financial",
      employees: "1001-5000 employees",
    },
    {
      rating: 5,
      date: "Jan 12, 2024",
      text: "As a busy financial security advisor, I couldn’t have time to handle my social media. On the other hand, I needed to be active on social media. Hootsuite helped me to manage my platforms easily and saved a lot of my time. than you Hootsuite!",
      name: "Abdollah Safavi",
      role: "Financial Advisor",
      company: "Freedom 55 Financial",
      employees: "1001-5000 employees",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 font-roboto my-10">
      <div className="relative">
        <Swiper
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
            // swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {feedbacks.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Card className="p-1 md:p-6 shadow-lg rounded-lg text-center flex flex-col justify-center items-center h-96">
                  <CardContent>
                    <div className="text-seo-first-color text-lg flex justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const ratingValue = item.rating - i;
                        if (ratingValue >= 1) {
                          return <span key={i}>⭐</span>; // Full star
                        } else if (ratingValue > 0) {
                          return <span key={i}>✨</span>; // Half star
                        } else {
                          return <span key={i}>☆</span>; // Empty star
                        }
                      })}
                    </div>
                    <p className="italic text-seo-forth-color mt-2">
                      {item.text.length > 100
                        ? item.text.slice(0, 100) + "..."
                        : item.text}
                    </p>
                    <h4 className="font-bold mt-4 text-seo-second-color">
                      {item.name}
                    </h4>
                    <p className="text-sm text-seo-forth-color">
                      <span className="font-semibold "> {item.role} </span>
                      <br /> <span>{item.company}</span> |{" "}
                      <span>{item.employees}</span>
                    </p>
                    <p className="text-xs text-seo-third-color font-black mt-1 ">
                      {item.date}
                    </p>
                    <a
                      href="#"
                      className="text-seo-second-color mt-2 hover:underline"
                    >
                      Read full review →
                    </a>
                  </CardContent>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 z-10">
          <button
            ref={prevRef}
            className="p-3 rounded-full text-white bg-orange-600 hover:bg-seo-primary "
          >
            <ChevronLeft size={24} />
          </button>
          <button
            ref={nextRef}
            className="p-3 rounded-full  text-white bg-orange-600 hover:bg-seo-primary"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedBackSlider;
