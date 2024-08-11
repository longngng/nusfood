import React, { useState } from 'react';

const LikeButton = ({
  numberLikes,
  isLikedInit,
  likeReview,
  unlikeReview,
  disabled,
}) => {
  const [likes, setLikes] = useState(numberLikes);
  const [isLiked, setIsLiked] = useState(isLikedInit);

  const handleClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
      unlikeReview();
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      likeReview();
    }
  };

  return ( 
      <button
        className={`like-button ${isLiked ? 'liked' : ''}`}
        disabled={disabled}
        onClick={() => handleClick()}
      >
        👍 {likes}
      </button>

  );
};

export default LikeButton;
