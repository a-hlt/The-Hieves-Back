import express from 'express';
import * as UserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js'; 

const router = express.Router();

// Public routes
router.post('/auth/register', UserController.register);
router.post('/auth/login', UserController.loginUser);

// Protected routes
router.use(authMiddleware);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUserById);

export default router;