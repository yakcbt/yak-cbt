"use client";

import { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const TOTAL_TIME = 30 * 60;
const PASS_MARK = 18;

const questions: Question[] = [
  {
    question:
      "A person has fallen overboard and is being picked up with a lifeboat. If the person appears in danger of drowning, the lifeboat should make _____",
    options: [
      "An approach from leeward",
      "The most direct approach",
      "An approach from windward",
      "An approach across the wind",
    ],
    answer: 0,
  },
  {
    question: "An immersion suit can be unpacked and donned within _______",
    options: ["2 minutes", "3 minutes", "4 minutes", "5 minutes"],
    answer: 3,
  },
  {
    question:
      "Under STCW regulation, what must each new crew member do before commencing assigned duties?",
    options: [
      "Locate his working area and working clothes",
      "Read all posted notices/regulations carefully",
      "Be familiar with safety procedures",
      "Report to the master for signing on the ship’s articles",
    ],
    answer: 2,
  },
  {
    question:
      "You are standing in the wheel watch when you hear the cry “man overboard starboard side”. You should instinctively _____",
    options: [
      "Give full right rudder",
      "Give full left rudder",
      "Put the rudder amidships",
      "Throw a life ring to mark the spot",
    ],
    answer: 3,
  },
  {
    question:
      "What is the remedy to save the face from sparks generated during welding and grinding?",
    options: ["Goggles", "Helmets", "Face shield", "Nose mask"],
    answer: 2,
  },
  {
    question:
      "Which is the life-saving signal for “this is the best place to land”?",
    options: [
      "Orange smoke signal",
      "Red star rocket",
      "Horizontal motion of a flag",
      "Green star rocket",
    ],
    answer: 2,
  },
  {
    question:
      "Your vessel is equipped with totally enclosed lifeboats. Which statement is TRUE when the boat is enveloped in flames?",
    options: [
      "A water spray system to cool the outside of the boat is operated",
      "An air tank will provide about 10 min of air for the survivors and the engine",
      "The ventilators will automatically close by the action of fusible links",
      "The motor takes its air supply from outside the lifeboat to prevent asphyxiation of the crew",
    ],
    answer: 0,
  },
  {
    question: "What is the muster list?",
    options: [
      "A list which specifies victualling requirements for the forthcoming voyages",
      "A list which specifies environmental protection and emergency duties of senior officers onboard ship",
      "A list that specifies the emergency alarm, action to be taken by the crew and how the order to abandon ship will be given",
      "A crew list prepared prior to arrival in port giving full details of all persons on board",
    ],
    answer: 2,
  },
  {
    question:
      "In heavy seas the helmsman should steer the survival craft ________.",
    options: [
      "Into the seas",
      "Broadside to the seas",
      "In a series of figure-eights",
      "In the same direction as the seas",
    ],
    answer: 0,
  },
  {
    question: "What should you do when you hear the ship’s emergency signal?",
    options: [
      "Put on warm clothes and your life jacket",
      "Ignore the signals unless you have been told there will be a drill",
      "Report to your muster station",
      "Telephone the bridge for advice",
    ],
    answer: 2,
  },
  {
    question:
      "Spaces containing batteries require good ventilation because ______.",
    options: [
      "Less electrolyte is required to maintain the battery’s charge",
      "Ventilation supplies more oxygen for charging the battery",
      "Ventilation avoids flammable gas accumulation",
      "Ventilation avoids CO2 build-up",
    ],
    answer: 2,
  },
  {
    question:
      "You are in a survival craft broadcasting a distress message. What information would be essential to your rescuers?",
    options: [
      "The nature of the distress",
      "The time of day",
      "Your radio call sign",
      "Your position by latitude and longitude",
    ],
    answer: 3,
  },
  {
    question: "Distress flares need to be renewed every",
    options: [
      "Five years from date of manufacture",
      "Seven years from the date of manufacture",
      "One year from manufacture",
      "Three years from date of manufacture",
    ],
    answer: 0,
  },
  {
    question:
      "The revolving drum of a windlass which is used to handle lines is called a _____",
    options: ["Warping drum", "Lines drum", "Dog clutch", "Gypsy"],
    answer: 0,
  },
  {
    question: "What bare minimum should be done before working on electrical equipment?",
    options: [
      "Open the equipment and commence work",
      "Switch off the mains and start working",
      "Complete electrical isolation checklist",
      "None",
    ],
    answer: 2,
  },
  {
    question: "What is the international signal for man overboard?",
    options: [
      "Repeated raising and lowering of arms",
      "Three short blasts on the whistle",
      "Three long blasts followed by three short blasts on the whistle",
      "Three long blasts on the whistle",
    ],
    answer: 0,
  },
  {
    question:
      "A short and a prolonged blast three times over on the ship’s horn indicates ‘Abandon ship’.",
    options: ["True", "False"],
    answer: 1,
  },
  {
    question:
      "Information on safety and hazard control practices and procedures on a vessel is described in",
    options: [
      "Your employment contract",
      "The vessel’s log book",
      "The instructions written on lifebuoys",
      "The vessel’s safety management manual",
    ],
    answer: 3,
  },
  {
    question: "Safety equipment is checked by the crew",
    options: [
      "Before and during each voyage",
      "Only at annual surveys",
      "Not the responsibility of the crew",
      "If it is damaged",
    ],
    answer: 0,
  },
  {
    question:
      "When securing the accommodation for sea, empty lockers don’t need to be closed.",
    options: ["True", "False"],
    answer: 1,
  },
  {
    question:
      "Where would you find details of your tasks and duties in case of an emergency?",
    options: [
      "In the muster list",
      "On posters at the lifeboat station",
      "In notices posted in mess rooms, recreation rooms, etc.",
      "In notices posted in the crew’s cabin",
    ],
    answer: 0,
  },
  {
    question:
      "Which of the following is considered to be the safest protection from static electric discharge, when connecting or disconnecting cargo hoses and metal arms?",
    options: [
      "Insulating flange or a length of non-conducting hose",
      "Switching off ICCP",
      "Ship-shore bonding cable",
      "None of the above",
    ],
    answer: 0,
  },
  {
    question: "Reporting near misses is encouraged under which maritime instrument?",
    options: [
      "Code of Safe Working Practices",
      "ISM Code",
      "SOLAS Chapter-2",
      "All of the above",
    ],
    answer: 1,
  },
  {
    question:
      "An emergency station list should be displayed on any vessel with more than …",
    options: [
      "4 crew members",
      "10 crew members",
      "3 crew members",
      "1 crew member",
    ],
    answer: 0,
  },
  {
    question: "What is the ship’s contingency plan?",
    options: [
      "The plan for the next voyage",
      "The loading plan for hazardous cargo",
      "The plan for safety preparedness",
      "The plan for maintenance and repair of safety equipment",
    ],
    answer: 2,
  },
  {
    question:
      "Warning signage information for restricted areas and emergency procedures",
    options: [
      "Only applies to passengers",
      "Should be known and implemented",
      "Can be removed if they are in the way",
      "Is found in every compartment of the vessel",
    ],
    answer: 1,
  },
  {
    question:
      "Body language includes a person’s eye contact, smile, frown etc., that convey ____",
    options: ["Messages", "Information", "Content", "None"],
    answer: 0,
  },
  {
    question: "Life jackets are kept",
    options: [
      "In overhead lockers",
      "Out of harm’s way in the wheelhouse",
      "In a plastic bag to prevent mould",
      "Where they can be easily seen and accessed",
    ],
    answer: 3,
  },
  {
    question:
      "If you noticed that a piece of equipment is broken, what should you do?",
    options: [
      "Report it to the officer on watch",
      "Get another AB to help you fix it",
      "Try to fix it yourself",
      "Pretend that you have not noticed that anything is broken",
    ],
    answer: 0,
  },
  {
    question: "What should you do first if you see a man fall overboard?",
    options: [
      "Alert other crew members and try to keep him or the lifebuoy in sight",
      "Inform the officer of the watch",
      "Release the nearest lifebuoy on the side he has fallen",
      "Dive into the sea after him to attempt a rescue",
    ],
    answer: 0,
  },
];

export default function PSSRPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [indos, setIndos] = useState("");

  const selectAnswer = (optionIndex: number) => {
    const updated = [...answers];
    updated[current] = optionIndex;
    setAnswers(updated);
  };

  const calculateScore = (): number => {
    return answers.reduce<number>((score, selected, index) => {
      return (
        score +
        (selected !== null && selected === questions[index].answer ? 1 : 0)
      );
    }, 0);
  };

  const submitTest = () => {
    setSubmitted(true);
  };

  const restartTest = () => {
    setCurrent(0);
    setAnswers(Array(questions.length).fill(null));
    setTimeLeft(TOTAL_TIME);
    setSubmitted(false);
    setCandidateName("");
    setIndos("");
  };

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

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

  const answeredCount = answers.filter(
    (answer) => answer !== null
  ).length;

  const remainingCount = questions.length - answeredCount;

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-100 p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <header className="border-b pb-6 text-center">
              <h1 className="text-3xl font-bold text-blue-700">
                YAK EDUCATION TRUST
              </h1>

              <h2 className="mt-2 text-xl font-semibold text-slate-800">
                PERSONAL SAFETY & SOCIAL RESPONSIBILITIES (PSSR)
              </h2>

              <p className="mt-1 text-slate-500">
                CBT Practice / Internal Examination
              </p>
            </header>

            <section className="py-8 text-center">
              <p className="text-lg">
                Candidate:{" "}
                <strong>
                  {candidateName.trim() || "Not Provided"}
                </strong>
              </p>

              <p className="mt-1 text-lg">
                INDOS No.:{" "}
                <strong>{indos.trim() || "Not Provided"}</strong>
              </p>

              <div className="mt-6">
                <div className="text-6xl font-bold text-slate-800">
                  {score} / {questions.length}
                </div>

                <div className="mt-2 text-2xl font-semibold text-blue-700">
                  {percentage}%
                </div>

                <div
                  className={`mx-auto mt-5 max-w-sm rounded-lg px-6 py-3 text-xl font-bold ${
                    passed
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {passed ? "PASS" : "FAIL"}
                </div>

                <p className="mt-4 text-slate-600">
                  Passing Marks: {PASS_MARK} / {questions.length}
                </p>
              </div>
            </section>

            <section className="mt-4">
              <h3 className="mb-4 text-2xl font-bold text-slate-800">
                Answer Review
              </h3>

              <div className="space-y-4">
                {questions.map((q, index) => {
                  const selected = answers[index];

                  return (
                    <div
                      key={index}
                      className="rounded-xl border bg-slate-50 p-4"
                    >
                      <p className="font-semibold text-slate-800">
                        Q{index + 1}. {q.question}
                      </p>

                      <p
                        className={`mt-3 ${
                          selected === q.answer
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        Your Answer:{" "}
                        <strong>
                          {selected !== null
                            ? `${String.fromCharCode(65 + selected)}. ${
                                q.options[selected]
                              }`
                            : "Not Answered"}
                        </strong>
                      </p>

                      <p className="mt-1 text-green-700">
                        Correct Answer:{" "}
                        <strong>
                          {String.fromCharCode(65 + q.answer)}.{" "}
                          {q.options[q.answer]}
                        </strong>
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="mt-8 text-center">
              <button
                onClick={restartTest}
                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Restart Test
              </button>
            </div>

            <footer className="mt-8 border-t pt-5 text-center text-sm text-gray-500">
              <p>YAK Education Trust © 2026</p>
              <p className="mt-1">
                STCW CBT Practice / Internal Assessment
              </p>
            </footer>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white p-4 shadow-lg md:p-6">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-blue-700">
              YAK EDUCATION TRUST
            </h1>

            <h2 className="mt-2 text-xl font-semibold text-slate-800">
              PERSONAL SAFETY & SOCIAL RESPONSIBILITIES (PSSR)
            </h2>

            <p className="mt-1 text-slate-500">
              CBT Practice / Internal Examination
            </p>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Candidate Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="INDOS Number"
              value={indos}
              onChange={(e) => setIndos(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5 flex flex-col justify-between gap-3 rounded-lg bg-slate-50 p-4 md:flex-row md:items-center">
            <div className="font-semibold text-slate-700">
              Question {current + 1} of {questions.length}
            </div>

            <div
              className={`rounded-lg px-4 py-2 font-bold ${
                timeLeft <= 300
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              Time: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
            <section className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold leading-7 text-slate-800">
                Q{current + 1}. {questions[current].question}
              </h3>

              <div className="mt-5 space-y-3">
                {questions[current].options.map((option, optionIndex) => {
                  const selected = answers[current] === optionIndex;

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => selectAnswer(optionIndex)}
                      className={`w-full rounded-lg border p-4 text-left transition ${
                        selected
                          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                          : "border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-semibold">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>{" "}
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-between gap-3">
                <button
                  disabled={current === 0}
                  onClick={() =>
                    setCurrent((prev) => Math.max(0, prev - 1))
                  }
                  className="rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  disabled={current === questions.length - 1}
                  onClick={() =>
                    setCurrent((prev) =>
                      Math.min(questions.length - 1, prev + 1)
                    )
                  }
                  className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </section>

            <aside className="rounded-xl border bg-slate-50 p-5">
              <h3 className="font-bold text-slate-800">
                Question Navigator
              </h3>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {questions.map((_, index) => {
                  const answered = answers[index] !== null;
                  const active = current === index;

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`rounded-md px-2 py-2 text-sm font-semibold ${
                        active
                          ? "bg-blue-600 text-white"
                          : answered
                          ? "bg-green-200 text-green-800"
                          : "bg-white text-slate-700 hover:bg-blue-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 border-t pt-4 text-sm text-slate-600">
                <p>
                  Answered: <strong>{answeredCount}</strong>
                </p>

                <p className="mt-1">
                  Remaining: <strong>{remainingCount}</strong>
                </p>

                <p className="mt-1">
                  Passing: <strong>{PASS_MARK}/30</strong>
                </p>
              </div>

              <button
                onClick={submitTest}
                className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700"
              >
                Submit Test
              </button>
            </aside>
          </div>

          <footer className="mt-8 border-t pt-5 text-center text-sm text-gray-500">
            <p>YAK Education Trust © 2026</p>
            <p className="mt-1">
              STCW CBT Practice / Internal Assessment
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}