import React from "react";
import BlogItem from "./BlogItem";
import { useLocation, NavLink } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../../contexts/blogs.context";

const Categories = () => {
  const location = useLocation();
  const { blogs, setBlogs } = useContext(BlogContext);
  const filteredBlog = blogs.filter((item) => {
    if (item.categoryID == location.state) {
      return item;
    }
  });
  return (
    <>
      <section className='text-gray-600 body-font overflow-hidden'>
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

export default Categories;
