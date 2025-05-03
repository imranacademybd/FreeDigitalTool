"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardContent } from "@/components/ui/card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./sliderStyle.css";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const InstaArticlesSlider = ({ blogs }) => {

  
  const feedbacks = [
    {
      date: "Jan 20, 2025",
      title: "What Is TBH Meaning on Instagram? ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non incidunt animi officia perferendis maxime iste tenetur tempora eum obcaecati consequuntur quisquam facilis, facere numquam assumenda dignissimos. Molestiae cum laborum quod necessitatibus, optio voluptas atque vel voluptates sint. Voluptates modi, culpa reiciendis magni ipsam quos suscipit corporis rem? Voluptatem, distinctio incidunt.",
    },
    {
      date: "Jan 16, 2025",
      title: "How to Change Instagram Profile Picture",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non incidunt animi officia perferendis maxime iste tenetur tempora eum obcaecati consequuntur quisquam facilis, facere numquam assumenda dignissimos. Molestiae cum laborum quod necessitatibus, optio voluptas atque vel voluptates sint. Voluptates modi, culpa reiciendis magni ipsam quos suscipit corporis rem? Voluptatem, distinctio incidunt.",
    },
    {
      date: "Jan 6, 2025",
      title: "What Are Instagram Security Measures?",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non incidunt animi officia perferendis maxime iste tenetur tempora eum obcaecati consequuntur quisquam facilis, facere numquam assumenda dignissimos. Molestiae cum laborum quod necessitatibus, optio voluptas atque vel voluptates sint. Voluptates modi, culpa reiciendis magni ipsam quos suscipit corporis rem? Voluptatem, distinctio incidunt.",
    },
    {
      date: "Dec 23, 2024",
      title: "Instagram Quotes for Daughter: Share Your Love!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non incidunt animi officia perferendis maxime iste tenetur tempora eum obcaecati consequuntur quisquam facilis, facere numquam assumenda dignissimos. Molestiae cum laborum quod necessitatibus, optio voluptas atque vel voluptates sint. Voluptates modi, culpa reiciendis magni ipsam quos suscipit corporis rem? Voluptatem, distinctio incidunt.",
    },
    {
      date: "Dec 23, 2024",
      title: "Creative Memory Captions for Instagram Posts",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non incidunt animi officia perferendis maxime iste tenetur tempora eum obcaecati consequuntur quisquam facilis, facere numquam assumenda dignissimos. Molestiae cum laborum quod necessitatibus, optio voluptas atque vel voluptates sint. Voluptates modi, culpa reiciendis magni ipsam quos suscipit corporis rem? Voluptatem, distinctio incidunt.",
    },
    {
      date: "Dec 23, 2024",
      title: "Creative Memory Captions for Instagram Posts",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non incidunt animi officia perferendis maxime iste tenetur tempora eum obcaecati consequuntur quisquam facilis, facere numquam assumenda dignissimos. Molestiae cum laborum quod necessitatibus, optio voluptas atque vel voluptates sint. Voluptates modi, culpa reiciendis magni ipsam quos suscipit corporis rem? Voluptatem, distinctio incidunt.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 font-roboto my-10 ">
      <Swiper
        // autoplay={{ delay: 1000, disableOnInteraction: false }}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 10 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }}
        spaceBetween={20}
        loop={true}
        grabCursor={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {blogs?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className=" flex justify-center items-center">
              <div className="card bg-white  shadow-sm xl:h-96 overflow-hidden">
                <figure>
                  <img
                    src={
                      item?.coverImage
                        ? item?.coverImage
                        : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt="Shoes"
                    className="rounded-lg h-52  object-cover w-80 "
                  />
                </figure>
                <div className="card-body justify-start ">
                  <h2 className="card-title text-seo-second-color">
                    {" "}
                    {item?.title?.length > 40
                      ? item.title.slice(0, 40) + "..."
                      : item.title}{" "}
                  </h2>
                  <p className="text-start text-seo-des-color-second font-medium">
                    {item?.excerpt.length > 40
                      ? item?.excerpt.slice(0, 40) + "..."
                      : item?.excerpt}
                  </p>
                  <div className="card-actions justify-end">
                    <Link href={`/blogs/${item?._id}`}>
                      {" "}
                      <button className="btn bg-seo-forth-color text-white hover:bg-seo-first-color border-none">
                        Read More
                      </button>{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination text-seo-first-color"></div>
    </div>
  );
};

export default InstaArticlesSlider;
