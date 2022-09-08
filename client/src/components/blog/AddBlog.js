import React from "react";
import { useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../../contexts/blogs.context";
import { CategoriesContext } from "../../contexts/categories.context";
import { userContext } from "../../contexts/user.context";
import * as uuid from "uuid";
import axios from "axios";

const AddBlog = () => {
  const { blogs, setBlogs } = useContext(BlogContext);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(categories);
  const [blog, setBlog] = useState({
    userId: currentUser.ID,
    id: uuid.v4(),
    categoryID: null,
    title: null,
    body: null,
    // Image: null,
  });

  const [image, setImage] = useState("");

  const changeImage = (e) => {
    console.log("Change Image");
    const name = e.target.files[0];
    // console.log(e.target.files[0].name);
    // console.log(name);
    setImage(name);
    // console.log(image);
  };

  // const formData=new FormData

  const PostBlog = async () => {
    const formData = new FormData();
    formData.append("userId", blog.userId);
    formData.append("id", blog.id);
    formData.append("categoryID", blog.categoryID);
    formData.append("title", blog.title);
    formData.append("body", blog.body);
    formData.append("image", image);

    console.log("POST BLOG");
    axios
      .post("/blogs", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    // e.preventDefault();
    // const { userId, id, categoryID, title, body } = blog;
    // const res = await fetch("/blogs", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userId,
    //     id,
    //     categoryID,
    //     title,
    //     body,
    //   }),
    // });
    // const data = await res.json();
    // if (res.status === 422 || !data) {
    //   console.log("Failed to Post Blog");
    // } else {
    //   console.log(res.status);
    //   console.log("Blog Posted Successfully");
    //   navigate("/");
    // }
    // navigate("/");
  };

  const saveBlog = (e) => {
    e.preventDefault();
    // setBlog({ ...blog, id: uuid.v4(), userId: 1, categoryID: 2 });
    // console.log(blog);
    PostBlog();
    setBlogs([blog, ...blogs]);
    navigate("/");
  };

  // const addTodo = (item) => {
  //   const todo = { id: uuid.v4(), todo: item };
  //   PostData(todo);
  //   setTodoArr([todo, ...todoArr]);
  // };

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBlog({ ...blog, [name]: value });
    // console.log(blog);
  };

  return (
    <>
      <section className='text-gray-600 pt-20 body-font relative'>
        <div className='bg-white p-8 flex flex-col'>
          <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>
            Add New Post
          </h2>
          <form encType='multipart/form-data'>
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
              <label
                htmlFor='countries'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
              >
                Categories
              </label>
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
                  onChange={changeImage}
                  // value={image}
                />
              </label>
            </div>
            {/* <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p> */}
            {/* </div> */}
            {/* </div> */}
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
              Add Blog
            </button>
            {/* <p className='text-xs text-gray-500 mt-3'>
              Chicharrones blog helvetica normcore iceland tousled brook viral
              artisan.
            </p> */}
          </form>
        </div>
      </section>
    </>
  );
};

export default AddBlog;
