import fetch from "isomorphic-fetch";
import { API } from "../config";
import { isAuth } from "./auth";

export const createBlog = (blog, token) => {
  let createBlogEndPoint;
  isAuth() && isAuth().role === 1
    ? (createBlogEndPoint = `blog`)
    : (createBlogEndPoint = `user/blog`);

  return fetch(`${API}/${createBlogEndPoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const listBlogsAndCategories = () => {
//   return fetch(`${API}/blogs-categories`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

export const blogsWithCategories = (skip, limit) => {
  const data = { skip, limit };
  return fetch(`${API}/blogs-categories`, {
    method: "POST",
    headers: {
      application: "application/json",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const readAll = (username) => {
  const listByUser = !!username ? `${API}/${username}/blogs` : `${API}/blogs`;

  return fetch(`${listByUser}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const blogsLimit = () => {
  return fetch(`${API}/blogs/limit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const readOne = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removed = (slug, token) => {
  let deleteBlogEndPoint;
  isAuth() && isAuth().role === 1
    ? (deleteBlogEndPoint = `blog/${slug}`)
    : (deleteBlogEndPoint = `user/blog/${slug}`);
  return fetch(`${API}/${deleteBlogEndPoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updated = (blog, token, slug) => {
  let updateBlogEndPoint;
  isAuth() && isAuth().role === 1
    ? (updateBlogEndPoint = `blog/${slug}`)
    : (updateBlogEndPoint = `user/blog/${slug}`);
  return fetch(`${API}/blog/${slug}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listRelated = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err)
    });
};
