import { AppError } from "@/utils/AppError";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { authConfig } from "@/config/auth";

interface TokenPayload {
    role: string
    sub: string
}


export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            throw new AppError("No auth header detected")
        }

        const [, token] = authHeader.split(" ")
        const { sub: user_id, role } = verify(token, authConfig.jwt.secret) as TokenPayload

        req.user = {
            id: user_id,
            role
        }


    } catch (error) {
        throw new AppError("JWT invalid token!")
    }
}