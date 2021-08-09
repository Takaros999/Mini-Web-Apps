const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "FGJIIOFMS(#$()@$(fgmmFDS-3m#@f(__)#wDF,S13-54";

//Warnings
const invalidPassword = `<h4>
Password must be <u>at least 6 characters long</u> and have
<u>at least one symbol and digit</u>.
</h4>`;
const invalidUsername = `<h4>
Username is 
<u>already used</u>.
</h4>`;
const passwordNotMatch = `<h4>
Passwords
<u>don't match</u>.
</h4>`;
const loginWarning = `<h4>
Invalid
<u>username or password</u>.
</h4>`;

// connect to mongodb
const dbURI =
  "mongodb+srv://takaros:1234@cluster0.315b9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connect to db");
    // listen for request after connecting to db
    app.listen(5000, () => {
      console.log("Server is listening on port 5000...");
    });
  })
  .catch((err) => {
    console.error(err);
  });

//middleware & static files
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  if (req.session.status === undefined) {
    res.locals.status = false;
  } else {
    res.locals.status = req.session.status;
  }
  next();
});

//home page
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//about page
app.get("/about", (req, res) => {
  if (req.session.token !== undefined) {
    const user = jwt.verify(req.session.token, JWT_SECRET);
    console.log(user.username);
  }

  console.log(req.session.token);
  console.log(res.locals.status);
  res.render("about", { title: "About Page", loggedIn: res.locals.status });
});

//auth routes
app.use(authRoutes);

//blog routes
app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404");
});
