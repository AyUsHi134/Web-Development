import React from "react";
import Post from "./Post";

const PostList = ({ posts, onEdit, onDelete }) => (
  <div>
    {posts.map(post => (
      <Post key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

export default PostList;
