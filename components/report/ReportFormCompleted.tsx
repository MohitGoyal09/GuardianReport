'use client'

interface ReportFormProps {
    data : any,
    onComplete : (data : any) => void
}

export function ReportSubmitted({ data, onComplete }: ReportFormProps) {
  const ReportId = data.reportId || "ERROR-ID-NOT-FOUND";
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-zinc-400">Report Submitted</h1>
      <p className="text-lg text-zinc-400 mt-4">
        Your report has been submitted successfully
      </p>
    </div>
  );
}