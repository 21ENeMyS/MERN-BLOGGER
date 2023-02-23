import Link from "next/link";
import React from "react";
import { IoEyeSharp, IoPencil } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { RiArticleFill } from "react-icons/ri";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import Dashboard from "../../../components/Dashboard";
import LineChart from "../../../components/LineChart";
import TableBlog from "../../../components/dashboard/TableBlog";
import Head from "next/head";
import Admin from "../../../components/auth/Admin";

const index = () => {
  const cards = [
    { title: "Views", count: "1.200.000", icon: <IoEyeSharp /> },
    {
      title: "Articles",
      count: "200.000",
      icon: <RiArticleFill />,
    },
    {
      title: "subscription",
      count: "1.200.000",
      icon: <MdPeopleAlt />,
    },
    { title: "authors", count: " 200", icon: <IoPencil /> },
  ];

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Admin>
        <Dashboard>
          <div className=" container mx-auto px-2 py-3">
            <h1 className=" md:text-[56px] text-5xl font-bold ">Dashboard</h1>
            <div className="py-4">
              <div className="grid grid-cols-4 place-items-start py-8">
                {cards.map((card, i) => (
                  <div
                    className="flex justify-between items-center text-md font-semibold capitalize gap-x-5"
                    key={i}
                  >
                    <span className="text-5xl">{card.icon}</span>
                    <div className="card">
                      <p>{card.title}</p>
                      <h3 className="text-2xl font-bold">{card.count}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 flex flex-col justify-between items-start">
                  <h1 className="text-xl font-semibold">Visitor Static</h1>
                  <LineChart />
                </div>
                <div className="flex flex-col pt-9">
                  <div className="flex justify-between items-start pb-6">
                    <h1 className="text-xl font-semibold">Categories</h1>
                    <div className="grid grid-cols-2 place-items-center gap-x-5">
                      <div className="flex justify-between items-center gap-x-3 text-green-600">
                        <BsArrowUp />
                        growth
                      </div>
                      <div className="flex justify-between items-center gap-x-3 text-red-600">
                        <BsArrowDown /> reception
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <div className="flex justify-between items-center">
                      <h1 className="text-md font-semibold">Development</h1>
                      <div className="flex justify-between items-center text-green-600 gap-x-5">
                        <BsArrowUp />
                        1.2k
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-md font-semibold">Games</h1>
                      <div className="flex justify-between items-center text-red-600 gap-x-5">
                        <BsArrowDown />
                        2.2k
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 pt-7 gap-8 ">
                <div className="col-span-2 flex flex-col justify-between items-start">
                  <h1 className="text-xl font-semibold pb-4">
                    Latest Articles
                  </h1>
                  <TableBlog />
                </div>
                <div className="flex flex-col pt-9">
                  <div className="flex justify-between items-start pb-6 ">
                    <h1 className="text-xl font-semibold">Articles</h1>
                    <div className="grid grid-cols-2 place-items-center gap-5">
                      <div className="flex justify-between items-center gap-x-3 text-green-600">
                        <BsArrowUp />
                        growth
                      </div>
                      <div className="flex justify-between items-center gap-x-3 text-red-600">
                        <BsArrowDown /> reception
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <div className="flex justify-between items-center">
                      <h1 className="text-md font-semibold">Development</h1>
                      <div className="flex justify-between items-center text-green-600 gap-x-5">
                        <BsArrowUp />
                        1.2k
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-md font-semibold">Games</h1>
                      <div className="flex justify-between items-center text-red-600 gap-x-5">
                        <BsArrowDown />
                        2.2k
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dashboard>
      </Admin>
    </>
  );
};

export default index;
