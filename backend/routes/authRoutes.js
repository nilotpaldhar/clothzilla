import express from 'express';
import {
	loginUser,
	registerUser,
	logoutUser,
	logoutUserAll,
	updateUserPassword,
	getUserProfile,
	updateUserProfile,
	getUserShippingDetails,
	updateUserShippingDetails,
	getProfileAvatar,
	uploadProfileAvatar,
	closeUserProfile,
	deleteUserProfile,
} from '../controllers/authController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', auth, logoutUser);
router.post('/logoutall', auth, logoutUserAll);

router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);
router.put('/profile/security', auth, updateUserPassword);
router
	.route('/profile/avatar')
	.get(auth, getProfileAvatar)
	.post(auth, uploadProfileAvatar);

router
	.route('/profile/shipping')
	.get(auth, getUserShippingDetails)
	.put(auth, updateUserShippingDetails);
router.put('/profile/close', auth, closeUserProfile);
router.delete('/profile/delete', auth, deleteUserProfile);

export default router;
