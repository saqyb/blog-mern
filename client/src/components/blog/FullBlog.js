import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BlogContext } from "../../contexts/blogs.context";
import { CategoriesContext } from "../../contexts/categories.context";
import { AuthorsContext } from "../../contexts/authors.context";
import { userContext } from "../../contexts/user.context";
const FullBlog = () => {
  const location = useLocation();
  const { blogs, setBlogs } = useContext(BlogContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { authors, setAuthors } = useContext(AuthorsContext);
  const { currentUser, setCurrentUser } = useContext(userContext);

  const currentBlog = blogs.find((item) => item.id == location.state);
  const currentAuthor = authors.find((item) => item.ID == currentBlog.userId);

  console.log("🚀 ~ file: FullBlog.js ~ line 17 ~ FullBlog ~ state");
  console.log(location.state);

  console.log("🚀 ~ file: FullBlog.js ~ line 20 ~ FullBlog ~ currentBlog");
  console.log(currentBlog);
  return (
    <>
      <div className='p-12 md:w-full flex flex-col items-start'>
        <img
          src={`../../uploads/${currentBlog.image}`}
          alt={currentBlog.image}
          width='100%'
        />
        <h2 className='sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4'>
          {currentBlog.title}
        </h2>
        <NavLink to={"/author"} state={currentAuthor.ID}>
          <a className='inline-flex items-center'>
            <img
              alt={currentAuthor.DP}
              src={`users/${
                currentAuthor.DP ? currentAuthor.DP : "placeholder.png"
              }`}
              className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
            />
            <span className='flex-grow flex flex-col pl-4'>
              <span className='title-font font-medium text-gray-900'>
                {currentAuthor.Name}
              </span>
              <span className='text-gray-400 text-xs tracking-widest mt-0.5'>
                {currentAuthor.BIO}
              </span>
            </span>
          </a>
        </NavLink>
        {/* <h3 className='text-xl text-gray-600'>Author: {currentAuthor.Name}</h3> */}
        <p className='leading-relaxed mb-8'>{currentBlog.body}</p>
        <br />
      </div>
    </>
  );
};

export default FullBlog;
