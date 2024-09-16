require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
require("./routes/user.routes")(app);
require("./routes/task.routes")(app);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log("Server started " + process.env.PORT);
});
