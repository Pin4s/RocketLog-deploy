import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import z from "zod";

class DeliveryLogsController {
    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        const { delivery_id, description } = bodySchema.parse(req.body)

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id }
        })

        if (!delivery) {
            throw new AppError("Delivery not found!", 404)
        }

        if(delivery.status === "delivered"){
            throw new AppError("Delivery has ben already delivered")
        }

        if (delivery.status === "processing") {
            throw new AppError("Change delivery status to shipped")
        }

        await prisma.deliveryLogs.create({
            data: {
                deliveryId: delivery_id,
                description
            }
        })

        return res.json({ message: "Ok!" })
    }

    async show(req: Request, res: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
        })

        const { delivery_id } = paramsSchema.parse(req.params)

        const deliveryLogs = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: {
                logs: true,
                user: true
            }
        })

        if(!deliveryLogs){
            return res.status(404).json({message: "Delivery not found"})
        }

        if(req.user?.role === "customer" && req.user?.id !== deliveryLogs?.userId){
            throw new AppError("the user an only view their deliveries")
        }

        return res.json(deliveryLogs)
    }
}

export { DeliveryLogsController }