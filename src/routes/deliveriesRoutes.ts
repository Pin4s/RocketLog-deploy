import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveriesController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthentication } from "@/middlewares/verifyUserAuthentication";

const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesController()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthentication(["sale"]))
deliveriesRoutes.post("/", deliveriesController.create)

export { deliveriesRoutes }