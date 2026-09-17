"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
type Question = {
  q: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    q: "Which one of the listed requirements regarding the stowage of a survival craft corresponds to present SOLAS regulations? Each Survival Craft shall be stowed",
    options: [
      "Wherever space is available",
      "In a state of readiness so that 2 crew members can prepare for launching in less than 5 minutes",
      "On the starboard side of the Ship",
      "In a secure and sheltered position and protected from damage by fire or explosion",
    ],
    answer: 3,
  },
  {
    q: "Maximum capacity of lifeboat is?",
    options: [
      "28 Persons",
      "30 Persons",
      "150 persons",
      "100 persons",
    ],
    answer: 2,
  },
  {
    q: "MOB Marker Buoy is used in case",
    options: [
      "The ship is on fire",
      "When some crew member fall into the sea",
      "When the ship is sinking",
      "When some crew has an injury",
    ],
    answer: 1,
  },
  {
    q: "What is fire wire?",
    options: [
      "Wire for pulling burning ships off the pier",
      "Wire for handling fire buckets",
      "Wire for pulling fire hoses up to the bridge",
      "Wire for securing smoke divers",
    ],
    answer: 0,
  },
  {
    q: "A ship is in distress should transmit alarm signal followed by the distress call and message on one or all of the international distress frequencies?",
    options: [
      "550 Khz, 2367 Khz and 121.5 Mhz",
      "500 Khz, 2182 Khz and 156.8 Mhz",
      "550 Khz, 2182 Khz and 121.5 Mhz",
      "550 Khz, 2367 Khz and 121.5 Mhz",
    ],
    answer: 1,
  },
  {
    q: "Which one of the listed routine test and inspections of life saving appliances is not required by the regulations?",
    options: [
      "Inspections of Life Saving Appliances, including lifeboat equipment shall be carried out monthly to ensure they are complete and in good order",
      "General emergency alarm to be tested daily",
      "Survival crafts and rescue boat with launching appliances shall be visually inspected weekly to ensure they are ready for use",
      "Lifeboat engines to be run for at least 3 mins every week",
    ],
    answer: 1,
  },
  {
    q: "The number of Lifebuoys on a ship is dependent on",
    options: [
      "What Owners Provide",
      "Minimum of 10",
      "Minimum of 15",
      "Length of the Vessel",
    ],
    answer: 3,
  },
  {
    q: "The number of Lifebuoys on a Cargo ship of length less than 100 mtrs is",
    options: ["8", "6", "4", "10"],
    answer: 0,
  },
  {
    q: "Ship specific LSA information is provided in",
    options: [
      "SOLAS",
      "MARPOL",
      "VERBAL INSTRUCTIONS",
      "SOLAS TRAINING MANUAL",
    ],
    answer: 3,
  },
  {
    q: "Which of the following requirements for immersion Suit is Correct",
    options: [
      "Donned in 2 Minutes",
      "Allow the wearer to Jump from 4.5 Mtrs",
      "Allow the wearer to climb down a vertical ladder of 5 Mtrs",
      "All of the above",
    ],
    answer: 3,
  },
  {
    q: "The donning time for immersion suit is",
    options: ["2 Mins", "5 Mins", "3 Mins", "1 Min"],
    answer: 0,
  },
  {
    q: "When floating in the water in group, they should be in",
    options: [
      "HELP Position",
      "HUDDLE position",
      "Yoga position",
      "None of the above",
    ],
    answer: 1,
  },
  {
    q: "How should the Painter of a Life raft which is fitted with Hydrostatic release be secured to the ship",
    options: [
      "Secured via a Weak Link to a secured point on the ship",
      "Secured to the part of Hydrostatic release",
      "It should not be secured anyway",
      "Directly to a secure point on the ship",
    ],
    answer: 0,
  },
  {
    q: "Which one of the listed requirements regarding the buoyant smoke signal does not correspond to present regulation? The buoyant smoke signal shall",
    options: [
      "Emit smoke for at least 3 mins when floating in calm water",
      "Continue to emit smoke when submerged in water for a period of 10 mins inside 10 cm of water",
      "Not be swamped in a Seaway",
      "Give a bright red light during the entire emission time",
    ],
    answer: 3,
  },
  {
    q: "Which of the listed requirements, regarding rigid life rafts does not correspond to present regulation? The rigid life rafts shall have",
    options: [
      "A manually controlled lamp visible for 2 NM fitted at the top of the canopy",
      "Floor preventing the ingress of water",
      "All entrances fitted with rigid boarding ramps for boarding life rafts at sea",
      "A manually controlled lamp fitted inside the liferaft",
    ],
    answer: 2,
  },
  {
    q: "Checking and Servicing Life rafts as per PMS is",
    options: [
      "Once a year",
      "Twice a Year",
      "Once in 5 years",
      "Based on condition of Liferaft",
    ],
    answer: 0,
  },
  {
    q: "Before lifting a lifeboat from water it should be ensured that",
    options: [
      "Bottom Plug is secured tight",
      "Falls Wires are clear and secured tightly",
      "Engine is going astern",
      "Sea Anchor is streamed",
    ],
    answer: 1,
  },
  {
    q: "Which one of the routine test and inspection of LSA is not required by regulations",
    options: [
      "Life boat engine to be run for at least 3 mins every week",
      "Survival Crafts and R/Boats with launching appliances shall be visually inspected weekly",
      "Inspection of Lifeboat equipment shall be carried out Monthly.",
      "General Emergency alarm to be tested daily",
    ],
    answer: 3,
  },
  {
    q: "The function of Hydrostatic Release Unit is",
    options: [
      "Substitute for limit switch of gravity davits",
      "To automatically unhook the lashing and release the life rafts when the ship sinks",
      "For releasing life rafts in bad weather",
      "For releasing Lifeboat from sinking vessel",
    ],
    answer: 1,
  },
  {
    q: "Lifeboats should have",
    options: [
      "Two buoyant rescue quoits, attached to not less than 30 mtrs buoyant line",
      "Two buoyant rescue quoits, attached to not less than 15 mtrs buoyant line",
      "One buoyant rescue quoit, attached to not less than 30 mtrs buoyant line",
      "One buoyant rescue quoits, attached to not less than 15 mtrs buoyant line",
    ],
    answer: 0,
  },
  {
    q: "In a Freefall lifeboat instead of immersion Suits TPAs are provided to all persons",
    options: ["True", "False"],
    answer: 1,
  },
  {
    q: "Hand flares burn with Bright Red Colour",
    options: ["True", "False"],
    answer: 0,
  },
  {
    q: "Luminous intensity of Hand flares should not be less than",
    options: ["15000 cd", "20000 cd", "25000 cd", "None of the above"],
    answer: 0,
  },
  {
    q: "LTA is used as",
    options: [
      "Messenger Line",
      "Heaving Line",
      "Mooring Line",
      "Lashing Line",
    ],
    answer: 0,
  },
  {
    q: "Life jacket light shall have a source of energy capable of providing luminous intensity of _____ for a period of _____",
    options: [
      ".75 cd / 8 hrs",
      ".50 cd / 8 hrs",
      ".75 cd / 6 hrs",
      ".50 cd / 6 hrs",
    ],
    answer: 0,
  },
  {
    q: "Lifeboat must be stowed in such a way that they can be launched in _____ mins",
    options: [
      "10 minutes",
      "05 minutes",
      "15 minutes",
    ],
    answer: 0,
  },
  {
    q: "A distress signal on deck",
    options: [
      "Pyrotechnics",
      "Open fire",
      "Flag NC",
      "All of the above",
    ],
    answer: 3,
  },
  {
    q: "MOB Smoke float working duration",
    options: [
      "3 Mins",
      "5 Mins",
      "15 Mins",
      "10 Mins",
    ],
    answer: 2,
  },
  {
    q: "Life boat can be lowered when vessel is at ____ speed",
    options: [
      "7 Kts",
      "5 Kts",
      "4 Kts",
      "10 Kts",
    ],
    answer: 1,
  },
  {
    q: "How much water is available in life raft per person",
    options: [
      "2 Ltrs",
      "3 Ltrs",
      "500 Ml",
      "1.5 Ltrs",
    ],
    answer: 3,
  },
];

