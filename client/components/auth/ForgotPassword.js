import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { forgotPassword } from "../../actions/auth";

const ForgotPassword = () => {
  const [textEmail, setTextEmail] = useState(false);
  const [values, setValues] = useState({
    email: "",
    error: "",
    message: "",
    showForm: true,
  });

  const { email, error, message, showForm } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, error: "", message: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    forgotPassword({ email }).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: "",
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error ? <div className="py-2 px-4 bg-red-500 text-white">{error}</div> : "";

  const showMessage = () =>
    message ? (
      <div className="py-2 px-4 bg-green-500 text-white">
        An email password reset link has been sent to your email.Check your
        email and click on the link to processed!
      </div>
    ) : (
      ""
    );

  return (
    <>
      {showMessage()}
      {showError()}

      {showForm && (
        <form className="container mx-auto absolute" onSubmit={handleSubmit}>
          <div className="relative my-8 w-full">
            <input
              type={textEmail === true ? "text" : "email"}
              autoComplete="off"
              id="email"
              onChange={handleChange("email")}
              value={email}
              required
              className="border-b py-1 focus:outline-none focus:border-white lg:focus:border-black focus:border-b-2 peer transition-colors w-1/2  bg-transparent"
            />
            <label
              htmlFor=""
              className="absolute top-1 left-0 cursor-text peer-focus:text-xs peer-focus:-top-5 transition-all peer-valid:-top-5 peer-valid:text-xs"
            >
              Email
            </label>
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-white text-black lg:bg-black lg:text-white mt-4 text-center"
          >
            reset password
          </button>
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
