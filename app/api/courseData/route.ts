import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export const runtime = "nodejs"; 

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  sections: { type: [{ type: [{ type: String, required: true }, { type: [String], required: true }], required: true }], required: true },
  price: { type: Number, required: true }
});

const CourseNew = mongoose.models.Details || mongoose.model("Details", courseSchema, "Details");

let data: { course_name: string; instructor: string; description: string; duration: string; sections: { type: string; content: string[] }[], price: Number }[] = [];

export async function GET() {
  try {
    const databaseName = process.env.DATABASE_NAME || "default_db";
    await connectDB(databaseName);
    data = await CourseNew.find();
    
    if (!data || data.length === 0) {
      return NextResponse.json({ result: "No data found" }, { status: 404 });
    }
    return NextResponse.json({ result: data });
  } 
  catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json({ 
      error: "Failed to fetch data", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}