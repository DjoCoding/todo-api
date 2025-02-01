import connectDB from "./init/connect.db";
import app from "./app"
import { config } from "dotenv"

config();

const PORT = process.env.PORT as string;

function main() {
    connectDB()
    .then(() => {
        console.log(`database connected`);
        app.listen(PORT, () => {
            return console.log(`application running on port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    }) 
}

main();