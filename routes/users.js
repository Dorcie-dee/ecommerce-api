import { Router } from "express";
import { getAuthenticatedUser, loginUser, registerUser, updateUser } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

//Create a user router
const userRouter = Router();

//define routes
userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser);

userRouter.patch('/users/:id', updateUser)

userRouter.get('/users/me', isAuthenticated, getAuthenticatedUser);

//export router
export default userRouter;