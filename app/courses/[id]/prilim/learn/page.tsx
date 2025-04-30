import { Suspense } from "react";
import { CourseContent } from "./components/CourseContent";

async function getCourseData() {
  let result: any = {};
  try {
    const response = await fetch(`http://eduminati-omega.vercel.app/api/courseData`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course data: ${response.status}`);
    }
    result = await response.json();
  } catch (error) {
    console.error("Error fetching course data:", error);
    return null; // Return null if fetch fails
  }

  // Ensure result.result exists and is an array
  if (!result.result || !Array.isArray(result.result) || result.result.length === 0) {
    console.error("Invalid course data format");
    return null; // Return null if data is invalid
  }

  return {
    id: "1",
    title: result.result[0]?.course_name || "Unknown Course",
    instructor: result.result[0]?.course_instructor || "Unknown Instructor",
    description: result.result[0]?.course_description || "No description available",
    duration: result.result[0]?.course_duration || "N/A",
    chapters: result.result[0]?.course_sections?.map((section: any) => ({
      title: section[0] || "Untitled Section",
      duration: section[1] || "N/A",
      totalVideos: section[2] || "N/A",
      lessons: section[3]?.map((lesson: any) => ({
        title: lesson || "Untitled Lesson",
      })) || [],
    })) || [],
  };
}

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page() {
  const courseData = await getCourseData();

  if (!courseData) {
    return <div>Error loading course data. Please try again later.</div>;
  }

  return (
    <Suspense fallback={<div>Loading course content...</div>}>
      <CourseContent courseData={courseData} />
    </Suspense>
  );
}
