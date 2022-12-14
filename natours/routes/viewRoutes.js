const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();


router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:tourSlug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLogin);
router.get('/me', authController.protect, viewsController.getAccount);

module.exports = router
