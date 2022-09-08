const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const authenticate = require("../middleware/authenticate");
require("../db/conn");
const User = require("../model/userSchema");
router.use(cookieParser());

router.get("/authenticate", authenticate, (req, res) => {
  // console.log("About page from Auth");
  res.send(req.rootUser);
});

// GET ALL AUTHORS DETAILS

router.get("/authors", async (req, res) => {
  const { id } = req.body;
  try {
    if (id) {
      const author = await User.findOne({ id: id });
      if (author) {
        res.send(author);
      } else {
        return res.status(500).json({ error: "Data Not Found" });
      }
    } else {
      //   const projection = { Name, email, blogsID };
      const authors = await User.find(
        {},
        {
          ID: 1,
          Name: 1,
          email: 1,
          blogsID: 1,
        }
      );
      if (authors) {
        res.send(authors);
      } else {
        return res.status(500).json({ error: "Data Not Found" });
      }
    }
  } catch (err) {
    console.log(err);
  }
  // res.send(req.todos);
});

router.post("/register", async (req, res) => {
  const { ID, Name, email, password, cpassword } = req.body;
  if ((!ID, !Name || !email || !password || !cpassword)) {
    res.status(422).json({ error: "Plz send complete data" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email Already Exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords Dont Match" });
    } else {
      const user = new User({ ID, Name, email, password, cpassword });
      const userRegistered = await user.save();
      if (userRegistered) {
        return res
          .status(201)
          .json({ message: "User Registered Successfully" });
      } else {
        return res.status(500).json({ error: "Failed to Register" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Plz send complete data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken", token, {
          expiresIn: 5000,
          httpOnly: true,
        });
        return res.status(201).json({ message: "logged in Successfully" });
      } else {
        return res.status(500).json({ error: "User Not Found" });
      }
    } else {
      return res.status(500).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/userBlogs", async (req, res) => {
  const { email, blogsID } = req.body;
  try {
    const user = await User.findOne({ email: email });
    //   const Todo = { id: todo.id, todo: todo.todo };
    await user.blogsID.unshift(blogsID);
    const save = user.save();
    if (save) {
      return res.status(201).json({ message: "Saved New BlogID" });
    } else {
      return res.status(500).json({ error: "Failed to save" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/userBlogs", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send(user.blogsID);
    } else {
      return res.status(500).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
  //   res.send(req.todos);
});

router.delete("/userBlogs", async (req, res) => {
  const { email, blogsID } = req.body;
  if ((!email, !blogsID)) {
    return res.status(422).json({ error: "Plz Send Complete Data" });
  }
  try {
    var user = await User.findOne({ email: email });
    if (user) {
      await user.update({ $pull: { blogsID: blogsID } });
      const save = await user.save();
      if (save) {
        return res
          .status(201)
          .json({ message: "Blog ID Deleted Successfully" });
      } else {
        return res.status(500).json({ error: "Failed to Delete Blog ID" });
      }
    } else {
      return res.status(500).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Log Out page

router.get("/logout", (req, res) => {
  console.log("User LogOut from Auth");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logged out");
});

module.exports = router;
