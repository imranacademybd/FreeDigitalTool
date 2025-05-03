import React from 'react'
import InstaArticlesSlider from './InstaArticlesSlider';
import { axiosClient } from '@/lib/apiClient';

const LatestInstagramArticlesSliderDetails = async () => {
     const response = await axiosClient.get(`/api/blogs?recent=true`);
      const blogs = response?.data?.simplifiedBlogs || [];
  return (
    <div className="my-14 font-roboto p-4">
      <div className="container mx-auto flex flex-col justify-center items-center gap-y-10">
        <h1 className=" text-3xl md:text-4xl font-bold font-playfair text-seo-first-color text-center">
          {" "}
          Latest  Articles
        </h1>
      </div>
      <InstaArticlesSlider blogs={blogs} />
    </div>
  );
}

export default LatestInstagramArticlesSliderDetails
