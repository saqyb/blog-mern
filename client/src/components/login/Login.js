import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        // setCurrentUser(data);
        console.log(data);
        navigate("/");
      } else {
        window.alert("Login Failed");
      }
      console.log("status code: ", res.status); // 👉️ 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
      // return data;
    } catch (err) {
      console.log(err);
    }
    // navigate("/");
  };
  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='mx-auto bg-gray-100 rounded-lg p-8 flex flex-col w-3/6 mt-10 '>
          <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
            Login
          </h2>
          <form method='POST'>
            <div className='relative mb-4'>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <button
              onClick={loginUser}
              className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
            >
              Login
            </button>
            <NavLink to='/Signup'>
              <p className='text-xs text-blue-700 mt-3'>
                New Here? Click Here to Register.
              </p>
            </NavLink>
          </form>
        </div>
      </section>
    </>
  );
};
export default Login;
