import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../../contexts/user.context";
const Nav = () => {
  const { currentUser } = useContext(userContext);
  if (currentUser) {
    return (
      <>
        <header className='text-gray-600 body-font fixed bg-white w-full'>
          <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
            <NavLink to={"/"}>
              <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
                <span className='ml-3 text-xl'>Modern Blog</span>
              </a>
            </NavLink>
            <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
              <NavLink to={"/addPost"}>
                <a className='mr-5 hover:text-gray-900'>Add New Blog</a>
              </NavLink>
              <NavLink to={"/profile"}>
                <a className='mr-5 hover:text-gray-900'>Profile</a>
              </NavLink>
            </nav>
            <NavLink to={"/logout"}>
              <button className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
                Logout
              </button>
            </NavLink>
          </div>
        </header>
      </>
    );
  } else {
    return (
      <>
        <header className='text-gray-600 body-font fixed bg-white w-full'>
          <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
            <NavLink to={"/"}>
              <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
                <span className='ml-3 text-xl'>Modern Blog</span>
              </a>
            </NavLink>
            <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
              <NavLink to={"/signup"}>
                <a className='mr-5 hover:text-gray-900'>Signup</a>
              </NavLink>
              <NavLink to={"/login"}>
                <a className='mr-5 hover:text-gray-900'>Login</a>
              </NavLink>
              <a className='mr-5 hover:text-gray-900'>Fourth Link</a>
            </nav>
          </div>
        </header>
      </>
    );
  }
};

export default Nav;
