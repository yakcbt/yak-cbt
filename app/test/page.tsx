"use client";

import Link from "next/link";

const courses = [
  {
    name: "PST",
    fullName: "Personal Survival Techniques",
    route: "/pst",
    questions: "33 Questions",
    time: "30 Minutes",
  },
  {
    name: "FPFF",
    fullName: "Fire Prevention & Fire Fighting",
    route: "/fpff",
    questions: "33 Questions",
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
  fullName: "Security Training for Seafarers with Designated Security Duties",
  route: "/stsdsd",
  questions: "30 Questions",
  time: "30 Minutes",
},  


];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      
      {/* Header */}
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="text-4xl font-bold text-blue-900">
          YAK EDUCATION TRUST
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          STCW CBT Practice Examination Portal
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Select Your Course
          </h2>

          <p className="mt-2 text-gray-600">
            Choose a course below to start your CBT practice test.
          </p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.name}
            className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-blue-800">
                {course.name}
              </h3>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                CBT
              </span>
            </div>

            <p className="mt-4 min-h-[48px] text-gray-700">
              {course.fullName}
            </p>

            <div className="mt-5 flex justify-between text-sm text-gray-600">
              <span>📝 {course.questions}</span>
              <span>⏱️ {course.time}</span>
            </div>

            <Link
              href={course.route}
              className="mt-6 block rounded-xl bg-blue-700 px-5 py-3 text-center font-bold text-white transition hover:bg-blue-800"
            >
              Start CBT
            </Link>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-12 max-w-6xl rounded-xl bg-white p-5 text-center text-sm text-gray-600 shadow">
        YAK Education Trust © 2026
        <br />
        STCW CBT Practice / Internal Assessment
      </footer>

    </main>
  );
{
 
}
}