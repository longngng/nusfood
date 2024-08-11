const router = require('express').Router();
const Canteen = require('../../models/Canteen');
const Review = require('../../models/Review');
const Dish = require('../../models/Dish');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/canteens
// @desc     Get All Canteens
// @access   Public
router.get('/', async (req, res) => {
  try {
    // Extract the campus query parameter
    const { campus } = req.query;

    // Construct the query based on the presence of the campus parameter
    const query = campus ? { campus } : {};

    // Fetch canteens from the database based on the query
    const canteens = await Canteen.find(query);
    res.json(canteens);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/canteens
// @desc     Add a new canteen
// @access   Private
router.post('/', auth, async (req, res) => {
  const { name, img_link, campus } = req.body;

  try {
    let canteen = await Canteen.findOne({ name });

    if (canteen) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Restaurant Already Exists' }] });
    }

    canteen = new Canteen({ name, img_link, campus });

    await canteen.save();

    res.json({ canteen });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/canteens/:id
// @desc     Get canteen by ID
// @access   Public
router.get('/:id', async (req, res) => {
  const canteenId = req.params.id;
  let canteen;

  try {
    canteen = await Canteen.findById(canteenId)
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: '-password -date',
        },
      })
      .populate({
        path: 'dishes',
      });

    if (!canteen) {
      return res.status(404).json({ errors: [{ msg: 'Canteen Not Found' }] });
    }
  } catch (err) {
    console.error(err.message);
  }

  res.json(canteen);
});

// @route    POST api/canteens/:id/reviews
// @desc     Add a new review for a canteen
// @access   Private
router.post('/:id/reviews', auth, async (req, res) => {
  const text = req.body.text;
  const rating = req.body.rating;
  const canteenId = req.params.id;
  const userId = req.user.id;

  const review = new Review({
    user: userId,
    text,
    rating
  });

  try {
    const canteen = await Canteen.findById(canteenId).populate({
      path: 'reviews',
    });
    if (!canteen) {
      return res.status(404).json({ errors: [{ msg: 'Canteen Not Found' }] });
    }
    canteen.reviews.push(review);
    await review.save();
    await canteen.save();

    res.json(canteen.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/canteens/:id/reviews
// @desc     Get all reviews for a canteen
// @access   Public
router.get('/:id/reviews', async (req, res) => {
  const canteenId = req.params.id;
  let canteen;

  try {
    canteen = await Canteen.findById(canteenId).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: '-password -date',
      },
    });

    if (!canteen) {
      return res.status(404).json({ errors: [{ msg: 'Canteen Not Found' }] });
    }
  } catch (err) {
    console.error(err.message);
  }
  const reviews = canteen.reviews;
  res.json(reviews);
});

// @route    DELETE api/canteens/:id/reviews/:reviewId
// @desc     Delete a review
// @access   Private
router.delete(
  '/:id/reviews/:reviewId',
  [auth, checkObjectId('id'), checkObjectId('reviewId')],
  async (req, res) => {
    try {
      const canteen = await Canteen.findById(req.params.id).populate({
        path: 'reviews',
      });

      if (!canteen) {
        return res.status(404).json({ msg: 'Canteen not found' });
      }

      // Pull out review
      const review = canteen.reviews.find(
        (review) => review.id === req.params.reviewId
      );

      // Make sure comment exists
      if (!review) {
        return res.status(404).json({ msg: 'Review does not exist' });
      }

      // Check user
      if (review.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      canteen.reviews = canteen.reviews.filter(
        ({ id }) => id !== req.params.reviewId
      );
      await canteen.save();

      await Review.findByIdAndDelete(req.params.reviewId);

      res.json({ msg: 'Review removed' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/canteens/:id/dishes
// @desc     Add a new dish for a canteen
// @access   Private
router.post('/:id/dishes', auth, async (req, res) => {
  const canteenId = req.params.id;

  const dish = new Dish({
    name: req.body.name,
    price: req.body.price,
    img_link: req.body.img_link,
  });
  console.log(dish);
  try {
    const canteen = await Canteen.findById(canteenId).populate({
      path: 'dishes',
    });
    if (!canteen) {
      return res.status(404).json({ errors: [{ msg: 'Canteen Not Found' }] });
    }
    canteen.dishes.push(dish);
    await dish.save();
    await canteen.save();

    res.json(canteen.dishes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
