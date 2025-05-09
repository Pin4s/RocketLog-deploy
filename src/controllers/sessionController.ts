import { Request, Response } from "express"

class SessionController{
    create(req: Request, res:Response){
       return res.json({message: "Seesion Create OK"})
    }
}

export {SessionController}