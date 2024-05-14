import express from "express";
import { v4 as uuidv4 } from "uuid";
import { checkBlogPosts } from './database.js'

const app = express();
// const port = process.env.PORT;
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const blogPosts = await checkBlogPosts();
  res.render("index.ejs", { blogPost: blogPosts });
});

function newBlogPost(req) {
  const addPost = {
    id: uuidv4(),
    author: req.author,
    content: req.content,
    likes: 0,
    comments: [],
  };
  // blogPosts.push(addPost);
  blogPosts.unshift(addPost);
//   console.log(blogPosts);
}

function newBlogPostComment(req) {
  console.log(req);
  const postID = req.postID;
  const addComment = {
    commentID: uuidv4(),
    commentAuthor: req.commentAuthor,
    commentContent: req.commentContent,
  };
  const idx = blogPosts.findIndex((item) => item.id === postID);
  // blogPosts[idx].comments.push(addComment);
  blogPosts[idx].comments.unshift(addComment);
//   console.log(blogPosts[idx].comments);
}

function addLike(postID) {
  const idx = blogPosts.findIndex((item) => item.id === postID);
  blogPosts[idx].likes += 1;
}

function deletePost(postID) {
  const idx = blogPosts.findIndex((item) => item.id === postID);
  blogPosts.splice(idx, 1);
//   console.log(`Deleting index: ${idx}`);
}

function deleteComment(postID, cID) {
  const pIdx = blogPosts.findIndex((item) => item.id === postID);
  const cIdx = blogPosts[pIdx].comments.findIndex((c) => c.commentID === cID);
  blogPosts[pIdx].comments.splice(cIdx, 1);
//   console.log(`Deleting post index: ${pIdx} -> comment index: ${cIdx}`);
}

function editPost(postID, editedPost) {
  const idx = blogPosts.findIndex((item) => item.id === postID);
  blogPosts[idx].content = editedPost;
}

app.post("/submit", (req, res) => {
  newBlogPost(req.body);
  res.redirect("/");
});

app.post("/submitComment", (req, res) => {
  newBlogPostComment(req.body);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  // EDIT
  const postID = req.body.postID;
  const editedPost = req.body.editedPost;
  //   console.log(editedPost);
  editPost(postID, editedPost);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  // DELETE
  const postID = req.body.postID;
  // console.log(postID);
  deletePost(postID);
  res.redirect("/");
});

app.post("/deleteComment", (req, res) => {
  // DELETE
  const postID = req.body.postID;
  const commentID = req.body.commentID;
  // console.log(req.body);
  deleteComment(postID, commentID);
  res.redirect("/");
});

app.post("/addLike", (req, res) => {
  // EDIT
  const postID = req.body.postID;
  addLike(postID);
  res.redirect("/");
});

app.listen(port, (req, res) => {
  console.log(`Captain! Servers engaged on port ${port}`);
});


let blogPosts = [];


// const blogPosts = [
//   {
//     id: uuidv4(),
//     author: "Jordan",
//     content:
//       "who can tell me the best way to clean kitty 🤮 out of the carpet?",
//     likes: 3,
//     comments: [
//       {
//         commentID: uuidv4(),
//         commentAuthor: "🙀",
//         commentContent: "😬",
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     author: "Jordan",
//     content: "Hello thar mateys!",
//     likes: 1,
//     comments: [
//       {
//         commentID: uuidv4(),
//         commentAuthor: "🏴‍☠️",
//         commentContent: "Yarrrrr",
//       },
//       {
//         commentID: uuidv4(),
//         commentAuthor: "Jordan",
//         commentContent: "...Is this thing on?",
//       },
//     ],
//   },
  
// ];
