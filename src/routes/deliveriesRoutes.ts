import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveriesController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthentication } from "@/middlewares/verifyUserAuthentication";
import { DeliveryStatusController } from "@/controllers/deliveryStatusController";

const deliveriesRoutes = Router()

const deliveriesController = new DeliveriesController()
const deliveryStatusController = new DeliveryStatusController()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthentication(["sale"]))

deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.get("/", deliveriesController.index)
deliveriesRoutes.patch("/:id/status", deliveryStatusController.update)

export { deliveriesRoutes }