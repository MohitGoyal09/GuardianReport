"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";

interface ReportDetails {
  id: string;
  reportId: string;
  status: string;
  createdAt: string;
  title: string;
  description: string;
  location: string;
}

export default function ReportTracker() {
  const [reportId, setReportId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(null);
  const router = useRouter();

  function getStatusIcon(status: string) {
    const icons: Record<string, JSX.Element> = {
      PENDING: <Clock className="w-4 h-4" />,
      IN_PROGRESS: <AlertCircle className="w-4 h-4" />,
      RESOLVED: <CheckCircle className="w-4 h-4" />,
      DISMISSED: <XCircle className="w-4 h-4" />,
    };
    return icons[status] || icons.PENDING;
  }

  function getStatusColor(status: string): string {
    const statusColors: Record<string, string> = {
      PENDING: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      IN_PROGRESS: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      RESOLVED: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      DISMISSED: "text-red-400 bg-red-400/10 border-red-400/20",
    };
    return statusColors[status] || statusColors.PENDING;
  }


  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    setError("");
    setLoading(true);
    setReportDetails(null);
    if (!reportId.trim()) {
      setError("Please enter a report ID");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`/api/reports/${reportId}/details `);
      if (!res.data) {
        setError("Report not found");
        setLoading(false);
        return;
      }
      setReportDetails(res.data);
    } catch (error: any) {
      setError("An error occurred. Please try again later");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-900 to-black px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex h-10 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-6 text-sm text-sky-400">
            <Search className="w-4 h-4" />
            Track Your Report Status
          </div>
          <h1 className="mt-8 text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              Track Your Report,{" "}
            </span>
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Stay Informed
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Enter your report ID to check the current status and get detailed
            updates
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          <div className="flex-1">
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/5 p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label
                    htmlFor="reportId"
                    className="block text-sm font-medium mb-2 text-zinc-400"
                  >
                    Report ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Report ID..."
                    required
                    onChange={(e) => setReportId(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3.5 bg-black/50 border border-white/5 rounded-xl
                             text-white placeholder-zinc-500 focus:outline-none focus:ring-2 
                             focus:ring-sky-500/50 focus:border-transparent transition-all"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20 animate-shake">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 
                           text-white py-4 px-6 rounded-xl hover:from-sky-400 
                           hover:to-blue-500 transition-all duration-200 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center space-x-2
                           shadow-lg shadow-sky-500/20"
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {loading ? "Searching..." : "Track Report"}
                  </span>
                </button>
              </form>
            </div>
          </div>

          <div className="flex-1">
            <div
              className={`transition-all duration-500 ${
                reportDetails
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {reportDetails && (
                <div className="rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-xl h-full">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-3 mb-8">
                    <div className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                    Report Details
                  </h2>

                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-zinc-400">Status</span>
                      <span
                        className={`flex items-center gap-2 font-medium ${getStatusColor(
                          reportDetails.status
                        )} px-4 py-2 rounded-full border`}
                      >
                        {getStatusIcon(reportDetails.status)}
                        {reportDetails.status}
                      </span>
                    </div>

                    {/* Repeat similar styling for other detail items */}
                    <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-zinc-400">Report ID</span>
                      <span className="text-white font-mono bg-white/5 px-4 py-2 rounded-lg">
                        {reportDetails.reportId || reportDetails.id}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-zinc-400">Submitted On</span>
                      <span className="text-white">
                        {new Date(reportDetails.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors space-y-2">
                      <span className="text-zinc-400 text-sm">Title</span>
                      <span className="text-white block font-medium">
                        {reportDetails.title}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors space-y-2">
                      <span className="text-zinc-400 text-sm">Location</span>
                      <span className="text-white block font-medium">
                        {reportDetails.location}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors space-y-2">
                      <span className="text-zinc-400 text-sm">Description</span>
                      <p className="text-white text-sm leading-relaxed">
                        {reportDetails.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


