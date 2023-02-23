import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";

export const preSignup = (user) => {
  return fetch(`${API}/pre-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setCookie = (key, value) => {
  process.browser && cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key) => {
  process.browser && cookie.remove(key, { expires: 1 });
};

export const getCookie = (key) => {
  return process.browser && cookie.get(key);
};

export const setLocalStorage = (key, value) => {
  return process.browser && localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  process.browser && localStorage.removeItem(key);
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser && getCookie("token")) {
    const user = localStorage.getItem("user");
    return user && JSON.parse(user);
  } else {
    return false;
  }
};

export const update = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));
      auth = user;
      localStorage.setItem("user", JSON.stringify(auth));
      next();
    }
  }
};

export const forgotPassword = (email) => {
  return fetch(`${API}/forgot-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const resetPassword = (resetInfo) => {
  return fetch(`${API}/reset-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(resetInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
