const express = require('express');

const Review = require('../../models/Review');

const checkObjectId = require('../../middleware/checkObjectId');
const auth = require('../../middleware/auth');

const router = express.Router();

// @route    GET api/reviews/:id
// @desc     Get review by ID
// @access   Private
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    res.json(review);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/reviews/:id/like
// @desc     Like a review
// @access   Private
router.put('/:id/like', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Check if the review has already been liked
    if (review.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Review already liked' });
    }

    review.likes.push({ user: req.user.id });

    await review.save();

    return res.json(review.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/reviews/:id/unlike
// @desc     Unlike a review
// @access   Private
router.put('/:id/unlike', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Check if the review has not yet been liked
    if (!review.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Review has not yet been liked' });
    }

    // remove the like
    review.likes = review.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await review.save();

    return res.json(review.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
