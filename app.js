require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require("./api/users/user.router");
const adRouter = require("./api/ad/ad.router");
const cityRouter = require("./api/city/city.router");
const weightRouter = require("./api/weight/weight.router");
const categoryRouter = require("./api/category/category.router");
const pickupRouter = require("./api/pickup/pickup.router");
const addressRouter = require("./api/address/address.router");
const multer = require("multer");
const path = require("path");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/image", express.static("image"));
app.use(cors({origin: '*'}));

let imageName = "";
const storage = multer.diskStorage({
  destination: path.join("./image"),
  filename: function (req, file, cb) {
    imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});
app.use(multer({
    storage: storage,
    limits: { fileSize: 512000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg+xml" || file.mimetype == "image/JPG" || file.mimetype == "image/JPEG") {
            cb(null, true);
        } else {
        return cb(new Error('Invalid file extension!'));
        }
    }
}).any());

app.use("/api/users", userRouter);
app.use("/api/ad", adRouter);
app.use("/api/city", cityRouter);
app.use("/api/weight", weightRouter);
app.use("/api/category", categoryRouter);
app.use("/api/pickup", pickupRouter);
app.use("/api/address", addressRouter);

app.listen(process.env.PORT, () => {
    console.log("Server Up & Running On PORT : ", process.env.PORT);
})