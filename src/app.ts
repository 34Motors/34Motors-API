import "express-async-errors"
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { carRoutes } from "./routes/cars.routes";
import { loginRoutes } from "./routes/login.routes";

const app: Application = express();
app.use(express.json());

app.use("/cars", carRoutes)
app.use("/login", loginRoutes);

app.use(handleErrors)
export default app;
