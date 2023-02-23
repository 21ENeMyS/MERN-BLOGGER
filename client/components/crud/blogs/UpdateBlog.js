import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Quillmodules, Quillformats } from "../../../helpers/quill";
import { readCategory } from "../../../actions/category";
import { getCookie, isAuth } from "../../../actions/auth";
import { readOne, updated } from "../../../actions/blog";
import { useRouter } from "next/router";
import { API } from "../../../config";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateBlog = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [body, setBody] = useState("");
  const [values, setValues] = useState({
    title: "",
    error: "",
    success: "",
    formData: "",
    body: "",
  });

  const { error, success, title, formData } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    loadBlog();
    loadCategories();
  }, [router]);

  const loadBlog = () => {
    if (router.query.slug) {
      readOne(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoryArray(data.categories);
        }
      });
    }
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
  };

  const loadCategories = () => {
    readCategory().then((data) => {
      data.error
        ? setValues({ ...values, error: data.error })
        : setCategories(data);
    });
  };

  const handleToggleCategory = (c) => () => {
    setValues({ ...values, error: "" });
    const clickedCategory = selected.indexOf(c);
    const all = [...selected];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    // console.log(all);
    setSelected(all);
    formData.set("categories", all);
  };

  const findOutCategory = (c) => {
    const result = selected.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const setCategoryArray = (blogCategories) => {
    let ca = [];
    blogCategories.map((c, i) => ca.push(c._id));
    setSelected(ca);
  };

  const updateBloging = (e) => {
    e.preventDefault();
    updated(formData, token, router.query.slug).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          success: `Blog ${data.title} is successfully updated `,
        });
        router.push("/admin/dashboard/post");
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const showError = () => (
    <div
      className="py-1 px-3 bg-red-500 text-center text-white"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="py-1 px-3 bg-green-500 text-center text-white"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const selectCategories = () => {
    return (
      <div className="form-control">
        <div className="sticky top-0 py-4 form-control">
          <h5 className="text-md font-bold pb-2 ">Category</h5>
          <hr />
        </div>
        <ul
          className="form-control"
          style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
          {categories.map((c, i) => (
            <li key={i} className="list-unstyled py-1 border-b border-gray">
              <input
                onChange={handleToggleCategory(c._id)}
                type="checkbox"
                checked={findOutCategory(c._id)}
                className="mr-2"
              />
              <label className="form-check-label">{c.name}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const updateFormBlog = () => (
    <form className="w-full" onSubmit={updateBloging}>
      <div className="form-group">
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
          value={body}
          onChange={handleBody}
          placeholder="Write something amazing"
        />
      </div>

      <button className="my-2 py-2 text-md px-14 bg-black flex-wrap text-white rounded">
        Update blog
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

  return (
    <>
      {showError()}
      {showSuccess()}
      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-3">{updateFormBlog()}</div>
        <div className="col-span-1 pt-5">
          {photoBlog()}
          {body && (
            <Image
              src={`${API}/blog/photo/${router.query.slug}`}
              width={1290}
              height={1080}
              className="w-full h-[327px] object-cover object-center bg-no-repeat"
            />
          )}
          {selectCategories()}
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
