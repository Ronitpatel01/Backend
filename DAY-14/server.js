const app = require("./src/app");
// const connectDB = require("./src/config/database");
// const authRouter = require("./src/routes/auth.routes");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// app.use("/api/auth", authRouter);

// connectDB();