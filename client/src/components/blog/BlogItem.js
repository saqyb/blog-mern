import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Categories from "../../categories.api";
import Authors from "../../authors.api";
import { userContext } from "../../contexts/user.context";
import { AuthorsContext } from "../../contexts/authors.context";
// import image from `../../../public/uploads/${props.blog.image}`

const BlogItem = (props) => {
  const { authors, setAuthors } = useContext(AuthorsContext);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const CatID = props.blog.categoryID;
  const AuthID = props.blog.userId;
  // const image = require(`../../../public/uploads/${props.blog.image}`);
  const Category = Categories.find((item) => {
    if (CatID == item.ID) {
      return item;
    }
  });

  const Author = authors.find((item) => {
    if (AuthID == item.ID) {
      return item;
    }
  });

  const editBtn = () => {
    if (currentUser) {
      // const bool = props.blog.userId == currentUser.ID;
      // console.log(bool)
      if (props.blog.userId == currentUser.ID) {
        // console.log("🚀 ~ file: BlogItem.js ~ line 31 ~ editBtn ~ bool", bool);

        return (
          <>
            <NavLink to={"/editPost"} state={props.blog}>
              <button
                type='button'
                className='inline my-3 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              >
                Edit
              </button>
            </NavLink>
          </>
        );
      }
    }
  };

  return (
    <>
      <div className='flex p-12'>
        <div className='w-4/12 mr-5'>
          {/* {console.log(image)} */}
          <img
            src={`uploads/${props.blog.image}`}
            alt={props.blog.image}
            width='100%'
          />
        </div>
        <div className='w-8/12 flex flex-col items-start'>
          <span className='inline py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest'>
            {Category.title}
          </span>
          {editBtn()}

          <NavLink to={"/post"} state={props.blog}>
            <h2 className='sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4'>
              {props.blog.title}
            </h2>
          </NavLink>

          {/* <p className='leading-relaxed mb-8'>{props.blog.body}</p> */}
          <div className='flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full'>
            {/* <NavLink to={"/post"} state={props.blog}>
            <button className='text-indigo-500 inline-flex items-center'>
              Learn More
            </button>
          </NavLink> */}
            <NavLink to={"/author"} state={Author.ID}>
              <a className='inline-flex items-center'>
                <img
                  alt={Author.DP}
                  src={`users/${Author.DP ? Author.DP : "placeholder.png"}`}
                  className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                />
                <span className='flex-grow flex flex-col pl-4'>
                  <span className='title-font font-medium text-gray-900'>
                    {Author.Name}
                  </span>
                  <span className='text-gray-400 text-xs tracking-widest mt-0.5'>
                    {Author.BIO}
                  </span>
                </span>
              </a>
            </NavLink>
            <span className='text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200'>
              <svg
                className='w-4 h-4 mr-1'
                stroke='currentColor'
                stroke-width='2'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
                viewBox='0 0 24 24'
              >
                <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                <circle cx='12' cy='12' r='3'></circle>
              </svg>
              1.2K
            </span>
            <span className='text-gray-400 inline-flex items-center leading-none text-sm'>
              <svg
                className='w-4 h-4 mr-1'
                stroke='currentColor'
                stroke-width='2'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
                viewBox='0 0 24 24'
              >
                <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
              </svg>
              6
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
