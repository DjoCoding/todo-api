import express from "express"
import usersRouter from "./users.router"
import todosRouter from "./todos.router"
import authRouter from "./auth.router"

const router = express.Router();

router.use("/users", usersRouter);
router.use("/todos", todosRouter);
router.use("/auth", authRouter);

export default router;