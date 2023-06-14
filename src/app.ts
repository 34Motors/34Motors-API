import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { handleErrors } from "./errors";
import { carRoutes } from "./routes/cars.routes";
import { loginRoutes } from "./routes/login.routes";
import { userRoutes } from "./routes/users.routes";

const app: Application = express();
app.use(cors());

app.use(express.json());

app.use("/cars", carRoutes)
app.use("/users", userRoutes)

app.use("/login", loginRoutes);

app.use(handleErrors);
export default app;
