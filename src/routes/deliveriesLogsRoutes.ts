import { Router } from "express";
import { DeliveryLogsController } from "@/controllers/deliveryLogsController";

import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthentication } from "@/middlewares/verifyUserAuthentication";

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController

deliveryLogsRoutes.post("/",
    ensureAuthenticated,
    verifyUserAuthentication(["sale"]),
    deliveryLogsController.create
)

deliveryLogsRoutes.get("/:delivery_id/show",
    ensureAuthenticated,
    verifyUserAuthentication(["sale", "customer"]),
    deliveryLogsController.show
)

export { deliveryLogsRoutes }