const TOTAL_TIME = 30 * 60;
const PASS_MARK = 15;

export default function PSTPage() {
  const [randomQuestions] = useState<Question[]>(() => [...questions].sort(() => Math.random() - 0.5));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [candidateName, setCandidateName] = useState("");
const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const selectAnswer = (optionIndex: number) => {
    if (submitted) return;

    const updated = [...answers];
    updated[current] = optionIndex;
    setAnswers(updated);
  };

  const calculateScore = (): number => {
  return answers.reduce<number>((score, selected, index) => {
    return score + (selected !== null && selected === questions[index].answer ? 1 : 0);
  }, 0);
};
 const submitTest = async () => {
  const score = calculateScore();

  const { error } = await supabase
    .from("exam_results")
    .insert({
      candidate_name: candidateName,
      candidate_no: Number(rollNo),
      course: "PST",
      score: score,
    });

  if (error) {
    console.error("Result save error:", error);
    alert("Result save nahi hua.");
    return;
  }

  setSubmitted(true);
};

  const restartTest = () => {
    setCurrent(0);
    setAnswers(Array(questions.length).fill(null));
    setTimeLeft(TOTAL_TIME);
    setSubmitted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const passed = score >= PASS_MARK;

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-100 p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-blue-700">
                YAK EDUCATION TRUST
              </h1>

              <h2 className="mt-2 text-xl font-semibold">
                PERSONAL SURVIVAL TECHNIQUES (PST)
              </h2>

              <p className="mt-1 text-gray-500">
                CBT Practice / Internal Examination
              </p>

              <div className="mt-6 rounded-xl bg-gray-50 p-6">
                <p className="text-lg">
                  Candidate:{" "}
                  <strong>{candidateName || "Not Provided"}</strong>
                </p>

                <p className="mt-1">
                  Roll No.: <strong>{rollNo || "Not Provided"}</strong>
                </p>

                <div className="mt-6 text-5xl font-bold">
                  {score} / {questions.length}
                </div>

                <p className="mt-2 text-2xl font-semibold">
                  {percentage}%
                </p>

                <div
                  className={`mx-auto mt-5 max-w-xs rounded-xl px-6 py-4 text-xl font-bold ${
                    passed
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {passed ? "PASS" : "FAIL"}
                </div>

                <p className="mt-3 text-gray-600">
                  Passing Marks: {PASS_MARK} / {questions.length}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold">
                Answer Review
              </h2>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const selected = answers[index];
                  const correct = question.answer;

                  return (
                    <div
                      key={index}
                      className="rounded-xl border p-4"
                    >
                      <p className="font-semibold">
                        Q{index + 1}. {question.q}
                      </p>

                      <p
                        className={`mt-2 font-medium ${
                          selected === correct
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Your Answer:{" "}
                        {selected !== null
                          ? `${String.fromCharCode(65 + selected)}. ${
                              question.options[selected]
                            }`
                          : "Not Answered"}
                      </p>

                      <p className="mt-1 text-green-600 font-medium">
                        Correct Answer:{" "}
                        {String.fromCharCode(65 + correct)}.{" "}
                        {question.options[correct]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
             onClick={() => window.location.href = "/fpff"}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
             Next Course            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              YAK Education Trust • PST CBT Practice / Internal Assessment
            </p>
          </div>
        </div>
      </main>
    );
  }

const q = randomQuestions[current];
  const selectedAnswer = answers[current];

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-700">
              YAK EDUCATION TRUST
            </h1>

            <h2 className="mt-2 text-xl font-semibold">
              PERSONAL SURVIVAL TECHNIQUES (PST)
            </h2>

            <p className="text-gray-500">
              CBT Practice / Internal Examination
            </p>
          </div>

          {/* Candidate Details */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Candidate Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
             placeholder="Roll No."
value={rollNo}
onChange={(e) => setRollNo(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Progress + Timer */}
          <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="font-semibold">
              Question {current + 1} of {questions.length}
            </div>

            <div
              className={`rounded-lg px-4 py-2 font-bold ${
                timeLeft <= 60
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              Time: {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="mt-5 grid gap-5 lg:grid-cols-4">
          {/* Question */}
          <div className="lg:col-span-3 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold leading-relaxed">
              Q{current + 1}. {q.q}
            </h2>

            <div className="mt-6 space-y-3">
              {q.options.map((option, index) => {
                const isSelected = selectedAnswer === index;

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full rounded-xl border-2 p-4 text-left transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
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

            {/* Navigation */}
            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                onClick={() =>
                  setCurrent((prev) => Math.max(0, prev - 1))
                }
                disabled={current === 0}
                className="rounded-xl bg-gray-200 px-5 py-3 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {current < questions.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrent((prev) =>
                      Math.min(questions.length - 1, prev + 1)
                    )
                  }
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submitTest}
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>

          {/* Navigator */}
          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <h3 className="font-bold">Question Navigator</h3>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {questions.map((_, index) => {
                const answered = answers[index] !== null;
                const active = current === index;

                return (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-9 rounded-lg text-sm font-semibold ${
                      active
                        ? "bg-blue-600 text-white"
                        : answered
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 border-t pt-4 text-sm text-gray-600">
              <p>
                Answered:{" "}
                <strong>
                  {answers.filter((a) => a !== null).length}
                </strong>
              </p>

              <p className="mt-1">
                Remaining:{" "}
                <strong>
                  {questions.length -
                    answers.filter((a) => a !== null).length}
                </strong>
              </p>

              <p className="mt-1">
                Passing: <strong>{PASS_MARK}/30</strong>
              </p>
            </div>

            <button
              onClick={submitTest}
              className="mt-5 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
            >
              Submit Test
            </button>
          </div>
        </div>

        <footer className="mt-8 pb-4 text-center text-sm text-gray-500">
          YAK Education Trust © 2026
          <br />
          STCW CBT Practice / Internal Assessment
        </footer>
      </div>
    </main>
  );
}