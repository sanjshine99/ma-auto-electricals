import express from 'express';
import { loginUser,registerUser,checkTokenCorrect} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/checkTokenCorrect",checkTokenCorrect);

export default userRouter;