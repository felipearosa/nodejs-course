const express = require('express');
const reviewController = require('./../controllers/reviewController')
const authController = require('./../controllers/authController')

const router = express.Router( { mergeParams: true } );

router.use(authController.protect);

router.route('/').get(reviewController.getAllReviews).post(authController.protect, authController.restrictTo('user'), reviewController.setUserTourIds, reviewController.createReview);

router.route('/:id').get(reviewController.getReview).patch(authController.restrictTo('users', 'admin'), reviewController.updateReview).delete(authController.restrictTo('users', 'admin'), reviewController.deleteReview);

module.exports = router;
