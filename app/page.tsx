"use client";

import Link from "next/link";

const courses = [
  {
    name: "PST",
    fullName: "Personal Survival Techniques",
    route: "/pst",
    questions: "30 Questions",
    time: "30 Minutes",
  },
  {
    name: "FPFF",
    fullName: "Fire Prevention & Fire Fighting",
    route: "/fpff",
    questions: "30 Questions",
    time: "35 Minutes",
  },
  {
    name: "PSSR",
    fullName: "Personal Safety & Social Responsibilities",
    route: "/pssr",
    questions: "30 Questions",
    time: "30 Minutes",
  },
  {
    name: "EFA",
    fullName: "Elementary First Aid",
    route: "/efa",
    questions: "30 Questions",
    time: "30 Minutes",
  },
  {
    name: "STSDSD",
    fullName:
      "Security Training for Seafarers with Designated Security Duties",
    route: "/stsdsd",
    questions: "30 Questions",
    time: "30 Minutes",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
            YAK EDUCATION TRUST
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-blue-800 md:text-5xl">
            STCW CBT
          </h1>

          <p className="mt-2 text-lg font-semibold text-gray-700">
            Practice Examination Portal
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
            Select your STCW course below and start your Computer Based Test.
          </p>
        </header>

        {/* Course Section */}
        <section>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Select Your Course
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose a course to begin your CBT practice examination.
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.name}
                className="group flex min-h-[245px] flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Course name */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-extrabold text-blue-700">
                      {course.name}
                    </h3>

                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-600">
                      {course.fullName}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    CBT
                  </span>
                </div>

                {/* Course details */}
                <div className="mt-auto pt-5">
                  <div className="mb-5 flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <span>📝</span>
                      {course.questions}
                    </span>

                    <span className="flex items-center gap-2">
                      <span>⏱️</span>
                      {course.time}
                    </span>
                  </div>

                  {/* Start button */}
                  <Link
                    href={course.route}
                    className="block w-full rounded-xl bg-blue-600 px-5 py-3 text-center font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    Start CBT
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm font-semibold text-gray-600">
            YAK EDUCATION TRUST
          </p>

          <p className="mt-1 text-xs text-gray-400">
            STCW CBT Practice / Internal Examination Portal
          </p>
        </footer>

      </div>
    </main>
  );
}