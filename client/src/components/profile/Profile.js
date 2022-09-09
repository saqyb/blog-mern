import React from "react";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [DP, setDP] = useState({});
  const [editBool, setEditBool] = useState(false);
  // const [user, setUser] = useState(currentUser);
  const updateUserApi = async () => {
    const formData = new FormData();
    formData.append("ID", currentUser.ID);
    formData.append("Name", currentUser.Name);
    formData.append("email", currentUser.email);
    formData.append("DP", DP);
    formData.append("BIO", currentUser.BIO);
    console.log("Update User");
    axios
      .patch("/user", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const changeImage = (e) => {
    console.log("Change Image");
    const name = e.target.files[0];
    setDP(name);
    setCurrentUser({ ...currentUser, DP: DP.name });
    updateUserApi();
    console.log(DP);
  };
  const userDP = () => {
    if (currentUser.DP) {
      return <img src={`users/${currentUser.DP}`} alt={currentUser.DP} />;
    } else {
      return <img src='users/placeholder.png' alt='DP' />;
    }
  };

  const editBoolHandler = () => {
    setEditBool(!editBool);
  };

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
    updateUserApi();
  };

  if (currentUser) {
    return (
      <>
        <div className='my-28'>
          <div>
            <form encType='multipart/form-data'>
              {userDP()}
              <div>
                image: <br />
                {DP.name}
              </div>
              <label
                htmlFor='file-upload'
                class='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span>Change DP</span>
                <input
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  className='sr-only text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                  // value={blog.image}
                  onChange={changeImage}
                  // value={image}
                />
              </label>
              <br />
              <button
                onClick={saveUser}
                className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
              >
                Save
              </button>
            </form>
          </div>
          <br />
          <button
            onClick={() => editBoolHandler()}
            className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
          >
            Edit Profile
          </button>
          <br />
          {currentUser.Name} is Logged in
          <div
            className={`profile ${editBool ? "hideDisplay" : "showDisplay"}`}
          >
            <div>Name: {currentUser.Name}</div>
            <div>Email: {currentUser.email}</div>
            <div>BIO: {currentUser.BIO}</div>
            <div>DP: {currentUser.DP}</div>
          </div>
          <br />
          <div
            className={`profile ${editBool ? "showDisplay" : "hideDisplay"}`}
          >
            <br />
            <form encType='multipart/form-data'>
              <div className='relative z-0 mb-6 w-full group'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  value={currentUser.email}
                  onChange={handleInput}
                />
                <label
                  htmlFor='email'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Email address
                </label>
              </div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 mb-6 w-full group'>
                  <input
                    type='text'
                    name='Name'
                    id='Name'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={currentUser.Name}
                    onChange={handleInput}
                  />
                  <label
                    htmlFor='Name'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Name
                  </label>
                </div>
                <div className='relative z-0 mb-6 w-full group'>
                  <input
                    type='text'
                    name='BIO'
                    id='BIO'
                    onChange={handleInput}
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={currentUser.BIO}
                  />
                  <label
                    htmlFor='BIO'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    BIO
                  </label>
                </div>
              </div>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={saveUser}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/");
  }
};

export default Profile;
