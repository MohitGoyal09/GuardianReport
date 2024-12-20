import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function GET(request : Request , 
   { params} : {params : {reportId : string}}
) {
   try {
       const report = await prisma.report.findUnique({
              where : {
                reportId : params.reportId
              }
         })
            if (!report) {
              return NextResponse.json(
                { error: "Report not found" },
                { status: 404 }
              );
            }
            return NextResponse.json(report);
   } catch (error) {
       console.error("Error fetching report:", error);
       return NextResponse.json(
            {
            error: "Failed to fetch report",
            },
            { status: 500 }
        );
   } 
   
}

export async function PATCH(request : Request ,
  {params} : {params : {id : string}}
){
    try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
      const {status} = await request.json();
      const report = await prisma.report.update({
        where: {
            id : params.id
        } ,
        data : {
            status
        }
      })
      return NextResponse.json(report);
    } catch(error){
        console.error("Error fetching session:", error);
        return NextResponse.json(
          { error: "Error updating report" },
          { status: 500 }
        );
    }

}

