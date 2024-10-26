// routes/authRoutes.js
import express from 'express';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: secretpassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 registrationId:
 *                   type: string
 *                   description: The unique registration ID of the registered user
 *                   example: 4c90b130-1f3c-4a6b-a4a1-9c0e2b5a44e0
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the registered user
 *                       example: 60c72b2f5f1b2c0015c001f1
 *                     username:
 *                       type: string
 *                       description: The username of the registered user
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       description: The email of the registered user
 *                       example: john.doe@example.com
 *       400:
 *         description: All fields are required
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */

router.post('/register', registerUser);

export default router;
