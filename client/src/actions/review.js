import api from '../utils/api';
import { setAlert } from './alert';
import {
  REVIEW_ERROR,
  UPDATE_LIKES,
  ADD_REVIEW,
} from './types';

// Add review
export const addReview = (canteenId, formData) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await api.post(`/canteens/${canteenId}/reviews`, formData);

    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    });

    dispatch(setAlert('Review Created', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like a review
export const likeReview = (reviewId) => async (dispatch) => {
  try {
    console.log(reviewId);
    const res = await api.put(`/reviews/${reviewId}/like`);

    dispatch({
      type: UPDATE_LIKES,
      payload: res.data,
    });

    // dispatch(setAlert('Liked Review', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Unlike a review
export const unlikeReview = (reviewId) => async (dispatch) => {
  try {
    const res = await api.put(`/reviews/${reviewId}/unlike`);

    dispatch({
      type: UPDATE_LIKES,
      payload: res.data,
    });

    // dispatch(setAlert('Unliked Review', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};