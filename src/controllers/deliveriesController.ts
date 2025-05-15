import { prisma } from "@/database/prisma";
import { Request, Response, NextFunction } from "express";
import { z } from 'zod'


class DeliveriesController {
    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string()
        })

        const {user_id, description} = bodySchema.parse(req.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description,
            }
        })

        return res.json("OK").status(201)
    }

    async index(req: Request, res:Response, next: NextFunction){
        

        const deliveries = await prisma.delivery.findMany({
            where:{},
            include: {
                user:{ select: {name: true, email: true}}
            }
        })

        return res.json(deliveries)
    }
}

export { DeliveriesController }