import express from 'express';
import {
	getAllUsers,
	activateUser,
	deactivateUser,
	setUserAsAdmin,
	unsetUserAsAdmin,
} from '../../controllers/admin/userController.js';
import { auth, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, admin, getAllUsers);
router.post('/:id/admin', auth, admin, setUserAsAdmin);
router.post('/:id/subscriber', auth, admin, unsetUserAsAdmin);
router.post('/:id/activate', auth, admin, activateUser);
router.post('/:id/deactivate', auth, admin, deactivateUser);

export default router;
