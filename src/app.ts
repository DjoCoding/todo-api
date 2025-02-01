import express from "express"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*", 
}));

import mainRouter from "./routes/index"
import setCustom from "./middlewares/custom";
import error from "./middlewares/error";

app.use(setCustom() as express.RequestHandler);
app.use("/api", mainRouter);
app.use(error());

export default app;