import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postID } = useParams();
  return <div>Postid = {postID}</div>;
};

export default Post;
