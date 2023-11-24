import React from "react";
import { Post } from "./interface/types";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="grid">
      <a
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        className="post_card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="ellipse-lines line-2-ellipse">{post?.title}</h3>
        <p className="ellipse-lines line-4-ellipse">{post?.body}</p>
      </a>
    </div>
  );
};

export default PostCard;
