import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import FullBlog from "./components/blog/FullBlog";
import Sidebar from "./components/sidebar/Sidebar";
import AddBlog from "./components/blog/AddBlog";
import EditBlog from "./components/blog/EditBlog";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Categories from "./components/blog/Categories";
import Author from "./components/blog/Author";
import Logout from "./components/Logout";
import Test from "./components/test/Test";
import "./App.css";

const Routing = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route path='/post' element={<FullBlog />} />
      <Route path='/addPost' element={<AddBlog />} />
      <Route path='/editPost' element={<EditBlog />} />
      <Route path='/category' element={<Categories />} />
      <Route path='/author' element={<Author />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/profile' element={<Profile />} />
      <Route exact path='/test' element={<Test />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <Nav></Nav>

      <div className='pt-10 blog-app w-10/12'>
        <div className='blog-container w-9/12'>
          <Routing />
        </div>
        <div className='sidebar-container w-3/12'>
          <Sidebar></Sidebar>
        </div>
      </div>
    </>
  );
}

export default App;
