const mongoose = require("mongoose");
const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("home", {
        title: "Home Page",
        loggedIn: res.locals.status,
        blogs: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create Blog", loggedIn: res.locals.status });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog.save((err) => {
    console.log(err);
  });

  res.redirect("/blogs");
};

const blog_details = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id, (err) => {
    console.log(err);
  });
  if (!blog) {
    console.log("Error getting blog");
    res.status(404).send("Error getting blog");
  }
  res.render("details", {
    title: blog.title,
    loggedIn: res.locals.status,
    blog,
  });
};

const blog_delete = async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  });
  res.json({ redirect: "/blogs" });
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
};
