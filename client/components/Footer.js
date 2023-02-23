import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="container mx-auto py-8 px-4 roboto">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-start">
        <div className="sendme">
          <h1 className="playfair-display md:text-4xl text-2xl font-bold">
            Send Me News
          </h1>
          <form action="" className="py-8">
            <div className="relative my-5">
              <input
                autoComplete="off"
                id="password"
                required
                className="border-b py-1 focus:outline-none focus:border-white lg:focus:border-black focus:border-b-2 peer transition-colors w-9/12 bg-transparent"
              />
              <label
                htmlFor=""
                className="absolute top-1 left-0 cursor-text peer-focus:text-xs peer-focus:-top-5 transition-all peer-valid:-top-5 peer-valid:text-xs"
              >
                Enter your email
              </label>
            </div>
            <button
              type="submit"
              className="relative playfair-display font-bold -top-12 left-[65%]"
            >
              Get Insights
            </button>
          </form>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center items-start ml-8 md:ml-0 gap-8 md:gap-0">
          <div className="flex flex-col justify-center items-start capitalize">
            <h1 className="text-4xl playfair-display pb-4">Content</h1>
            <Link href="">
              <a>our story</a>
            </Link>
            <Link href="">
              <a>Blogs</a>
            </Link>
            <Link href="">
              <a>Membership</a>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-4xl playfair-display pb-4">Company</h1>
            <Link href="">
              <a>About</a>
            </Link>
            <Link href="">
              <a>Careers</a>
            </Link>
            <Link href="">
              <a>Contact Us</a>
            </Link>
          </div>
          <div className="relative top-4 flex flex-col justify-start items-start capitalize">
            <h1 className="  text-4xl playfair-display pb-3">Social</h1>
            <Link href="">
              <a>twitter</a>
            </Link>
            <Link href="">
              <a>youtube</a>
            </Link>
            <Link href="">
              <a>facebook</a>
            </Link>
            <Link href="">
              <a>instagram</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-24 capitalize gap-10 md:gap-0">
        <Link href="">
          <a className="uppercase font-bold text-3xl md:hidden block">Blog21</a>
        </Link>
        <p className="text-black opacity-50">
          &copy; {new Date().getFullYear()} BLOG21 by Almarup All rights
          reserved{" "}
          <Link href="">
            <a>privacy</a>
          </Link>
          {"  "}
          <Link href="">
            <a>contact</a>
          </Link>
        </p>
        <Link href="">
          <a className="uppercase font-bold text-3xl hidden md:block">Blog21</a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
