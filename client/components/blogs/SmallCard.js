import moment from "moment";
import Image from "next/future/image";
import Link from "next/link";
import React from "react";
import { API } from "../../config";
import renderHtml from "react-render-html";

const SmallCard = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="relative cursor-pointer">
        <div className="md:absolute w-full lg:min-h-[250px] h-[159px] hidden md:block bg-[#857D7D] mix-blend-multiply"></div>
        <Image
          // loader={myLoaderImg}
          src={`${API}/blog/photo/${blog.slug}`}
          width={450}
          height={250}
          alt={blog.title}
          className="object-center object-cover bg-no-repeat w-[450px] h-[250px]"
        />

        <div className="flex flex-col px-2 justify-center md:items-center items-start md:absolute  md:top-[30%] relative md:text-white text-black  md:left-[6%] ">
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <div className="py-4 text-wrap roboto text-limit h-[65px]">
                {renderHtml(blog.excerpt)}
              </div>
            </a>
          </Link>
          <div className="flex justify-start items-center uppercase text-xs">
            <div className="hidden md:block profile py-5">
              <div className="flex justify-center items-center">
                {blog.categories.map((c, i) => (
                  <Link href={`/category/${c.slug}`} key={i}>
                    <a className="py-1 px-2 bg-white uppercase mr-1 text-black">
                      {c.name}
                    </a>
                  </Link>
                ))}
                <span className="px-3">
                  {" "}
                  {`${moment(blog.updatedAt).format("DD MMM")} `} -{" "}
                  {`${moment(blog.updatedAt).fromNow()}`}
                </span>
              </div>
            </div>
            <div className="profile py-4">
              <Link href={`/profile/${blog.postedBy.username}`}>
                <a>
                  | <span className="px-3">by {blog.postedBy.name}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SmallCard;
