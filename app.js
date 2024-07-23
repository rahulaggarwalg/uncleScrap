require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require("./api/users/user.router");
const adRouter = require("./api/ad/ad.router");
const cityRouter = require("./api/city/city.router");
const weightRouter = require("./api/weight/weight.router");
const categoryRouter = require("./api/category/category.router");

const multer = require("multer");
const path = require("path");

app.use(cors());
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
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
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

app.listen(process.env.PORT, () => {
    console.log("Server Up & Running On PORT : ", process.env.PORT);
})