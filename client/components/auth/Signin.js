import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { authenticate, isAuth, signin } from "../../actions/auth";

const Signin = () => {
  const [open, setOpen] = useState(false);
  const [textEmail, setTextEmail] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    message: "",
    loading: false,
    showForm: true,
  });

  const { email, password, message, error, loading, showForm } = values;

  // Handle eye password
  const eyePassword = () => {
    setOpen(!open);
  };

  const emailUser = () => {
    setTextEmail(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    signin(user).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          loading: false,
          error: data.error,
          email: "",
          password: "",
        });
      } else {
        authenticate(data, () => {
          isAuth() && isAuth().role !== 1
            ? Router.push("/")
            : Router.push(`/admin/dashboard`);
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => {};

  const showError = () =>
    error ? (
      <div className="py-2 px-4 bg-red-600 text-white">
        Email or Password do not match
      </div>
    ) : (
      ""
    );

  const showSuccess = () => {};

  const showFormSignin = () => {
    return (
      <form
        onSubmit={handleSubmit}
        className="container mx-auto flex items-center justify-center flex-col p-8 lg:text-black text-white absolute z-50 lg:relative lg:z-0"
      >
        <h1 className="text-5xl font-bold roboto text-center mb-8">Login</h1>
        <div
          className={
            error
              ? "my-4 w-full font-semibold py-2 px-4 bg-red-600 text-white transition-all"
              : ""
          }
        >
          {showError()}
        </div>
        <div className="relative w-full my-8">
          <input
            type={textEmail === true ? "text" : "email"}
            autoComplete="off"
            id="email"
            value={email}
            onChange={handleChange("email")}
            onClick={emailUser}
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
          {/* <span className="mt-2 invisible peer-invalid:visible text-red-600 text-sm">
          8 Characters please
        </span> */}

          <div className="absolute top-2 text-xl right-4">
            {open === false ? (
              <IoEye onClick={eyePassword} />
            ) : (
              <IoEyeOff onClick={eyePassword} />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center w-full pb-3 font-semibold">
          {/* <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className="px-3">
              Remember me
            </label>
          </div> */}
          <Link href="/forgot-password">
            <a className="underline underline-offset-4 ">Forgot password</a>
          </Link>
        </div>
        <button
          type="submit"
          className="py-3 px-2 bg-white text-black lg:bg-black lg:text-white mt-4 w-2/3 text-center"
        >
          Login
        </button>
        <span className="py-8">
          {" "}
          Don't have a account ?{" "}
          <Link href={"/register"}>
            <a className="underline underline-offset-4">Register</a>
          </Link>
        </span>
      </form>
    );
  };

  return <>{showForm && showFormSignin()}</>;
};

export default Signin;
