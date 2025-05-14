import { Request, Response, NextFunction } from "express";


class DeliveriesController {
    create(req: Request, res: Response, next: NextFunction) {
        return res.json("Ok!")
    }
}

export { DeliveriesController }