import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { authConfig } from "@/config/auth"

class SessionController {
    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password } = bodySchema.parse(req.body)

        const user = await prisma.user.findFirst({
            where: { email }
        })

        console.log(user)

        if (!user) {
            throw new AppError("invalid email or password!")
        }

        const passwordMatched = compare(password, user.password)

        if (!password) {
            throw new AppError("invalid email or password!")
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ role: user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn: "1d"
        }
        )


        const { password: hashedPassword, ...userWithoutPassword } = user


        return res.json({ token, user: userWithoutPassword })
    }
}

export { SessionController }