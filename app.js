require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require("./api/users/user.router");
const adRouter = require("./api/ad/ad.router");
const locationRouter = require("./api/location/location.router");

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use("/api/users", userRouter);
app.use("/api/ad", adRouter);
app.use("/api/location", locationRouter);

app.listen(process.env.PORT, () => {
    console.log("Server Up & Running On PORT : ", process.env.PORT);
})