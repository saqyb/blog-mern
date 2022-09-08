import React, { useEffect } from "react";
import BlogItem from "./BlogItem";
import { useContext } from "react";
import { BlogContext } from "../../contexts/blogs.context";
import { AuthorsContext } from "../../contexts/authors.context";

const Blog = () => {
  const { blogs, setBlogs } = useContext(BlogContext);
  const { authors, setAuthors } = useContext(AuthorsContext);

  const getBlogs = async () => {
    try {
      const res = await fetch("/blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        setBlogs(data);
        // console.log(data);
      } else {
        console.log("Failed to fetch Todo");
      }
      // console.log("status code: ", res.status); // 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // GET AUTHORS

  const getAuthors = async () => {
    try {
      const res = await fetch("/authors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        setAuthors([...data]);
        console.log("AUTHORS CONTEXT");
        console.log(authors);
        // setAuthors(data);
        // console.log(data);
        // const authorArr = data;
      } else {
        console.log("Failed to fetch Todo");
      }
      // console.log("status code: ", res.status); // 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuthors();
    getBlogs();
  }, []);

  return (
    <>
      <section className='text-gray-600 body-font overflow-hidden'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-12'>
            {blogs
              .slice(0)
              .reverse()
              .map((item) => {
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

export default Blog;
