import asyncWrapper from '../middlewares/asyncwarpper.js'
import AppError from '../utils/appError.js';
import { checkDetails } from '../utils/checkData.js';
import { createProfileService } from '../models/profile.js';
import { createUserService } from '../models/User.js';

const createProfile = asyncWrapper(async (req, res, next) => {
    const { ...profileData } = req.body;
    const userId = req.currentUser.id;
    if (!userId) return next(new AppError('user Id Is Required', 400, 'Falied'));

    const { goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries } = profileData;
    await checkDetails({ goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit }, next);

    const user = await createProfileService(userId, profileData);
    res.status(201).json({ status: 'Sucess', data: user });
})



export { createProfile }