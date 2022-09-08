import React from "react";
import { useLocation } from "react-router-dom";
const FullBlog = () => {
  const location = useLocation();
  // console.log(location.state);
  return (
    <>
      <div className='p-12 md:w-1/2 flex flex-col items-start'>
        <img
          src={`../../uploads/${location.state.image}`}
          alt={location.state.image}
          width='100%'
        />
        <h2 className='sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4'>
          {location.state.title}
        </h2>
        <p className='leading-relaxed mb-8'>{location.state.body}</p>
        <br />
      </div>
    </>
  );
};

export default FullBlog;
