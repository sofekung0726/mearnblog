const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("./models/Post");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });
const fs = require("fs");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/upload", express.static(__dirname + "/upload"));

//database Connect

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

app.get("/", (req, res) => {
  res.send("<h1> Welcome to restful API Blog</h1>");
});

//user register
const salt = bcrypt.genSaltSync(10);
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

const secret = process.env.SECRET;
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const isMatchedPassword = bcrypt.compareSync(password, userDoc.password);
  if (isMatchedPassword) {
    //can login
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      //save data in cookie
      res.cookie("token", token).json({
        id: userDoc.id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});
//User logout
app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
  });
  
app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createAt: -1 })
      .limit(20)
  );
});


//Creat Post
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.put("/post/:id", uploadMiddleware.single("file"), async (req, res) => {
  const { id } = req.params;

  try {
    const { title, summary, content } = req.body;
    let updateData = { title, summary, content };

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;

      await fs.promises.rename(path, newPath);
      updateData = { ...updateData, cover: newPath };
    }

    const existingPost = await Post.findById(id);
    const existingCoverPath = existingPost ? existingPost.cover : '';

    
    const cover = req.file ? updateData.cover : existingCoverPath;

    const updatedPost = await Post.findByIdAndUpdate(id, { ...updateData, cover }, {
      new: true,
    });

    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json("Internal Server Error");
  }
});

app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Delete post by ID
    const deletedPost = await Post.findByIdAndDelete(id);

    if (deletedPost) {
      // If deletion is successful
      res.json({ message: "Post deleted successfully", deletedPost });
    } else {
      // If the specified ID is not found
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json("Internal Server Error");
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});