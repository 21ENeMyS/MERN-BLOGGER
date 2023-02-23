import React, { useState } from "react";
import slugify from "slugify";
import { createCategory } from "../../../actions/category";
import { getCookie } from "../../../actions/auth";

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
  });

  const { name, error, success } = values;
  const token = getCookie("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ name }, token).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
        });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      success: false,
      name: e.target.value,
    });
  };

  const showSuccess = () => {
    return (
      success && (
        <div className="py-4 px-4 text-white bg-green-600">
          Category is created
        </div>
      )
    );
  };

  const showError = () => {
    return (
      error && (
        <div className="py-4 px-4 text-white bg-red-600">
          Category already exist
        </div>
      )
    );
  };

  const mouseMoveHandler = () => {
    setValues({ ...values, error: false, success: false, name: "" });
  };

  return (
    <div onMouseMove={mouseMoveHandler}>
      <div className="text-lg">{error ? showError() : showSuccess()}</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="" className="font-semibold">
            Category
          </label>
          <input
            type="text"
            onChange={handleChange}
            value={name}
            className="form-control"
            required
            placeholder="Write Category something amezing"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="write-category-something-amezing"
            readOnly
            value={slugify(name, {
              lower: true,
              strict: true,
            })}
          />
        </div>
        <button
          type="submit"
          className="py-2 px-14 bg-black text-white rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
