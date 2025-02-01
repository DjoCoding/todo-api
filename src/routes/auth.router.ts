import express from "express"
import { authValidation, authController } from "../modules/auth/auth.module";
import validate from "../middlewares/validate.schema";
import { CreateUserDTO } from "../modules/users/dtos/create.user.dto";
import { LoginUserDto } from "../modules/auth/dtos/login.user.dto";

const router = express.Router();

router.post("/login", 
    [
        validate<LoginUserDto>(authValidation.loginUserSchema)
    ], 
    authController.login as express.RequestHandler
)

router.post("/register",
    [
        validate<CreateUserDTO>(authValidation.registerUserSchema)
    ], 
    authController.register as express.RequestHandler
)


export default router;