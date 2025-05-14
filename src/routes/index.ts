import { Router } from "express";
import { userRoutes } from "./usersRoutes";
import { sessionRoutes } from "./sessionRoutes";
import { deliveriesRoutes } from "./deliveriesRoutes";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/deliveries", deliveriesRoutes)

export { routes }