import express from 'express';
import {
	loginUser,
	registerUser,
	getCurrentUser,
	logoutUser,
	logoutUserAll,
	updateUserPassword,
	closeUserAccount,
} from '../controllers/authController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', auth, getCurrentUser);
router.post('/logout', auth, logoutUser);
router.post('/logoutall', auth, logoutUserAll);
router.put('/security', auth, updateUserPassword);
router.put('/close', auth, closeUserAccount);

export default router;
