import * as express from "express"
import { todosController, todosValidation } from "../modules/todos/todos.module";
import protect from "../middlewares/protect.route";
import validate from "../middlewares/validate.schema";

const router = express.Router();

router.get("/", 
    [ protect() ], 
    todosController.get as express.RequestHandler
);

router.post("/",
    [
        validate(todosValidation.createTodoSchema),
        protect()
    ],
    todosController.create as express.RequestHandler
)

router.put("/", 
    [
        validate(todosValidation.updateTodoSchema),
        protect()
    ],
    todosController.update as express.RequestHandler
)

router.delete("/",
    [
        protect()
    ],
    todosController.remove as express.RequestHandler
)



export default router;