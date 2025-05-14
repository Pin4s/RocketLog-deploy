import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

export function verifyUserAuthentication(role: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user){
            throw new AppError("Unauthorized!", 401)
        }

        if(!role.includes(req.user.role)){
            throw new AppError("Unauthorized!", 401)
        }

        return next()
    }
}
