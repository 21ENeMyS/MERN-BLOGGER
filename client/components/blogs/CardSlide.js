import moment from "moment";
import Link from "next/link";
import React from "react";
import { API } from "../../config";
import renderHtml from "react-render-html";
import Image from "next/future/image";

const CardSlide = ({ blog }) => {
  const showCategory = () => {
    return blog.categories.map((c) => (
      <Link href={`/category/${c.slug}`}>
        <a className="py-1 px-3 md:py-2 md:px-4 bg-black mr-2 text-white">
          {c.name}
        </a>
      </Link>
    ));
  };
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className=" w-full">
        <div className="img-highlight ">
          <Image
            // loader={myLoaderImg}
            src={`${API}/blog/photo/${blog.slug}`}
            alt={`${blog.title}`}
            width={810}
            height={460}
            className="w-[810px] h-[460px] object-cover object-center bg-no-repeat"
            priority
          />
        </div>
        <div className="flex justify-between text-xs md:text-lg items-center w-full uppercase md:w-[92%]">
          <div className="flex justify-center items-center py-5">
            {showCategory()}
            <span className="px-3">
              {" "}
              {`${moment(blog.updatedAt).format("DD MMM")} `} -{" "}
              {`${moment(blog.updatedAt).fromNow()}`}
            </span>
          </div>
          <div className="profile ">
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a className="flex relative uppercase justify-center  items-center">
                <div className="relative w-[20px] h-[2px] bg-black"></div>
                <span className="pl-3">by {blog.postedBy.name}</span>
              </a>
            </Link>
          </div>
        </div>

        <div className="text-primary md:w-11/12 ">
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h1 className="playfair-display md:text-4xl text-2xl">
                {blog.title}
              </h1>
              <div className="py-6 md:text-xl text-md">
                {renderHtml(blog.excerpt)}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default CardSlide;
