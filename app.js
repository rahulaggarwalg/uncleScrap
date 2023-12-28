require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require("./api/users/user.router");

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server Up & Running On PORT : ", process.env.PORT);
})