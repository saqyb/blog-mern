import React from "react";
import { useEffect, useContext } from "react";
import { userContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(userContext);
  const changeImage = (e) => {
    console.log("Change Image");
    const name = e.target.files[0];
    // console.log(e.target.files[0].name);
    // console.log(name);
    // setCurrentUser();
    // console.log(image);
  };
  if (currentUser) {
    return (
      <>
        <div className='my-28'>
          <div>
            <img src={`user/${currentUser.DP}`} alt='DP' />
            <input
              id='file-upload'
              name='file-upload'
              type='file'
              className='sr-only'
              onChange={changeImage}
              // value={image}
            />
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Change DP
            </button>
          </div>
          {currentUser.Name} is Logged in
          <div>Name: {currentUser.Name}</div>
          <div>Email: {currentUser.email}</div>
          <div>BIO: {currentUser.BIO}</div>
          <div>DP: {currentUser.DP}</div>
          <div>PASS: {currentUser.password}</div>
        </div>
      </>
    );
  } else {
    navigate("/");
  }
};

export default Profile;
