import React, { useState, useEffect } from "react";

const PostForm = ({ onSubmit, editPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, id: editPost?.id });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">{editPost ? "Update" : "Create"} Post</button>
    </form>
  );
};

export default PostForm;
