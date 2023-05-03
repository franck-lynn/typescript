import { yoga } from "./yoga"

import app from "./application"
import { HOST_NAME, PORT } from "./contstants"

app.use("/graphql", yoga)

app.listen(PORT, () => {
  console.log(`Server is running at ${HOST_NAME}:${PORT}`)
})
