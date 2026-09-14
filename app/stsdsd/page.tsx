"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    question: "What is the main purpose of STSDSD training?",
    options: [
      "To provide seafarers with security knowledge and skills",
      "To teach marine engineering",
      "To improve cooking skills",
      "To train for navigation only",
    ],
    answer: 0,
  },
  {
    question: "Which of the following is a maritime security threat?",
    options: [
      "Normal maintenance",
      "Cargo theft",
      "Routine cleaning",
      "Normal watchkeeping",
    ],
    answer: 1,
  },
  {
    question: "Which framework provides the maritime security requirements?",
    options: [
      "MARPOL Annex I only",
      "COLREG only",
      "SOLAS Chapter XI-2 and ISPS Code",
      "STCW Chapter II only",
    ],
    answer: 2,
  },
  {
    question: "Security measures should be proportionate to what?",
    options: [
      "Crew size only",
      "The assessed security risk",
      "Ship speed only",
      "Weather conditions only",
    ],
    answer: 1,
  },
  {
    question: "Who retains overall responsibility for the safety and security of the ship?",
    options: [
      "PFSO",
      "CSO",
      "Master",
      "Gangway watchman",
    ],
    answer: 2,
  },
  {
    question: "Who implements and maintains shipboard security arrangements?",
    options: [
      "SSO",
      "PFSO",
      "Catering Officer",
      "Port Authority",
    ],
    answer: 0,
  },
  {
    question: "Who coordinates company security matters?",
    options: [
      "PFSO",
      "CSO",
      "Chief Cook",
      "Duty Engineer",
    ],
    answer: 1,
  },
  {
    question: "Who is responsible for security at the port facility?",
    options: [
      "Master",
      "SSO",
      "PFSO",
      "Chief Officer",
    ],
    answer: 2,
  },
  {
    question: "What is the SSP?",
    options: [
      "Ship Security Plan",
      "Ship Safety Permit",
      "Seafarer Salary Plan",
      "Ship Service Procedure",
    ],
    answer: 0,
  },
  {
    question: "What should personnel do with security-sensitive information?",
    options: [
      "Share it publicly",
      "Post it online",
      "Protect it from unauthorized disclosure",
      "Give it to every visitor",
    ],
    answer: 2,
  },
  {
    question: "Which information should NOT be unnecessarily shared with unauthorized persons?",
    options: [
      "Security plans and access-control information",
      "Public weather information",
      "Public port information",
      "General safety notices",
    ],
    answer: 0,
  },
  {
    question: "What does Security Level 1 represent?",
    options: [
      "Exceptional threat",
      "Normal operating conditions",
      "Imminent attack",
      "Emergency evacuation",
    ],
    answer: 1,
  },
  {
    question: "What does Security Level 2 indicate?",
    options: [
      "No security measures",
      "Heightened risk requiring additional measures",
      "Ship is abandoned",
      "Normal maintenance",
    ],
    answer: 1,
  },
  {
    question: "What does Security Level 3 indicate?",
    options: [
      "Routine operation",
      "Low security concern",
      "Exceptional circumstances where an incident is probable or imminent",
      "Normal port entry",
    ],
    answer: 2,
  },
  {
    question: "Can security level change directly from Level 1 to Level 3?",
    options: [
      "Yes",
      "No, it must always go through Level 2",
      "Only at sea",
      "Only with crew approval",
    ],
    answer: 0,
  },
  {
    question: "What should be done before allowing a person access to the ship?",
    options: [
      "Ignore their identity",
      "Verify identity and authorization",
      "Allow everyone freely",
      "Give them a master key",
    ],
    answer: 1,
  },
  {
    question: "Which may be used for access control?",
    options: [
      "Badges, passes and access logs",
      "Personal mobile phones only",
      "Cash receipts",
      "Food menus",
    ],
    answer: 0,
  },
  {
    question: "What should be done if someone attempts to bypass access controls?",
    options: [
      "Ignore it",
      "Give them access",
      "Report it through the security reporting chain",
      "Argue with them",
    ],
    answer: 2,
  },
  {
    question: "Which is an example of a restricted area?",
    options: [
      "Bridge",
      "Public road",
      "Port restaurant",
      "Public waiting room",
    ],
    answer: 0,
  },
  {
    question: "Who should be allowed into a restricted area?",
    options: [
      "Anyone who asks",
      "Only persons with authorized legitimate operational need",
      "All visitors",
      "Children of crew members",
    ],
    answer: 1,
  },
  {
    question: "What should be done if forced entry or damaged locks are found?",
    options: [
      "Repair it secretly and say nothing",
      "Ignore it",
      "Report the security breach immediately",
      "Allow more people inside",
    ],
    answer: 2,
  },
  {
    question: "What should be confirmed before allowing a visitor or contractor onboard?",
    options: [
      "Identity, purpose and authorization",
      "Favourite food",
      "Personal opinion",
      "Nationality only",
    ],
    answer: 0,
  },
  {
    question: "What is the correct action for an unattended suspicious package?",
    options: [
      "Open it",
      "Move it to another location",
      "Do not touch it, keep people away and report it",
      "Take it to the office",
    ],
    answer: 2,
  },
  {
    question: "What information should a factual security report include?",
    options: [
      "Rumours only",
      "Time, location, description and observed behaviour",
      "Personal accusations",
      "Unconfirmed stories",
    ],
    answer: 1,
  },
  {
    question: "How should a suspicious object be handled?",
    options: [
      "Touch and inspect it",
      "Open it carefully",
      "Follow the approved security/emergency procedure",
      "Throw it overboard",
    ],
    answer: 2,
  },
  {
    question: "Which is a recognized maritime security threat?",
    options: [
      "Piracy and armed robbery",
      "Routine painting",
      "Normal bunkering",
      "Routine meal service",
    ],
    answer: 0,
  },
  {
    question: "What should be reported under the ship security procedures?",
    options: [
      "Unauthorized boarding or broken security seals",
      "Normal crew meals",
      "Routine cleaning",
      "Normal watch changes",
    ],
    answer: 1,
  },
  {
    question: "A good security report should be:",
    options: [
      "Delayed and emotional",
      "Prompt, factual and clear",
      "Based on rumours",
      "Anonymous and unclear",
    ],
    answer: 1,
  },
  {
    question: "Security equipment should be:",
    options: [
      "Disabled whenever inconvenient",
      "Bypassed without permission",
      "Used and maintained according to approved procedures",
      "Ignored during drills",
    ],
    answer: 2,
  },
  {
    question: "What should happen after a security drill or exercise?",
    options: [
      "Nothing",
      "Debrief strengths, deficiencies and corrective actions",
      "Delete all records",
      "Stop all security training",
    ],
    answer: 1,
  },
];

