require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require("./api/users/user.router");
const adRouter = require("./api/ad/ad.router");
const cityRouter = require("./api/city/city.router");
const weightRouter = require("./api/weight/weight.router");
const categoryRouter = require("./api/category/category.router");

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use("/api/users", userRouter);
app.use("/api/ad", adRouter);
app.use("/api/city", cityRouter);
app.use("/api/weight", weightRouter);
app.use("/api/category", categoryRouter);

app.listen(process.env.PORT, () => {
    console.log("Server Up & Running On PORT : ", process.env.PORT);
})