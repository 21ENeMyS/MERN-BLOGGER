import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Quillmodules, Quillformats } from "../../../helpers/quill";
import { readCategory } from "../../../actions/category";
import { getCookie } from "../../../actions/auth";
import { createBlog } from "../../../actions/blog";
import { withRouter } from "next/router";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBlog = ({ router }) => {
  const windowAvailable = typeof window !== "undefined";
  const blogForm = () => {
    if (!windowAvailable) {
      return false;
    }
    const blog = localStorage.getItem("blog");
    return blog ? JSON.parse(blog) : false;
  };

  const [body, setBody] = useState(blogForm());
  const [List, setList] = useState(false);
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const { error, sizeError, success, formData, title, hidePublishButton } =
    values;

  const token = getCookie("token");

  const showCategories = () => {
    readCategory().then((data) => {
      data.error
        ? setValues({ ...values, error: data.error })
        : setCategories(data);
    });
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: "" });
    const selectedCategory = selected.indexOf(c);
    const all = [...selected];
    if (selectedCategory === -1) {
      all.push(c);
    } else {
      all.splice(selectedCategory, 1);
    }
    // console.log(all);
    setSelected(all);
    formData.set("categories", all);
  };

  const selectCategories = () => {
    return (
      <div className="form-control">
        <h3 className="font-bold text-3xl py-2">Categories</h3>
        <div
          className="form-control"
          style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
          {categories &&
            categories.map((c, i) => (
              <li key={i} className="list-none capitalize py-[2px]">
                <input
                  onChange={handleToggle(c._id)}
                  type="checkbox"
                  className="mr-2"
                />
                <label className="form-check-label">{c.name}</label>
              </li>
            ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    showCategories();
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: "A new blog was created",
        });
        setBody("");
        setCategories([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    if (windowAvailable) {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const createFormBlog = () => (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="form-group ">
        <label htmlFor="">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          onChange={handleChange("title")}
          value={title}
          required
        />
      </div>

      <div className="form-group ">
        <ReactQuill
          modules={Quillmodules}
          formats={Quillformats}
          value={body || ""}
          onChange={handleBody}
          placeholder="Write something amazing"
        />
      </div>

      <button className="my-2 py-2 text-md px-32 bg-black flex-wrap text-white rounded">
        Publish
      </button>
    </form>
  );

  const photoBlog = () => (
    <div className="py-4">
      <small className="text-slate-400 py-3">Max size: 1mb</small>
      <div className="from-group py-2">
        <label className="py-2 px-4  cursor-pointer border-black border-2 hover:bg-black hover:text-white rounded">
          Upload feature image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleChange("photo")}
          />
        </label>
      </div>
    </div>
  );

  const showError = () => (
    <div
      className="text-2xl font-semibold bg-red-600 text-white py-2 px-4"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="text-2xl font-semibold bg-green-600 text-white py-2 px-4"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  return (
    <>
      {showSuccess()} {showError()}
      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-3">{createFormBlog()}</div>
        <div className="col-span-1 pt-5">
          {photoBlog()}
          {selectCategories()}
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateBlog);
