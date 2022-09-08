import React from "react";
import { useEffect } from "react";
import Blog from "../blog/Blog";
import { userContext } from "../../contexts/user.context";
import { useContext } from "react";
const Home = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const callHome = async () => {
    try {
      const res = await fetch("/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        setCurrentUser(data);
      } else if (res.status !== 200) {
        setCurrentUser(null);
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log("Error");
      console.log(err);
      // navigate("/login");
    }
  };

  useEffect(() => {
    callHome();
  }, []);

  return (
    <>
      <Blog></Blog>
    </>
  );
};

export default Home;
