import mongoose from "mongoose";
const { Schema } = mongoose;

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseCover: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  lessons: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    material: {
      type: String,
    },
  }],
},{timestamps: true});

export default mongoose.model("Course", CourseSchema);
