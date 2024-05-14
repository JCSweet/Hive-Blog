import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.PostgreSQL_USER,
  host: process.env.PostgreSQL_HOST,
  database: process.env.PostgreSQL_DATABASE,
  password: process.env.PostgreSQL_PASSWORD,
  port: process.env.PostgreSQL_PORT,
});

db.connect();

export async function checkBlogPosts() {
  const result = await db.query("SELECT * FROM posts");
  //   const result = await db.query("SELECT * FROM posts JOIN comments ON posts.post_ID = comments.post_ID");
  // console.log(result.rows);
  let blogPosts = [];
  result.rows.forEach((post) => {
    blogPosts.push({
      id: post.post_id,
      author: post.post_author,
      content: post.post_content,
      likes: post.post_likes,
      postTime: post.post_timestamp,
      comments: [],
    });
  });
  const result2 = await db.query("SELECT * FROM comments");
  // console.log("comments: ", result2.rows);
  result2.rows.forEach((comment) => {
    const idx = blogPosts.findIndex((item) => item.id === comment.post_id);
    blogPosts[idx].comments.push({
      commentID: comment.comment_id,
      commentAuthor: comment.comment_author,
      commentContent: comment.comment_content,
      commentTime: comment.comment_timestamp,
    });
  });
  // console.log("blogPosts ", blogPosts);
  return blogPosts;
}
