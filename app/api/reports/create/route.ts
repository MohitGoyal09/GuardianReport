import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { ReportType } from "@prisma/client";

const ReportType = {
  EMERGENCY: "EMERGENCY",
  NON_EMERGENCY: "NON_EMERGENCY"
};
export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("Received report data:", data);

    const requiredFields = [
      "reportId",
      "type",
      "specifiedType",
      "title",
      "description",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`, // Fixed template literal syntax
          },
          { status: 400 }
        );
      }
    }

    const validTypes = Object.values(ReportType);
    if (!validTypes.includes(data.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid report category. Must be one of: ${validTypes.join(", ")}`, // Fixed template literal syntax
        },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
        data : { reportId: data.reportId,
        type: data.type as typeof ReportType[keyof typeof ReportType],
        reportType: data.specifiedType,
        title: data.title,
        location: data.location,
        description: data.description,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        image: data.image || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      reportId: report.reportId,
      message: "Report submitted successfully",
    });
  } catch (error: any) {
    console.error("Error creating report:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to submit report",
      },
      { status: 500 }
    );
  }
}
