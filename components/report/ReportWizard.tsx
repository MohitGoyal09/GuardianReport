"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReportForm = dynamic(
  () => import("./ReportForm").then((mod) => mod.ReportForm),
  {
    ssr: false,
  }
);

const ReportSubmitted = dynamic(
  () => import("./ReportFormCompleted").then((mod) => mod.ReportSubmitted),
  {
    ssr: false,
  }
);

export function ReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<any>(null);

  const handleStepComplete = async (data: any) => {
    setReportData({ ...reportData, ...data });

    if (currentStep === 4) {
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="rounded-2xl bg-zinc-900 p-8">
      {currentStep === 1 && <ReportForm onComplete={handleStepComplete} />}
      {currentStep === 2 && (
        <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
      )}
    </div>
  );
}
