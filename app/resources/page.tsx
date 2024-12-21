"use client";
import {
  Book,
  FileText,
  Video,
  Link as LinkIcon,
  HelpCircle,
} from "lucide-react";

interface Resource {
  title: string;
  description: string;
  link: string;
  icon: JSX.Element;
  category: string;
}

export default function Resources() {
  const resources: Resource[] = [
    // Documentation Section
    {
      title: "User Guide",
      description: "Complete guide on how to use the Report Tracking System",
      link: "/docs/user-guide",
      icon: <Book className="w-5 h-5" />,
      category: "Documentation",
    },
    {
      title: "API Documentation",
      description: "Technical documentation for integrating with our API",
      link: "/docs/api",
      icon: <FileText className="w-5 h-5" />,
      category: "Documentation",
    },

    // Tutorial Section
    {
      title: "Getting Started",
      description: "Quick start guide for new users",
      link: "/tutorials/getting-started",
      icon: <Video className="w-5 h-5" />,
      category: "Tutorials",
    },
    {
      title: "Advanced Features",
      description: "Learn about advanced tracking features",
      link: "/tutorials/advanced",
      icon: <Video className="w-5 h-5" />,
      category: "Tutorials",
    },

    // FAQ Section
    {
      title: "Common Questions",
      description: "Frequently asked questions about report tracking",
      link: "/faq",
      icon: <HelpCircle className="w-5 h-5" />,
      category: "FAQ",
    },
  ];

  const categories = resources
    .map((resource) => resource.category)
    .filter((category, index, array) => array.indexOf(category) === index);


  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-900 to-black px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              Resources & Documentation
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Everything you need to know about using our Report Tracking System
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-xl font-semibold text-white mb-6">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources
                  .filter((resource) => resource.category === category)
                  .map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.link}
                      className="group block p-6 bg-zinc-900/50 backdrop-blur-xl 
                               rounded-2xl border border-white/5 hover:border-sky-500/20 
                               transition-all duration-200 hover:bg-sky-500/5"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="p-2 bg-sky-500/10 rounded-lg text-sky-400 
                                      group-hover:bg-sky-500/20 transition-colors"
                        >
                          {resource.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-white flex items-center gap-2">
                            {resource.title}
                            <LinkIcon
                              className="w-4 h-4 opacity-0 group-hover:opacity-100 
                                               transition-opacity text-sky-400"
                            />
                          </h3>
                          <p className="mt-2 text-sm text-zinc-400">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div
          className="mt-16 p-8 bg-zinc-900/50 backdrop-blur-xl rounded-2xl 
                       border border-white/5 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Need Additional Help?
          </h2>
          <p className="text-zinc-400 mb-6">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <button
            className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 
                           rounded-xl transition-colors duration-200"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
