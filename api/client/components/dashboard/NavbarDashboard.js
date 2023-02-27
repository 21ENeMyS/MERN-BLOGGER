import Image from "next/future/image";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getCookie } from "../../actions/auth";
import { readUser } from "../../actions/user";
import { API } from "../../config";

const NavbarDashboard = () => {
  const [userProfile, setUserProfile] = useState({});
  const [List, setList] = useState(false);
  const token = getCookie("token");

  const loadUser = () => {
    readUser(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUserProfile(data.username);
      }
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <header className="w-full bg-black text-white px-4 py-2 flex justify-between items-center">
      <div className="">
        <input
          type="text"
          name="search"
          className="ml-[40%] text-black py-2 px-32 placeholder:left-[15%] outline-none rounded-md placeholder:absolute"
          placeholder="Search"
          autoComplete="off"
          autoFocus="off"
        />
        <IoSearch className="absolute text-black left-[15%] top-[3%] text-2xl" />
      </div>
      {/* {JSON.stringify(userProfile.name)} */}

      <div
        className="flex font-semibold justify-center items-center cursor-pointer"
        onClick={(e) => setList(!List)}
      >
        <div className="relative">
          <Image
            src={`${API}/user/photo/${userProfile}`}
            alt={userProfile}
            width={500}
            height={500}
            className="h-[50px] w-[50px] object-cover objecti-center rounded-full bg-no-repeat"
          />
        </div>
        {List && (
          <div className="text-center top-24 right-5 capitalize font-medium w-52 z-10 absolute bg-black text-white ">
            <ul>
              <li
                className="list-unstyled p-2.5 capitalize"
                onClick={() => setList(false)}
              >
                <a href="/profile/update">Update Profile</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarDashboard;
