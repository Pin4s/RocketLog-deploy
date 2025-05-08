import { Router } from "express";
import { userRoutes } from "./usersRoutes";

const routes = Router()

routes.use("/users", userRoutes)

export {routes}