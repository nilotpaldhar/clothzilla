import express from 'express';
import {
	getUserProfile,
	updateUserProfile,
	getUserShippingDetails,
	updateUserShippingDetails,
	getProfileAvatar,
	uploadProfileAvatar,
} from '../controllers/profileController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(auth, getUserProfile).put(auth, updateUserProfile);
router
	.route('/avatar')
	.get(auth, getProfileAvatar)
	.post(auth, uploadProfileAvatar);

router
	.route('/shipping')
	.get(auth, getUserShippingDetails)
	.put(auth, updateUserShippingDetails);

export default router;
