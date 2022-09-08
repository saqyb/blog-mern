import { useState } from "react";
import { createContext } from "react";

export const BlogContext = createContext({
  blogs: [],
  setBlogs: () => null,
});

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const value = { blogs, setBlogs };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
