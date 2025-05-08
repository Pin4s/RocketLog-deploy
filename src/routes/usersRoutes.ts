import { Router } from "express";
import { UserController } from "@/controllers/userControllers";

const userRoutes = Router()
const userController = new UserController

userRoutes.get("/", userController.create)

export {userRoutes}