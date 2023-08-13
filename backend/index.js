const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const { fileURLToPath } = require("url");
const { error } = require("console");
// const User = require("./models/UserModel")
// const Post = require("./models/PostModel")
// const { users, posts } = require("./data/index.js")

const { register } = require("./controllers/authController.js");
const authRoutes = require("./routes/authRoute.js");
const userRoutes = require("./routes/userRoute.js");
const postRoutes = require("./routes/postsRoutes.js");
const { verifyToken } = require("./middleware/authentication.js");
const { createPost } = require("./controllers/postsController.js");

/* Config */

console.log(__filename + __dirname);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* Routes With Files */

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* Routes */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



/* Mongoose Setup */

const port = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ChitChat",
  })
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));