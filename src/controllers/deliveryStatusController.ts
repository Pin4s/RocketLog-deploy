import { Request, Response } from "express-serve-static-core"
import z from "zod"
import { prisma } from "@/database/prisma"

class DeliveryStatusController {
    async update(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const bodySchema = z.object({
            status: z.enum(['processing', 'shipped', 'delivered'])
        })

        const { id } = paramsSchema.parse(req.params)
        const { status } = bodySchema.parse(req.body)

        await prisma.delivery.update({
            data: {
                status
            },
            where: {
                id
            }
        })

        return res.json(status)
    }

}
export { DeliveryStatusController }