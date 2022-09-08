const express = require("express");
const router = express.Router();
const app = express();
require("../db/conn");
const Blog = require("../model/blogSchema");
const multer = require("multer");
const fs = require("fs");
var imageName = null;
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads");
  },
  filename: (req, file, callback) => {
    // imageName = Date.now() + file.originalname;
    const replaced = file.originalname.replaceAll(" ", "-");
    imageName = Date.now() + replaced;
    callback(null, imageName);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Hello World From auth.js");
});

// Create Blog

router.post("/blogs", upload.single("image"), async (req, res) => {
  const { userId, id, categoryID, title, body } = req.body;
  // const image = req.file.originalname;
  const image = imageName;
  if (!userId || !id || !categoryID || !title || !body || !image) {
    res.status(422).json({ error: "Plz send complete data" });
  }
  try {
    const blog = new Blog({ userId, id, categoryID, title, body, image });
    const blogSaved = await blog.save();
    if (blogSaved) {
      return res.status(201).json({ message: "Blog Added Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Add Blog" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Update Blog

router.patch("/blogs", upload.single("image"), async (req, res) => {
  const { userId, id, categoryID, title, body, image } = req.body;

  if (req.file) {
    var post = {
      userId,
      id,
      categoryID,
      title,
      body,
      image: imageName,
    };
    const blog = await Blog.findOne({ id: id });

    await fs.unlink("../client/public/uploads/" + blog.image, (err) => {
      //delete file from directory
      if (err) console.log(err);
      else {
        console.log("file deleted");
      }
    });
  } else {
    var post = {
      userId,
      id,
      categoryID,
      title,
      body,
    };
  }

  if (!userId || !id || !categoryID || !title || !body) {
    res.status(422).json({ error: "Plz send complete data" });
  }
  try {
    const blog = await Blog.findOneAndUpdate({ id: id }, post);

    //   const blog = new Blog({ userId, id, categoryID, title, body });
    // const blogSaved = await blog.save();
    if (blog) {
      return res.status(201).json({ message: "Blog Updated Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Update Blog" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Read

router.get("/blogs", async (req, res) => {
  const { id } = req.body;
  try {
    if (id) {
      const blogs = await Blog.findOne({ id: id });
      if (blogs) {
        res.send(blogs);
      } else {
        return res.status(500).json({ error: "Blog Not Found" });
      }
    } else {
      const blogs = await Blog.find({});
      if (blogs) {
        res.send(blogs);
      } else {
        return res.status(500).json({ error: "Blog Not Found" });
      }
    }
  } catch (err) {
    console.log(err);
  }
  // res.send(req.todos);
});

// Delte Blog

router.delete("/blogs", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(422).json({ error: "ID not found" });
  }
  try {
    const blog = await Blog.findOne({ id: id });
    const deleted = await Blog.findOneAndDelete({ id: id });
    //   const blog = new Blog({ userId, id, categoryID, title, body });
    // const blogSaved = await blog.save();
    if (deleted) {
      await fs.unlink("../client/public/uploads/" + blog.image, (err) => {
        //delete file from directory
        if (err) console.log(err);
        else {
          console.log("file deleted");
        }
      });

      return res.status(201).json({ message: "Blog Deleted Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Delete Blog" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
