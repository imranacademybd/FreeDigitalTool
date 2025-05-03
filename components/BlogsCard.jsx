// components/BlogsCard.js
import Link from "next/link";

export default function BlogsCard({ item }) {
  return (
    <Link href={`/blogs/${item._id}`}>
      <div className="card bg-white shadow-sm xl:h-96 overflow-hidden border-2">
        <figure>
          <img
            src={item.coverImage}
            alt="Blog Image"
            className="rounded-lg  object-cover h-52 w-full "
          />
        </figure>
        <div className="card-body justify-start">
          <h2 className="card-title text-xl text-seo-second-color">
            {item.title.length > 40
              ? item.title.slice(0, 50) + "..."
              : item.title}
          </h2>
          <p className="text-start text-seo-des-color-second ">
            {item.excerpt.length > 40
              ? item.excerpt.slice(0, 180) + "..."
              : item.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
