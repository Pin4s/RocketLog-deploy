import request from "supertest"
import { prisma } from "@/database/prisma"
import { app } from "@/app"


describe("user controller", () => {
    let user_id: string
    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } })
    })

    it("should create a new user successfully", async () => {
        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("Test User")

        user_id = response.body.id
    })

    it("should trhow an error if user with same email already exist", async () => {
        const response = await request(app).post("/users").send({
            name: "Duplicate User",
            email: "testuser@example.com",
            password: "password123"
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("A user with this email already exist")
    })

    it("should trhow an error if user email is invalid", async () => {
        const response = await request(app).post("/users").send({
            name: "Duplicate User",
            email: "testuserexample.com",
            password: "password123"
        })

        expect(response.status).toBe(400)
    })
})

