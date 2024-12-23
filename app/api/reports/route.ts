import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ReportStatus, ReportType } from "@prisma/client";
import { authOptions } from "@/lib/Auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }), 
        { 
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Execute query with proper field selection based on your schema
    const reports = await prisma.report.findMany({
      select: {
        id: true,
        reportId: true,
        type: true,
        title: true,
        description: true,
        reportType: true,
        status: true,
        location: true,
        latitude: true,
        longitude: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
    });

    return new NextResponse(JSON.stringify(reports), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Detailed error in GET /api/reports:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Database error occurred",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }), 
        { 
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate status value
    if (!Object.values(ReportStatus).includes(status)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid status value" }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const updatedReport = await prisma.report.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        updatedAt: new Date()
      },
      select: {
        id: true,
        reportId: true,
        type: true,
        title: true,
        description: true,
        reportType: true,
        status: true,
        location: true,
        latitude: true,
        longitude: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return new NextResponse(JSON.stringify(updatedReport), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error updating report:", error);
    
    // Check if error is a Prisma error for record not found
    if ((error as any).code === 'P2025') {
      return new NextResponse(
        JSON.stringify({ error: "Report not found" }), 
        { 
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        error: "Failed to update report",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
