import React from "react";
import Categories from "../../categories.api";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <section className='text-gray-600 body-font fixed bg-white'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            <div className='p-4 w-full'>
              <h2 className='font-medium title-font tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left'>
                Categories
              </h2>
              <nav className='flex flex-col space-y-2.5'>
                {Categories.map((item) => {
                  return (
                    <>
                      <NavLink to={"/category"} state={item.ID}>
                        <a>{item.title}</a>
                      </NavLink>
                    </>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
