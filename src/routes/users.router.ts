import express, { RequestHandler } from "express"
import { usersController } from "../modules/users/users.module"
import protect from "../middlewares/protect.route";
import validate from "../middlewares/validate.schema";
import { updateUserSchema } from "../modules/users/users.validation";
import { UpdateUserDTO } from "../modules/users/dtos/update.user.dto";

const router = express.Router();

router.get("/:id", usersController.getByID as RequestHandler);
router.get("/", usersController.get as RequestHandler);
router.put("/", 
    [ 
        validate<UpdateUserDTO>(updateUserSchema),
        protect()
    ],
    usersController.update as RequestHandler
);
router.delete("/", 
    [ 
        protect()
    ],
    usersController.remove as RequestHandler
);

export default router;