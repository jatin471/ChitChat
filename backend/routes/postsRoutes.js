const express = require("express")
const {getFeedPosts ,getUserPosts , likePost} = require("../controllers/postsController")
const {verifyToken} =require("../middleware/authentication")

const router = express.Router()

//Read
router.get("/",verifyToken,getFeedPosts) 
router.get("/:userId/posts",verifyToken,getUserPosts)

//Update

router.patch("/:id/like",verifyToken,likePost)

module.exports = router