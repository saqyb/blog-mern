import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as uuid from "uuid";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    ID: uuid.v4(),
    Name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { ID, Name, email, password, cpassword } = user;
    const res = await fetch("./register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID,
        Name,
        email,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Registration Failed");
    } else {
      console.log(res.status);
      window.alert("Registration Successful");
      navigate("/Login");
    }
    // navigate("/Login");
    console.log(user);
  };
  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='mx-auto bg-gray-100 rounded-lg p-8 flex flex-col w-3/6 mt-10 '>
          <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
            Sign Up
          </h2>
          <form method='POST'>
            <div className='relative mb-4'>
              <input
                value={user.Name}
                onChange={handleInputs}
                type='text'
                id='name'
                name='Name'
                placeholder='Full Name'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <input
                value={user.email}
                onChange={handleInputs}
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <input
                value={user.password}
                onChange={handleInputs}
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <input
                value={user.cpassword}
                onChange={handleInputs}
                type='password'
                id='cpassword'
                name='cpassword'
                placeholder='Confirm Password'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <button
              className='text-white bg-indigo-500 border-0 py-2 w-full px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
              onClick={PostData}
            >
              Register
            </button>
            <NavLink to='/Login'>
              <p className='text-xs text-blue-700 mt-3'>
                Already Registered? Click Here to Login.
              </p>
            </NavLink>
          </form>
        </div>
      </section>
    </>
  );
};
export default Signup;
