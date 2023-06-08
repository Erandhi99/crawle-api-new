import express from "express";
import {
  deleteUser,
  enrollCourse,
  getTotalCoursesCreated,
  getTotalEnrolledCount,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyTeacher, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello, You are now logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello User, You are now logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, You are now logged in and you can delete all accounts");
// });

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GETALL
router.get("/", verifyAdmin, getUsers);

//ENROLL COURSE
router.post("/enroll", verifyToken, enrollCourse);

//GET TOTAL ENROLLMENT COUNT CERTAIN COURSE
router.get("/:courseId/student-count", verifyTeacher, getTotalEnrolledCount);

//GET TOTAL COURSE COUNT BY TEACHER
router.get("/:userId/total-courses-created", verifyTeacher, getTotalCoursesCreated);

export default router;
