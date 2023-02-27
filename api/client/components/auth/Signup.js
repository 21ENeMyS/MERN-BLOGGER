import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { isAuth, preSignup } from "../../actions/auth";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [textEmail, setTextEmail] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  // Handle eye password
  const eyePassword = () => {
    setOpen(!open);
  };

  const emailUser = () => {
    setTextEmail(true);
  };

  const { name, email, error, password, loading, showForm, message } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false, showForm: false });
    const user = { name, email, password };
    preSignup(user).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          name: "",
          email: "",
          password: "",
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => {};

  const showMessage = () =>
    message ? (
      <div className="py-5 px-3 text-white lg:bg-black bg-green-500">
        {message}
      </div>
    ) : (
      ""
    );

  const showError = () => (
    <div
      className="py-2 px-4 bg-red-600 text-white font-semibold"
      style={{ display: error ? "" : "none" }}
    >
      Account already Exist
    </div>
  );

  // const showErrorForm = () => {
  //   formError ? (
  //     <span className="mt-2 invisible peer-invalid:visible text-red-600 text-sm">
  //       8 Characters please
  //     </span>
  //   ) : (
  //     ""
  //   );
  // };

  const formSubmit = () => (
    <form
      className="container mx-auto flex items-center justify-center flex-col p-8 lg:text-black text-white absolute z-50 lg:relative lg:z-0"
      onSubmit={handleSubmit}
    >
      <h1 className="text-5xl font-bold roboto text-center mb-8">Register</h1>

      <div className="relative w-full my-8">
        <input
          type="text"
          autoComplete="off"
          id=""
          value={name}
          onChange={handleChange("name")}
          required
          className="border-b py-1 focus:outline-none focus:border-white lg:focus:border-black focus:border-b-2 peer transition-colors w-full bg-transparent "
        />
        <label
          htmlFor=""
          className="absolute top-1 left-0 cursor-text peer-focus:text-xs peer-focus:-top-5 transition-all peer-valid:-top-5 peer-valid:text-xs"
        >
          Name
        </label>
      </div>
      <div className="relative w-full my-8">
        <input
          type={textEmail === true ? "text" : "email"}
          autoComplete="off"
          id="email"
          onClick={emailUser}
          value={email}
          onChange={handleChange("email")}
          required
          className="border-b py-1 focus:outline-none focus:border-white lg:focus:border-black focus:border-b-2 peer transition-colors w-full bg-transparent "
        />
        <label
          htmlFor=""
          className="absolute top-1 left-0 cursor-text peer-focus:text-xs peer-focus:-top-5 transition-all peer-valid:-top-5 peer-valid:text-xs"
        >
          Email
        </label>
      </div>
      <div className="relative my-5 w-full">
        <input
          type={open === false ? "password" : "text"}
          autoComplete="off"
          id="password"
          value={password}
          onChange={handleChange("password")}
          required
          className="border-b py-1 focus:outline-none focus:border-white lg:focus:border-black focus:border-b-2 peer transition-colors w-full bg-transparent"
        />
        <label
          htmlFor=""
          className="absolute top-1 left-0 cursor-text peer-focus:text-xs peer-focus:-top-5 transition-all peer-valid:-top-5 peer-valid:text-xs"
        >
          Password
        </label>
        {/* {showErrorForm()} */}

        <div className="absolute top-2 text-xl right-4">
          {open === false ? (
            <IoEye onClick={eyePassword} />
          ) : (
            <IoEyeOff onClick={eyePassword} />
          )}
        </div>
      </div>
      {/* <div className="relative my-5 w-full">
        <input
          type={open === false ? "password" : "text"}
          autoComplete="off"
          id="password"
          required
          className="border-b py-1 focus:outline-none focus:border-white lg:focus:border-black focus:border-b-2 peer transition-colors w-full bg-transparent"
        />
        <label
          htmlFor=""
          className="absolute top-1 left-0 cursor-text peer-focus:text-xs peer-focus:-top-5 transition-all peer-valid:-top-5 peer-valid:text-xs"
        >
          Verify Password
        </label>
        <span className="mt-2 invisible peer-invalid:visible text-red-600 text-sm">
          8 Characters please
        </span>

        <div className="absolute top-2 text-xl right-4">
          {open === false ? (
            <IoEye onClick={eyePassword} />
          ) : (
            <IoEyeOff onClick={eyePassword} />
          )}
        </div>
      </div> */}
      <button
        type="submit"
        className="py-3 px-2 bg-white text-black lg:bg-black lg:text-white mt-4 w-2/3 text-center"
      >
        Register
      </button>
    </form>
  );

  return (
    <>
      {error ? (
        <div className="my-4 w-full font-semibold py-2 px-4 bg-red-600 text-white transition-all">
          {showError()}
        </div>
      ) : (
        ""
      )}
      <div className="z-10 absolute">{message && showMessage()}</div>
      {showForm && formSubmit()}
    </>
  );
};

export default Signup;
