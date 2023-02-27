import Image from "next/image";
import Link from "next/link";
import React from "react";
import { API } from "../../config";

const ProfileUser = ({ user }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:gap-x-12 gap-x-0">
      {/* <div className="w-full h-screen md:hidden block relative">
        <Image
          src={`${API}/user/photo/${user.username}`}
          alt={user.username}
          width={1920}
          height={1080}
          className="object-cover object-center bg-no-repeat w-full h-screen "
        />
      </div> */}
      <div className="md:w-[90%] w-full md:py-0 py-8">
        <h5 className="md:text-4xl text-2xl">Hi There !</h5>
        <h1 className="md:text-6xl text-4xl py-6 font-bold capitalize">
          I'm {user.name} a photographer
        </h1>
        <div className="md:text-lg text-md">{user.about}</div>
        <div className="flex justify-start item-center pt-8 md:gap-x-8 gap-x-4">
          <Link href="">
            <a>facebook</a>
          </Link>
          <Link href="">
            <a>linkedin</a>
          </Link>
          <Link href="">
            <a>twitter</a>
          </Link>
          <Link href="">
            <a>instagram</a>
          </Link>
        </div>
      </div>
      <div className="w-full h-screen hidden md:block">
        <img
          src={`${API}/user/photo/${user.username}`}
          alt={user.username}
          // width={1920}
          // height={1080}
          className="object-cover object-center bg-no-repeat w-full h-screen "
        />
      </div>
    </div>
  );
};

export default ProfileUser;
