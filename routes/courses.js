import express, { Router } from "express";
import { createError } from "../utils/error.js";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courseController.js";
import {
  verifyAdmin,
  verifyTeacher,
  verifyTecherOrAdmin,
  verifyToken,
  verifyUser,
} from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", createCourse);

//UPDATE
router.put("/:id",  updateCourse);

//DELETE
router.delete("/:id", deleteCourse);

//GET
router.get("/:id", getCourse);

//GETALL
router.get("/", getCourses);

export default router;
