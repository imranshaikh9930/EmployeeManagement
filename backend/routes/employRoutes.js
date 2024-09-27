const express = require("express");
const multer = require("multer");
const authMiddleWare = require("../middleware/auth");
const {dashboardController,createEmployController,getAllEmployee,removeEmployee,updateEmployee}  = require("../controllers/employController")
// const {  } = require("../controllers/userController");

const router = express.Router();

const storage = multer.diskStorage({
    destination:"images/uploads",
    filename:(req,file,cb)=>{
        console.log(file.originalname);
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage:storage});

router.get("/dashboard",authMiddleWare,dashboardController);
router.post("/create",upload.single("image"),createEmployController);
router.get("/get-all",getAllEmployee)
router.delete("/:id",removeEmployee);
router.put("/:id",upload.single("image"),updateEmployee);

module.exports = router;