import React from "react";
import BlogItem from "./BlogItem";
import { useLocation, NavLink } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../../contexts/blogs.context";
import { AuthorsContext } from "../../contexts/authors.context";

const Author = () => {
  const location = useLocation();
  const { blogs, setBlogs } = useContext(BlogContext);
  const { authors, setAuthors } = useContext(AuthorsContext);
  const curAuthor = authors.find((element) => element.ID == location.state);
  const filteredBlog = blogs.filter((item) => {
    if (item.userId == location.state) {
      return item;
    }
  });
  return (
    <>
      <section className='text-gray-600 body-font overflow-hidden'>
        <section className='text-gray-600 body-font'>
          <div className='sm:w-full text-center sm:pr-8 sm:py-8'>
            <div className='inline-flex items-center justify-center'>
              <img
                alt={curAuthor.DP}
                src={`users/${curAuthor.DP ? curAuthor.DP : "placeholder.png"}`}
                className='w-56 h-56 rounded-full flex-shrink-0 object-cover object-center'
              />
            </div>
            <div className='flex flex-col items-center text-center justify-center'>
              <h2 className='font-medium title-font mt-4 text-gray-900 text-lg'>
                {curAuthor.Name}
              </h2>
              <div className='w-12 h-1 bg-indigo-500 rounded mt-2 mb-4' />
              <p className='text-base'>{curAuthor.BIO}</p>
            </div>
          </div>
        </section>

        <div className='container px-5 py-24 mx-auto'>
          <h1>{filteredBlog.length} Blogs Found</h1>
          <div className='flex flex-wrap -m-12'>
            {filteredBlog.map((item) => {
              // console.log(item);
              return (
                <>
                  <BlogItem blog={item}></BlogItem>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Author;
