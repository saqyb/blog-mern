import React from "react";
import { useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../../contexts/blogs.context";
import { CategoriesContext } from "../../contexts/categories.context";
import axios from "axios";

const EditBlog = () => {
  const { blogs, setBlogs } = useContext(BlogContext);
  const { categories, setCategories } = useContext(CategoriesContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(location.state);

  const [image, setImage] = useState(blog.image);
  const changeImage = (e) => {
    console.log("Change Image");
    const name = e.target.files[0];
    // console.log(e.target.files[0].name);
    // console.log(name);
    setImage(name);
    // console.log(image);
  };

  const updateBlogApi = async () => {
    const formData = new FormData();
    formData.append("userId", blog.userId);
    formData.append("id", blog.id);
    formData.append("categoryID", blog.categoryID);
    formData.append("title", blog.title);
    formData.append("body", blog.body);
    formData.append("image", image);

    console.log("POST BLOG");
    axios
      .patch("/blogs", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    // const { userId, id, categoryID, title, body } = blog;

    // try {
    //   const res = await fetch("/blogs", {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       userId,
    //       id,
    //       categoryID,
    //       title,
    //       body,
    //     }),
    //   });

    //   const data = await res.json();
    //   if (res.status === 200) {
    //     setBlogs(data);
    //     // console.log(data);
    //   } else {
    //     console.log("Failed to Update Blog");
    //   }
    //   console.log("status code: ", res.status); // 200
    //   if (!res.ok) {
    //     console.log(res);
    //     throw new Error(`Error! status: ${res.status}`);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const saveBlog = (e) => {
    e.preventDefault();
    const tempBlog = blogs.find((x) => x.id == blog.id);
    const index = blogs.indexOf(tempBlog);
    blogs[index] = blog;
    updateBlogApi();
    navigate("/");
  };

  const deleteBlogApi = async () => {
    const { id } = blog;
    try {
      const res = await fetch("/blogs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
      } else {
        console.log("Failed to Update Blog");
      }
      console.log("status code: ", res.status); // 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = (e) => {
    e.preventDefault();
    const tempBlog = blogs.find((x) => x.id == blog.id);
    const index = blogs.indexOf(tempBlog);
    const tempArr = [...blogs];
    tempArr.splice(index, 1);
    setBlogs([...tempArr]);
    deleteBlogApi();
    navigate("/");
  };
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };
  return (
    <>
      <form encType='multipart/form-data'>
        <section className='text-gray-600 body-font relative'>
          <div className='mt-10 bg-white p-8 flex flex-col'>
            <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>
              Edit Blog
            </h2>
            <div className='relative mb-4'>
              <label
                htmlFor='email'
                className='leading-7 text-sm text-gray-600'
              >
                Title
              </label>
              <input
                value={blog.title}
                onChange={handleInput}
                type='text'
                id='title'
                name='title'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <select
                onChange={handleInput}
                id='countries'
                name='categoryID'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option defaultValue value={null}>
                  Select Category
                </option>
                {categories.map((item) => {
                  // console.log(item.title);
                  return (
                    <>
                      <option value={item.ID}>{item.title}</option>;
                    </>
                  );
                })}
              </select>
            </div>
            <div className='flex text-sm text-gray-600 relative mb-4'>
              <label
                htmlFor='file-upload'
                class='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span>Upload a file</span>
                <input
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  className='sr-only'
                  // value={blog.image}
                  onChange={changeImage}
                  // value={image}
                />
              </label>
            </div>
            <img src={`uploads/${image}`} alt={image} className='w-64' />
            <div className='relative mb-4'>
              <label
                htmlFor='message'
                className='leading-7 text-sm text-gray-600'
              >
                Body
              </label>
              <textarea
                value={blog.body}
                onChange={handleInput}
                id='body'
                name='body'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
              ></textarea>
            </div>
            <button
              onClick={saveBlog}
              className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
            >
              Save
            </button>
            <button
              onClick={deleteBlog}
              type='button'
              class='mt-5 text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 rounded text-lg'
            >
              Delete Blog
            </button>
          </div>
        </section>
      </form>
    </>
  );
};

export default EditBlog;
