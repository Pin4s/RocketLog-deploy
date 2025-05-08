import { errorHandling } from "./middlewares/errorHandling"
import { routes } from "./routes"

import express from "express"

import "express-async-errors"

const app = express()

app.use(express.json())
app.use(routes)

app.use(errorHandling)

export { app }