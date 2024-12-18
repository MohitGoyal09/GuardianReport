import Link from "next/link";

export default function Home() {
  return (
    <main className="relative px-6 pt-32">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure & Anonymous Reporting
          </div>
          <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
            Report Incident.
          </h1>
          <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent text-3xl ">
            Protect Identity.
          </span>
          <p className="mt-6 mx-w-2xl text-lg text-zinc-400">
            Make your community safer without compromising your safety. Our
            advanced encryption ensures your identity remains completely
            anonymous. Make your community safer without compromising your
            safety. Our advanced encryption ensures your identity remains
            completely anonymous.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href={"/submit-report"}>
              <button className="group relative flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-sm font-medium text-white transition-all hover:bg-sky-400">
                {" "}
                Make Anonymous Report
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
            </Link>
            <Link href={"/how-it-works"}>
              <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/5 px-8 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10">
                {" "}
                How it works
              </button>
            </Link>
          </div>
        </div>
        {/* Features Grid */}
        {/* Features Grid */}
        <div className="mt-40 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Military-Grade Encryption",
              description:
                "Your identity is protected with state-of-the-art encryption protocols",
              icon: (
                <svg
                  className="h-7 w-7 text-sky-400"
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
              title: "Real-time Processing",
              description:
                "Instant verification and secure routing of all reports",
              icon: (
                <svg
                  className="h-7 w-7 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
            },
            {
              title: "Secure Communication",
              description: "Two-way anonymous channel with law enforcement",
              icon: (
                <svg
                  className="h-7 w-7 text-sky-400"
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
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-sm p-8 transition-all hover:bg-zinc-800/80 hover:-translate-y-1 duration-300 shadow-lg hover:shadow-sky-500/10 border border-zinc-800/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 inline-flex rounded-2xl bg-sky-500/10 p-4 transition-all duration-300 group-hover:bg-sky-500/20">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-sky-400">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Stats Section */}
        <div className="mt-40 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-8 backdrop-blur-sm border border-zinc-800/50 shadow-lg">
          <div className="grid gap-y-8 sm:grid-cols-3">
            {[
              {
                value: "100K+",
                label: "Reports Filed",
                color: "from-sky-400 to-blue-500",
              },
              {
                value: "100%",
                label: "Anonymity Rate",
                color: "from-emerald-400 to-teal-500",
              },
              {
                value: "24/7",
                label: "Support Available",
                color: "from-purple-400 to-pink-500",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center transform transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-zinc-400 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Trust Badge */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-zinc-900/50 px-6 py-3 text-sm text-zinc-400 hover:bg-zinc-800/80 transition-all duration-300 border border-zinc-800/50 backdrop-blur-sm shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Trusted by Law Enforcement Nationwide
          </div>
        </div>
      </div>
    </main>
  );
}
