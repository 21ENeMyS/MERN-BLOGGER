import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const TableBlog = () => {
  const contents = [
    {
      time: "21 sept 2018",
      src: "https://source.unsplash.com/1920x1080/?wallpaper",
      title: "or randomised words which don't look even slightly believable.",
      category: "Wallpaper",
    },
    {
      time: "01 May 2022",
      src: "https://source.unsplash.com/1920x1080/?nature",
      title:
        "a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
      category: "Nature",
    },
    {
      time: "21 Jan 2020",
      src: "https://source.unsplash.com/1920x1080/?girls",
      title:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      category: "Human",
    },
    {
      time: "22 Aug 2019",
      src: "https://source.unsplash.com/1920x1080/?game",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      category: "Game",
    },
    {
      time: "21 sept 2021",
      src: "https://source.unsplash.com/1920x1080/?art",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      category: "arts",
    },
  ];

  return (
    <div style={{ maxHeight: "260px", overflowY: "scroll" }}>
      <table className="text-center ">
        <thead className="bg-black sticky top-0">
          <tr className="text-sm h-[50px] font-semibold text-white px-6 py-4 capitalize">
            <th scope="col">Date Time</th>
            <th scope="col">Cover</th>
            <th scope="col">title</th>
            <th scope="col">Categories</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content, i) => (
            <tr className="border-b" key={i}>
              <td className="px-6 py-4  text-sm font-semibold text-gray-900">
                {content.time}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <img
                  src={content.src}
                  alt=""
                  className="w-[95px] h-[85px] object-cover object-center bg-no-repeat"
                />
              </td>
              <td className="text-sm w-[35%] text-gray-900 font-light px-6 py-4">
                {content.title}
              </td>
              <td className="text-sm text-gray-900 capitalize font-light px-6 py-4 ">
                {content.category}
              </td>
              <td className="text-sm text-gray-900 capitalize font-light px-6 py-4 ">
                <button className="flex py-2 px-4 bg-red-600 text-white justify-center rounded items-center gap-x-3">
                  <FaTrashAlt />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBlog;
