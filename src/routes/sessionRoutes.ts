import { Router } from "express";
import { SessionController } from "@/controllers/sessionController";

const sessionRoutes = Router()
const sessionController = new SessionController()

sessionRoutes.get("/", sessionController.create)

export { sessionRoutes }