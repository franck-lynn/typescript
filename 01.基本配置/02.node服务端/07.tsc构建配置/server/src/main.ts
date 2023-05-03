import express, { Express } from "express"

const app: Express = express()
const HOST_NAME = "http://localhost"
const PORT = 3000

app.get("/", (req, res) => {
  res.send("hello express + ts!")
})

app.listen(PORT, () => {
  console.log(`Server is running at ${HOST_NAME}:${PORT}`)
})
