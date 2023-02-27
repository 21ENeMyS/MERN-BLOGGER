import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { getCookie } from "../../../actions/auth";
import { readCategory, removeCategory } from "../../../actions/category";
import moment from "moment";
import Link from "next/link";

const ReadAndDelete = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [values, setValues] = useState({
    categories: [],
    removed: false,
    reload: false,
    success: "",
    error: "",
  });

  const { categories, removed, reload, success, error } = values;
  const token = getCookie("token");

  useEffect(() => {
    process.browser && setIsBrowser(true);
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    readCategory().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const removedCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      setValues({ ...values, error: true, success: true });
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: true,
          error: false,
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      `Are you sure you want to delete Category ${slug}`
    );

    answer && removedCategory(slug);
  };

  const showSuccess = () => {
    return (
      success && (
        <div className="py-4 px-4 text-white bg-green-600">
          Category has been deleted
        </div>
      )
    );
  };

  const showError = () => {
    return (
      error && (
        <div className="py-4 px-4 text-white bg-red-600">
          Something wrong,please check your connection network
        </div>
      )
    );
  };

  const hiddenStatus = () => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  return (
    <div onMouseMove={hiddenStatus}>
      <div className="py-4 text-lg">{error ? showError() : showSuccess()}</div>
      <div className="overflow-hidden">
        <table className="w-full text-center">
          <thead className="border-b bg-black">
            <tr>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-6 py-4"
              >
                Date
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-6 py-4"
              >
                Name
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-6 py-4"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {isBrowser &&
              categories.map((c, i) => (
                <tr className=" border-b" key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {moment(c.updatedAt).format("LLLL")}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/category/${c.slug}`}>
                      <a className="capitalize ">{c.name}</a>
                    </Link>
                  </td>
                  <td className="px-6 py-4 grid place-items-center">
                    <button
                      className="flex py-2 px-4 bg-red-600 text-white justify-center rounded items-center gap-x-3"
                      onClick={() => deleteConfirm(c.slug)}
                    >
                      <FaTrashAlt />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadAndDelete;
