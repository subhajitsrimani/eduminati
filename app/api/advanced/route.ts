import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export const runtime = "nodejs"; 

const projectSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, 
  answer: { type: String, required: true },
});

const Project = mongoose.models.Advanced || mongoose.model("Advanced", projectSchema, "Advanced");

export async function GET() {
  try {
    const databaseName = process.env.DATABASE_NAME || "default_db";
    await connectDB(databaseName);

    const data = await Project.find();
    
    if (!data || data.length === 0) {
      return NextResponse.json({ result: "No data found" }, { status: 404 });
    }

    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json({ 
      error: "Failed to fetch data", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}