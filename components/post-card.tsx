import React, { useState } from "react";
import { Post } from "./interface/types";

interface PostCardProps {
  post: Post;
}

interface PostDialogProps {
  post: Post;
  onClose: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ({ post, onClose }) => {
  return (
    <div className="post-dialog">
      <div className="post-dialog-content">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <button className="btn btn-dark" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="grid">
      <div onClick={openDialog} className="post_card">
        <h3 className="ellipse-lines line-2-ellipse">{post?.title}</h3>
        <p className="ellipse-lines line-4-ellipse">{post?.body}</p>
      </div>
      {isDialogOpen && <PostDialog post={post} onClose={closeDialog} />}
    </div>
  );
};

export default PostCard;
