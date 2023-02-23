import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { isAuth, signout } from "../actions/auth";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    process.browser && setIsBrowser(true);
  }, []);

  return (
    <nav
      className={`${
        navbar ? "bg-white" : "bg-transparant"
      } w-full lg:py-4 py-8 sticky z-50 top-0 transition-all `}
    >
      <div className="text-black container mx-auto px-4 flex justify-between items-center roboto">
        <a
          href={"/"}
          className={`${
            isActive ? "text-white" : "text-black"
          }  font-bold text-3xl relative z-10`}
        >
          Blogger
        </a>

        <div
          className="lg:hidden z-10 flex justify-between flex-col relative items-center h-5 right-0 cursor-pointer"
          onClick={() => setIsActive(!isActive)}
        >
          <span
            className={`${
              isActive
                ? "rotate-45 translate-y-2"
                : "rotate-0 translate-y-0 bg-black"
            } bg-white 
           h-1 w-5 transition-all`}
          ></span>
          <span
            className={`${
              isActive ? "opacity-0" : "opacity-100 bg-black"
            } transition-all bg-white h-1 w-5`}
          ></span>
          <span
            className={`${
              isActive
                ? "-rotate-45 -translate-y-2"
                : "-rotate-0 -translate-y-0 bg-black"
            } bg-white
          h-1 w-5 transition-all `}
          ></span>
        </div>

        <div
          className={`${
            isActive ? "block" : "lg:block hidden"
          }  mx-auto bg-[rgba(0,0,0,0.6)]  backdrop-blur w-full absolute top-0 left-0 lg:h-0 h-screen transition-all `}
        >
          <ul
            className={`${
              isActive ? "text-white" : "text-black"
            } flex justify-center lg:flex-row flex-col items-center gap-6 py-8 h-1/2 relative lg:top-0 top-36 `}
          >
            <li>
              <Link href="/about">
                <a>About us</a>
              </Link>
            </li>
            <li>
              <Link href={"/blogs"}>
                <a>Blogs</a>
              </Link>
            </li>
            {isAuth() && isAuth().role !== 1 ? (
              <>
                <li>
                  <Link href="/user/create">
                    <a>Write</a>
                  </Link>
                </li>
                <li>
                  <Link href="/user/dashboard">
                    <a>Dashboard</a>
                  </Link>
                </li>
              </>
            ) : (
              isBrowser &&
              isAuth() && (
                <>
                  <li>
                    <Link href="/admin/blog">
                      <a>Write</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/dashboard">
                      <a>Dashboard</a>
                    </Link>
                  </li>
                </>
              )
            )}

            <li>
              <a
                href="/login"
                className="py-2 px-4 bg-white text-black lg:hidden block lg:bg-black lg:text-white"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
        {isBrowser && isAuth() ? (
          <a onClick={() => signout(() => Router.replace(`/login`))}>
            <div className="py-2 px-4 relative hidden lg:block cursor-pointer bg-black text-white">
              Signout
            </div>
          </a>
        ) : (
          <Link href="/login">
            <a className="py-2 px-4 relative hidden lg:block cursor-pointer bg-black text-white">
              Get Started
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
