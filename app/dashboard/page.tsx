"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<ReportType | "ALL">("ALL");

  useEffect(() => {
    fetchReports();
  }, []);

 const fetchReports = async () => {
   setLoading(true);
   setError(null);
   try {
     const response = await axios.get("/api/reports");
     if (!response.data) {
       throw new Error("No data received from server");
     }
     setReports(response.data);
   } catch (error) {
     console.error("Error fetching reports:", error);
     if (axios.isAxiosError(error)) {
       const errorMessage =
         error.response?.data?.error ||
         error.response?.data?.details ||
         "Failed to load reports. Please check your database connection.";
       setError(errorMessage);

       // Log additional details in development
       if (process.env.NODE_ENV === "development") {
         console.error("Detailed error:", error.response?.data);
       }
     } else {
       setError("An unexpected error occurred. Please try again later.");
     }
   } finally {
     setLoading(false);
   }
 };



  const updateReportStatus = async (reportId: string, status: ReportStatus) => {
    try {
      const response = await axios.put("/api/reports", {
        id: reportId,
        status,
      });
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId ? { ...report, status } : report
        )
      );
    } catch (error) {
      console.error("Error updating report status:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          signOut();
          return;
        }
        setError(
          error.response?.data?.error ||
            "Failed to update report status. Please try again later."
        );
      } else {
        setError("An unexpected error occurred while updating the status.");
      }
    }
  };


  const filteredReports = reports.filter((report) => {
    const statusMatch =
      statusFilter === "ALL" || report.status === statusFilter;
    const typeMatch = typeFilter === "ALL" || report.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDING: "bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20",
      IN_PROGRESS: "bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20",
      RESOLVED: "bg-green-500/10 text-green-500 ring-1 ring-green-500/20",
      DISMISSED: "bg-red-500/10 text-red-500 ring-1 ring-red-500/20",
    };
    return colors[status] || colors.PENDING;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-neutral-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-neutral-400 text-sm">
                Welcome, {session?.user?.name || "Admin"}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-900 rounded-lg hover:bg-neutral-800 border border-neutral-800 transition-all hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="statusFilter"
                className="text-sm text-neutral-400"
              >
                Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as ReportStatus | "ALL")
                }
                className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 min-w-[150px]"
              >
                <option value="ALL">All Statuses</option>
                {Object.values(ReportStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="typeFilter" className="text-sm text-neutral-400">
                Type
              </label>
              <select
                id="typeFilter"
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as ReportType | "ALL")
                }
                className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 min-w-[150px]"
              >
                <option value="ALL">All Types</option>
                {Object.values(ReportType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-neutral-400 text-sm">
            {filteredReports.length}{" "}
            {filteredReports.length === 1 ? "Report" : "Reports"}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-medium text-neutral-200">
                      {report.title}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <p className="text-neutral-400 text-sm line-clamp-3">
                    {report.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-neutral-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {report.type}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-neutral-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {report.location || "N/A"}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-neutral-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {report.image && (
                    <img
                      src={report.image}
                      alt="Report evidence"
                      className="mt-4 rounded-lg border border-neutral-800 max-h-48 object-cover"
                    />
                  )}
                </div>

                <label
                  htmlFor={`status-select-${report.id}`}
                  className="sr-only"
                >
                  Update Status
                </label>
                <select
                  id={`status-select-${report.id}`}
                  value={report.status}
                  onChange={(e) =>
                    updateReportStatus(
                      report.id,
                      e.target.value as ReportStatus
                    )
                  }
                  className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 min-w-[140px]"
                >
                  {Object.values(ReportStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-neutral-500 bg-neutral-900/50 rounded-xl border border-neutral-800">
              No reports found matching the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
