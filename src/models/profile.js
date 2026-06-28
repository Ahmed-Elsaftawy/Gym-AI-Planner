import { pool } from "../utils/connectDb.js";



const createProfileService = async (userId, profileData) => {
    const { goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries } = profileData
    const result = await pool.query(
        `INSERT INTO profiles
        (goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries,user_id)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`
        , [goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries, userId]);

    return result.rows[0];
};



export { createProfileService };