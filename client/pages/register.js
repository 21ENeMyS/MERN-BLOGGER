import React from "react";
import Head from "next/head";
import Signup from "../components/auth/Signup";
import Image from "next/future/image";

const register = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <section className="bg-white">
        <div className="flex items-center justify-center">
          <div className="h-full w-full">
            <div className="absolute lg:relative top-0 left-0 right-0 bottom-0 bg-black/80 "></div>
            <Image
              width={1980}
              height={1080}
              src="/img/nature1.jpg"
              alt="Resgiter"
              className="object-cover bg-no-repeat object-[center_bottom] h-screen w-screen"
              // style={{ width: "20B0px", height: "500px" }}
            />
          </div>
          <Signup />
        </div>
      </section>
    </>
  );
};

export default register;
