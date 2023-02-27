import Link from "next/link";
import React from "react";
import { IoMdHome, IoIosArrowBack } from "react-icons/io";
import { IoGrid, IoLogOutSharp, IoSearch } from "react-icons/io5";
import { RiArticleFill } from "react-icons/ri";
import { MdPermMedia } from "react-icons/md";
import { isAuth, signout } from "../../actions/auth";
import Router from "next/router";
const Sidebar = () => {
  const Menus = [
    { title: "Dashboard", src: <IoMdHome />, to: "/user/dashboard" },
    { title: "Post", src: <RiArticleFill />, to: "/user/dashboard/post" },
    { title: "Categories", src: <IoGrid />, to: "/user/dashboard/categories" },
    { title: "Media", src: <MdPermMedia />, to: "/user/dashboard/media" },
  ];
  const adminMenus = [
    { title: "Dashboard", src: <IoMdHome />, to: "/admin/dashboard" },
    { title: "Post", src: <RiArticleFill />, to: "/admin/dashboard/post" },
    { title: "Categories", src: <IoGrid />, to: "/admin/dashboard/categories" },
    { title: "Media", src: <MdPermMedia />, to: "/admin/dashboard/media" },
  ];

  return (
    <nav className="fixed bg-black text-white top-0 roboto flex flex-col justify-between items-center w-44 h-screen py-4 z-10">
      {isAuth() && isAuth().role === 1 ? (
        <Link href="/admin/dashboard/">
          <a className="font-bold text-2xl uppercase">Blogger</a>
        </Link>
      ) : (
        <Link href="/user/dashboard/">
          <a className="font-bold text-2xl uppercase">Blogger</a>
        </Link>
      )}

      <ul className="flex flex-col justify-between items-start gap-y-3">
        {isAuth && isAuth().role === 1
          ? adminMenus.map((menu, i) => (
              <li className="flex justify-center items-center gap-x-3" key={i}>
                <span>{menu.src}</span>
                <Link href={menu.to}>
                  <a>{menu.title}</a>
                </Link>
              </li>
            ))
          : Menus.map((menu, i) => (
              <li className="flex justify-center items-center gap-x-3" key={i}>
                <span>{menu.src}</span>
                <Link href={menu.to}>
                  <a>{menu.title}</a>
                </Link>
              </li>
            ))}
      </ul>
      <a onClick={() => signout(() => Router.replace(`/login`))}>
        <div className="flex justify-between items-center gap-x-3 cursor-pointer">
          <IoLogOutSharp />
          Logout
        </div>
      </a>
    </nav>
  );
};

export default Sidebar;
