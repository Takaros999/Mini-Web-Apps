const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const JWT_SECRET = "FGJIIOFMS(#$()@$(fgmmFDS-3m#@f(__)#wDF,S13-54";

const register_get = (req, res) => {
  res.render("register", {
    title: "Register",
    loggedIn: res.locals.status,
    warning: "",
    username: "",
  });
};

const register_post = async (req, res) => {
  const {
    username,
    password: passwordPlain,
    confirmPassword: confirmPlain,
  } = req.body;
  let regDigits = /\d/g;
  let regSymbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g;

  // console.log(req.body);
  // console.log(username,password, confirmPassword);
  if (passwordPlain !== confirmPlain) {
    console.log("Invalid password");
    return res.render("register", {
      title: "Register",
      loggedIn: res.locals.status,
      warning: passwordNotMatch,
      username: `${username}`,
    });
  }

  if (
    passwordPlain.length < 6 ||
    !regDigits.test(passwordPlain) ||
    !regSymbols.test(passwordPlain)
  ) {
    console.log("Invalid password");
    return res.render("register", {
      title: "Register",
      loggedIn: res.locals.status,
      warning: invalidPassword,
      username: `${username}`,
    });
  }

  try {
    const password = await bcrypt.hash(passwordPlain, 10);
    const user = new User({ username: username, password: password });
    await user.save();
    // res.send("user register successfully");
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      return res.render("register", {
        title: "Register",
        loggedIn: res.locals.status,
        warning: invalidUsername,
        username: "",
      });
    }
    throw error;
  }
};

const login_get = (req, res) => {
  res.render("login", {
    title: "Log in",
    loggedIn: res.locals.status,
    warning: "",
    username: "",
  });
};

const login_post = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  // console.log(username, password, user);

  if (!user) {
    return res.render("login", {
      title: "Log in",
      loggedIn: res.locals.status,
      warning: loginWarning,
      username: "",
    });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET
    );

    req.session.token = token;
    req.session.status = true;
    console.log("combination/login success");
    return res.redirect("/");
  } else {
    return res.render("login", {
      title: "Log in",
      loggedIn: res.locals.status,
      warning: loginWarning,
      username: "",
    });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      console.log("successfully destroyed session");
    } else {
      console.log("ERROR DESTROYING SESSION", err);
    }
  });
  res.redirect("/");
};

module.exports = {
  register_get,
  register_post,
  login_get,
  login_post,
  logout,
};
