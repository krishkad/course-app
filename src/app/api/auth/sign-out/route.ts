import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    const response = NextResponse.json({ success: true, message: "ok" });
    response.cookies.delete("course-app-authentication");
    return response;
  } catch (error) {
    console.log("ERROR WHILE LOGGING OUT: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
