import { Request, Response } from "express";
import { prisma } from "@/database/prisma"
import { hash } from "bcrypt"
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class UserController {

    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)

        const userWithSameEmail = await prisma.user.findFirst({where: {email}})

        if (userWithSameEmail){
            throw new AppError("A user with this email already exist")
        }
        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })

        const {password: _, ...userWithoutPassword} = user

        return res.json(userWithoutPassword)
    }
}

export { UserController }