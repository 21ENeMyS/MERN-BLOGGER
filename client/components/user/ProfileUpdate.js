import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Quillmodules, Quillformats } from "../../helpers/quill";
import { API } from "../../config";
import Image from "next/image";
import { getCookie, update } from "../../actions/auth";
import { readUser, userUpdate } from "../../actions/user";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useRouter } from "next/router";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProfileUpdate = () => {
  // const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    name: "",
    username: "",
    about: "",
    // password: "",
    email: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: "",
  });

  const {
    name,
    username,
    about,
    email,
    error,
    // password,
    success,
    loading,
    photo,
    userData,
  } = values;
  const token = getCookie("token");

  // const eyePassword = () => {
  //   setOpen(!open);
  // };

  const initUser = () => {
    readUser(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          // password: data.password,
          email: data.email,
          about: data.about || " ",
        });
      }
    });
  };

  useEffect(() => {
    initUser();
  }, []);

  const updateSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, success: false, error: false });
    userUpdate(userData, token).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ error: data.error, success: false, loading: false });
      } else {
        update(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            // password: data.password,
            email: data.email,
            about: data.about,
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    const userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };

  const showSuccess = () => {
    return (
      <div
        className="py-2 px-4 bg-green-600 text-white"
        style={{ display: success ? "" : "none" }}
      >
        Profile Update
      </div>
    );
  };
  const showError = () => {
    return (
      <div
        className="py-2 px-4 bg-red-600 text-white"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const updateFormBlog = () => (
    <form className="w-full" onSubmit={updateSubmit}>
      {showError()}
      {showSuccess()}
      {photoBlog()}
      <div className="form-group">
        <label htmlFor="">Name</label>
        <input
          type="text"
          className="form-control "
          placeholder="Name"
          onChange={handleChange("name")}
          required
          value={name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          onChange={handleChange("username")}
          value={username}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Email</label>
        <input
          type="email"
          className="form-control "
          placeholder="email@blogger.com"
          onChange={handleChange("email")}
          value={email}
          required
        />
      </div>
      {/* <div className="form-group">
        <label htmlFor="">Password</label>
        <input
          type={open === false ? "password" : "text"}
          className="form-control "
          onChange={handleChange("password")}
          value={password}
        />
        <div className="absolute text-xl">
          {open === false ? (
            <IoEye onClick={eyePassword} />
          ) : (
            <IoEyeOff onClick={eyePassword} />
          )}
        </div>
      </div> */}

      <div className="form-group ">
        <label htmlFor="">About</label>
        <textarea
          cols="30"
          rows="10"
          type="text"
          value={about}
          onChange={handleChange("about")}
          placeholder="Write something amazing about you"
          className="form-control"
        />
      </div>

      <button className="my-2 py-2 text-md px-14 bg-black flex-wrap text-white rounded">
        Update user
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
      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-3">{updateFormBlog()}</div>
        <div className="col-span-1 pt-5">
          <Image
            src={`${API}/user/photo/${username}`}
            width={1290}
            height={1080}
            className="w-full h-[327px] object-cover object-center bg-no-repeat"
          />
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
