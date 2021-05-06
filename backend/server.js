const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

//db connection
const dbUri =
  "mongodb+srv://articlesHB:articlesHB123@cluster0.na6kn.mongodb.net/articlesDB";

app.use(cors());
app.use(express.json());

//connect to mongoose
mongoose.connect(dbUri);

//require route
app.use("/articles", require("./routes/articleRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3002, function () {
  console.log("express server is running on port 3002");
});
