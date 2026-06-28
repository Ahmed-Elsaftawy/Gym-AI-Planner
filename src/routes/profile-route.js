import express from 'express';
import { createProfile } from '../controllers/profile-controller.js';
import verifyToken from '../middlewares/verifyToken.js';
const profileRouter = express.Router();


profileRouter.route('/').post(verifyToken, createProfile)




export { profileRouter }