const TOTAL_TIME = 30 * 60;
const PASS_MARK = 18;

export default function STSDSDPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [name, setName] = useState("");
  const [indos, setIndos] = useState("");
async function submitTest() {
  if (submitted) return;

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].answer ? 1 : 0);
  }, 0);

  const { error } = await supabase.from("exam_results").insert([
    {
      candidate_name: name,
      candidate_no: Number(indos),
      course: "STSDSD",
      score: score,
    },
  ]);

  if (error) {
    console.error("Error saving result:", error);
    return;
  }

  setSubmitted(true);
}
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const selectAnswer = (index: number) => {
    if (submitted) return;

    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  };

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);
  const passed = score >= PASS_MARK;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const restart = () => {
    setCurrent(0);
    setAnswers(Array(questions.length).fill(-1));
    setSubmitted(false);
    setTimeLeft(TOTAL_TIME);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="text-center text-3xl font-bold text-blue-900">
              YAK EDUCATION TRUST
            </h1>

            <h2 className="mt-2 text-center text-xl font-semibold">
              STSDSD CBT Result
            </h2>

            <div className="mt-8 rounded-xl bg-gray-100 p-6 text-center">
              <p className="text-lg">
                Candidate: <strong>{name || "Not Provided"}</strong>
              </p>

              <p className="mt-1">
                INDOS No.: <strong>{indos || "Not Provided"}</strong>
              </p>

              <p className="mt-6 text-5xl font-bold text-blue-800">
                {score}/{questions.length}
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {percentage}%
              </p>

              <p
                className={`mt-4 text-2xl font-bold ${
                  passed ? "text-green-600" : "text-red-600"
                }`}
              >
                {passed ? "PASS" : "FAIL"}
              </p>

              <p className="mt-2 text-gray-600">
                Passing marks: {PASS_MARK}/{questions.length}
              </p>
            </div>

            <h3 className="mt-8 text-xl font-bold">Answer Review</h3>

            <div className="mt-4 space-y-4">
              {questions.map((q, index) => {
                const correct = answers[index] === q.answer;

                return (
                  <div
                    key={index}
                    className="rounded-xl border p-4"
                  >
                    <p className="font-semibold">
                      Q{index + 1}. {q.question}
                    </p>

                    <p className="mt-2">
                      Your answer:{" "}
                      <span
                        className={
                          correct
                            ? "font-semibold text-green-600"
                            : "font-semibold text-red-600"
                        }
                      >
                        {answers[index] >= 0
                          ? q.options[answers[index]]
                          : "Not answered"}
                      </span>
                    </p>

                    <p className="mt-1 text-green-700">
                      Correct answer: {q.options[q.answer]}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={restart}
              className="mt-8 w-full rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800"
            >
              Restart Test
            </button>
          </div>
        </div>
      </main>
    );
  }

  const q = questions[current];

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-2xl bg-white p-6 shadow-lg">
          <h1 className="text-center text-3xl font-bold text-blue-900">
            YAK EDUCATION TRUST
          </h1>

          <h2 className="mt-2 text-center text-xl font-semibold">
            STSDSD CBT Practice Examination
          </h2>

          <p className="mt-1 text-center text-sm text-gray-600">
            Security Training for Seafarers with Designated Security Duties
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Candidate Name"
              className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={indos}
              onChange={(e) => setIndos(e.target.value)}
              placeholder="INDOS Number"
              className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold">
              Question {current + 1} of {questions.length}
            </p>

            <p className="rounded-lg bg-red-100 px-4 py-2 font-bold text-red-700">
              Time: {formatTime(timeLeft)}
            </p>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          <section className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-lg font-bold leading-relaxed">
              Q{current + 1}. {q.question}
            </p>

            <div className="mt-6 space-y-3">
              {q.options.map((option, index) => {
                const selected = answers[current] === index;

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full rounded-xl border-2 p-4 text-left transition ${
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    <span className="font-bold">
                      {String.fromCharCode(65 + index)}.
                    </span>{" "}
                    {option}
                  </button>

                );
              })}
            </div>

            {answers[current] >= 0 && (
              <div className="mt-5 rounded-xl bg-blue-50 p-4 text-blue-800">
                Answer selected. You can change it before submitting.
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <button
                disabled={current === 0}
                onClick={() => setCurrent((q) => q - 1)}
                className="rounded-xl bg-gray-200 px-5 py-3 font-semibold disabled:opacity-40"
              >
                Previous
              </button>

              {current < questions.length - 1 ? (
                <button
                  onClick={() => setCurrent((q) => q + 1)}
                  className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
                >
                  Next
                </button>
              ) : (
                <button
  onClick={submitTest}
  className="rounded-xl bg-green-600 px-5 py-3 font-bold"
>
  Submit Test
</button>
              )}
            </div>
          </section>

          <aside className="rounded-2xl bg-white p-5 shadow-lg">
            <h3 className="font-bold text-lg">Question Navigator</h3>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`rounded-lg p-2 text-sm font-semibold ${
                    current === index
                      ? "bg-blue-700 text-white"
                      : answers[index] >= 0
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>Answered: {answers.filter((a) => a >= 0).length}</p>
              <p>Remaining: {answers.filter((a) => a < 0).length}</p>
              <p className="mt-2">
                Passing: {PASS_MARK}/{questions.length}
              </p>
            </div>

            <button
             onClick={submitTest}
              className="mt-6 w-full rounded-xl bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700"
            >
              Submit Test
            </button>
          </aside>
        </div>

        <footer className="mt-8 rounded-xl bg-white p-5 text-center text-sm text-gray-600 shadow">
          YAK Education Trust • STSDSD CBT Practice / Internal Assessment
        </footer>
      </div>
    </main>
  );
}