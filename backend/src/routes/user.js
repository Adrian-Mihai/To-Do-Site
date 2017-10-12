const express = require("express");
const multer = require("multer");
const router = express.Router();

const userController = require("../controllers/user_controller");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(
      null,
      "Site/To-Do-Site/../../../frontend/src/public/user_profile_photo/"
    );
  },
  filename: function(req, file, callback) {
    const name = file.originalname.split(".")[0];
    const ext = file.mimetype.split("/")[1];
    callback(null, name + "_" + Date.now() + "." + ext);
  }
});

const upload = multer({ storage: storage }).any();

router.post("/login", userController.Login);
router.post("/regist", upload, userController.Regist);
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", upload, userController.editUser);
router.get("/get_points/:id", userController.getPoints);

module.exports = router;
