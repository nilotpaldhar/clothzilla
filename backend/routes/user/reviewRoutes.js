import express from 'express';
import {
	getAllReviews,
	getReviewById,
	createReview,
} from '../../controllers/user/reviewController.js';
import { auth } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:productId/reviews').get(getAllReviews).post(auth, createReview);
router.route('/:productId/reviews/:reviewId').get(getReviewById);

export default router;
