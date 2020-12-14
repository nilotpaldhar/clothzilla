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
router.put('/:id/setadmin', auth, admin, setUserAsAdmin);
router.put('/:id/unsetadmin', auth, admin, unsetUserAsAdmin);
router.put('/:id/activate', auth, admin, activateUser);
router.put('/:id/deactivate', auth, admin, deactivateUser);

export default router;
