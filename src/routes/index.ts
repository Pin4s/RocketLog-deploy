import { Router } from "express";
import { userRoutes } from "./usersRoutes";
import { sessionRoutes } from "./sessionRoutes";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)

export {routes}