import React from 'react';
import StarRating from './StarRating';
import LikeButton from './LikeButton';
import { likeReview, unlikeReview } from '../actions/review';
import { connect } from 'react-redux';

const Review = ({
  auth: { isAuthenticated, loading, user },
  review,
  likeReview,
  unlikeReview,
}) => {
  let likedInit;
  let disabled;
  if (isAuthenticated && !loading) {
    likedInit = review.likes.some((like) => like.user === user._id);
    disabled = false;
  } else {
    likedInit = false;
    disabled = true;
  }

  return (
    <div key={review.id} className="review">
      <p>{review.text}</p>
      <div className="review-bottom">
        <StarRating rating={review.rating} size="small" onRate={() => {}} />
        <LikeButton
          isLikedInit={likedInit}
          numberLikes={review.likes.length}
          likeReview={() => likeReview(review._id)}
          unlikeReview={() => unlikeReview(review._id)}
          disabled={disabled}
        ></LikeButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { likeReview, unlikeReview })(Review);
