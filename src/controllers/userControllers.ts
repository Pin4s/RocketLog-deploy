import { Request, Response } from "express";

class UserController {

    create(req: Request, res: Response) {
        return res.json({ message: "ok!" })
    }
}

export { UserController }