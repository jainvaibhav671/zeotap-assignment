import { Router } from "express"

const router = Router()

// Test route
router.get("/", (_req, res) => {
    res.send({
        message: "Hello, Weather!"
    })
})

export default router
