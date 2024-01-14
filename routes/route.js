import express from "express";
import { getNews } from "../controller/news-controller.js";
import { getBookmarks } from "../controller/bookmarks-controller.js";
import User from "../modal/user.js";
import Bookmarks from "../modal/bookmarks.js";
import bcrypt from "bcryptjs";

const route = express.Router();

route.get("/news", getNews);

// route.get("/login", (req, res) => {
//   return res.redirect("/");
// });

route.get("/bookmarkedNews", getBookmarks);

route.post("/login", (req, res) => {
  let token;
  const { email, password } = req.body;

  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      token = await user.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password is incorrect. Please try again!" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

route.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      await user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

route.post("/bookmarks", (req, res) => {
  const {
    author,
    content,
    description,
    email,
    name,
    publishedAt,
    title,
    url,
    urlToImage,
  } = req.body;

  Bookmarks.findOne({ email: email, title: title }, (err, user) => {
    if (user) {
      res.send({ message: "Already Bookmarked" });
    } else {
      const bookmarks = new Bookmarks({
        author,
        content,
        description,
        email,
        name,
        publishedAt,
        title,
        url,
        urlToImage,
      });
      bookmarks.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Bookmarked the news" });
        }
      });
    }
  });
});

route.post("/deleteBookmarks", async (req, res) => {
  const { email, title } = req.body;

  await Bookmarks.deleteOne({ email: email, title: title });
});

export default route;
