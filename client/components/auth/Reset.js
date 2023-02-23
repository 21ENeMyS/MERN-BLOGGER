import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { resetPassword } from "../../actions/auth";

const Reset = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    newPassword: "",
    message: "",
    name: "",
    error: "",
    button: false,
    showForm: true,
  });

  const { newPassword, message, name, error, showForm, button } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({ newPassword, resetPasswordLink: router.query.id }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, newPassword: "" });
        } else {
          setValues({
            ...values,
            newPassword: "",
            message: data.message,
            error: false,
            showForm: false,
            button: true,
          });
        }
      }
    );
  };

  const handleChange = (e) => {
    setValues({ ...values, newPassword: e.target.value });
  };

  const eyePassword = () => {
    setOpen(!open);
  };

  const showError = () =>
    error ? <div className="py-2 px-4 bg-red-500 text-white">{error}</div> : "";

  const showMessage = () =>
    message ? (
      <div className="py-2 px-4 bg-green-500 text-white">{message}</div>
    ) : (
      ""
    );

  const showButton = () =>
    button ? (
      <Link href="/login">
        <a className="py-2 px-4 bg-black text-white text-center">Login</a>
      </Link>
    ) : (
      " "
    );

  return (
    <>
      {showError()}
      {showMessage()}

      {showForm && (
        <form
          className="container mx-auto absolute roboto"
          onSubmit={handleSubmit}
        >
          <div className="relative my-5 w-full">
            <input
              type={open === false ? "password" : "text"}
              autoComplete="off"
              onChange={handleChange}
              value={newPassword}
              id="password"
              required
              className="border-b py-1 focus:outline-none focus:border-white lg:focus:border-black focus:border-b-2 peer transition-colors w-1/2 bg-transparent"
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

            <div className="absolute top-2 text-xl left-1/2">
              {open === false ? (
                <IoEye onClick={eyePassword} />
              ) : (
                <IoEyeOff onClick={eyePassword} />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="py-3 px-4 bg-white text-black lg:bg-black lg:text-white mt-4  text-center"
          >
            Change Password
          </button>
        </form>
      )}
      <div className="py-4">{showButton()}</div>
    </>
  );
};

export default Reset;
