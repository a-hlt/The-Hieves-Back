import express from 'express';
import { register, loginUser, getUsers, getUserById, updateUser, deleteUserById } from '../controllers/userController.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/auth/register', register);
router.post('/auth/login', loginUser);

// Protected routes
router.use(authMiddleware);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUserById);

export default router;