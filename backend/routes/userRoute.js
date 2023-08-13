const express = require("express");
const { verifyToken } = require("../middleware/authentication.js");
const { getUser, getUserFriends, addRemoveFriend } = require("../controllers/userController.js");

const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// Update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

module.exports = router;
