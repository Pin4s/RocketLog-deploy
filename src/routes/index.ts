import { Router } from "express";
import { userRoutes } from "./usersRoutes";
import { sessionRoutes } from "./sessionRoutes";
import { deliveriesRoutes } from "./deliveriesRoutes";
import { deliveryLogsRoutes } from "./deliveriesLogsRoutes";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/deliveries", deliveriesRoutes)
routes.use("/delivery-logs", deliveryLogsRoutes)

export { routes }