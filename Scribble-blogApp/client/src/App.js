import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts")
      .then(res => setPosts(res.data));
  }, []);

  const handleCreateOrUpdate = (post) => {
    if (post.id) {
      axios.put(`http://localhost:3000/api/posts/${post.id}`, post).then(res => {
        setPosts(posts.map(p => (p.id === post.id ? res.data : p)));
        setEditPost(null);
      });
    } else {
      axios.post("http://localhost:3000/api/posts", post).then(res => {
        setPosts([...posts, res.data]);
      });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/posts/${id}`).then(() => {
      setPosts(posts.filter(p => p.id !== id));
    });
  };

  return (
    <div className="container">
      <h1>My Blog</h1>
      <PostForm onSubmit={handleCreateOrUpdate} editPost={editPost} />
      <PostList posts={posts} onEdit={setEditPost} onDelete={handleDelete} />
    </div>
  );
};

export default App;
