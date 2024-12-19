'use client'

import { useState } from "react";

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/20 overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8))]" />
      </div>

      <main className="relative px-6 pt-24 pb-32">
        <div className="mx-auto max-w-6xl">
          {/* Enhanced Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-10 items-center gap-2.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-5 text-sm font-medium text-sky-400 transition-colors hover:bg-sky-500/15">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Understanding Our Process
            </div>

            <h1 className="mt-10 text-6xl font-bold tracking-tight text-white">
              How SafeReport Works
              <span className="mt-4 block text-2xl bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Your Safety is Our Priority
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Learn how we protect your identity while ensuring your report
              reaches the right authorities. Our secure platform guarantees
              anonymity at every step.
            </p>
          </div>

          {/* Enhanced Process Steps */}
          <div className="mt-32 grid gap-8">
            {[
              {
                step: "01",
                title: "Submit Your Report",
                description:
                  "Fill out our secure form with as much detail as possible. No personal information is required. You can include photos, videos, or documents if available.",
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Encryption & Anonymization",
                description:
                  "Your report is immediately encrypted using military-grade protocols. All identifying metadata is stripped from your submission, including IP address and device information.",
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Verification & Routing",
                description:
                  "Our system verifies the report's jurisdiction and automatically routes it to the appropriate law enforcement agency. The entire process maintains your anonymity.",
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
              {
                step: "04",
                title: "Secure Communication Channel",
                description:
                  "If needed, law enforcement can communicate with you through our encrypted platform using your anonymous report ID. You maintain control over the conversation.",
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm transition-all duration-300"
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div
                  className={`relative flex gap-8 p-8 transition-transform duration-300 ${
                    hoveredStep === i ? "translate-x-2" : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-centerd-xl bg-sky-500/10 text-sky-400 transition-colors duration-300 group-hover:bg-sky-500/20">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-sky-400">
                      Step {step.step}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Security Features */}
          <div className="mt-32 rounded-2xl bg-zinc-900/50 backdrop-blur-sm p-12">
            <h2 className="text-3xl font-bold text-white text-center">
              Enterprise-Grade Security
            </h2>
            <p className="mt-4 text-center text-zinc-400 max-w-2xl mx-auto">
              We implement the highest standards of security to protect your
              identity and information
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {[
                {
                  title: "End-to-End Encryption",
                  description:
                    "All data is encrypted in transit and at rest using AES-256 encryption",
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Zero-Knowledge Architecture",
                  description:
                    "We never store IP addresses or any identifying user metadata",
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Regular Security Audits",
                  description:
                    "Independent security firms verify our systems quarterly",
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  ),
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl bg-zinc-800/50 p-8 transition-colors duration-300 hover:bg-zinc-800"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition-colors duration-300 group-hover:bg-sky-500/20">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="mt-32 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Make a Difference?
            </h2>
            <p className="mt-4 text-zinc-400">
              Your report can help create a safer community for everyone
            </p>
            <button className="mt-8 group relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-400">
              Start Anonymous Report
              <svg
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
