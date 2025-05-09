import "express-async-errors"
import { errorHandling } from "./middlewares/errorHandling"
import { routes } from "./routes"

import express from "express"


const app = express()

app.use(express.json())
app.use(routes)

app.use(errorHandling)

export { app }