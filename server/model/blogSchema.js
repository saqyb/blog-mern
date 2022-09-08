const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  categoryID: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: false },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
