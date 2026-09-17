"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
type Question = {
  question: string;
  options: string[];
  answer: number;
};

const TOTAL_TIME = 30 * 60;
const PASS_MARK = 15;

const questions: Question[] = [
  {
    question: "What is the proper treatment for Heat Stroke?",
    options: [
      "Rapid cooling of the body",
      "Covering with a blanket",
      "Exercise",
      "Drinking Alcohol",
    ],
    answer: 0,
  },
  {
    question:
      "First aid treatment for battery acid or alkali burns, especially?",
    options: [
      "Flushing with large amounts of fresh water and seeking medical attention ashore or by radio",
      "Wiping the affected area with a clean dry cloth and resting quietly for several hours",
      "Drying the acid or alkali with a rag followed by applying a light cream",
    ],
    answer: 0,
  },
  {
    question:
      "If a person suffering from possible broken bones and internal injuries is correctly being administered first aid, what statement is true?",
    options: [
      "The person should be examined on the scene and then walked to a bunk to await the arrival of medical assistance",
      "The person should be moved from the scene but not allowed to walk on their own power without assistance",
      "The person should not be allowed to lie down where injured but should be moved to a chair or bunk",
      "The person should not be moved (unless remaining on the scene is unsafe), but made comfortable until medical assistance arrives",
    ],
    answer: 3,
  },
  {
    question:
      "Doctors recommend the RICE method for treating sprains, Rest, Ice, _______ and Elevate?",
    options: ["Cover", "Clean", "Compress", "Comfort"],
    answer: 2,
  },
  {
    question:
      "What action should be taken for a patient suffering from heat exhaustion?",
    options: [
      "Moved to a cool room and told to lie down",
      "Kept standing and encouraged to walk slowly and continuously",
      "Given a glass of water and told to return to work after 15 minutes of rest",
    ],
    answer: 0,
  },
  {
    question:
      "What danger to personnel exists when a carbon dioxide fire extinguisher is discharged in a small enclosed space?",
    options: [
      "Second degree burns",
      "Electric shock",
      "Suffocation",
      "Burst eardrums",
    ],
    answer: 2,
  },
  {
    question:
      "Severe exposure to chlorine gas can be fatal; chlorine gas is primarily a _______?",
    options: [
      "Respiratory irritant",
      "Skin burning agent",
      "Blood poisoning agent",
      "Nerve paralyzing irritant",
    ],
    answer: 0,
  },
  {
    question:
      "Which of the following precautions should be taken when treating burns caused by contact with dry lime?",
    options: [
      "Water should be applied in a fine spray",
      "The burned area should be immersed in water",
      "The entire burn area should be covered with ointment",
      "Before washing with water, the lime should be brushed away gently and removed from skin contact",
    ],
    answer: 3,
  },
  {
    question:
      "Where there are multiple accident victims, which injuries should be the FIRST to receive emergency treatment?",
    options: [
      "Major multiple fractures",
      "Eye injuries",
      "Back injuries with spinal cord damage",
      "Airway and breathing difficulties",
    ],
    answer: 3,
  },
  {
    question: "Which procedure should not be done for a person who has fainted?",
    options: [
      "Revive the person with smelling salts",
      "Loosen the clothing",
      "Lay the person horizontally",
      "Give pain reliever",
    ],
    answer: 3,
  },
  {
    question:
      "Person who have swallowed a non-petroleum based poison are given large quantities of warm soapy water or warm salt water to _______?",
    options: [
      "Induce vomiting",
      "Absorb the poison from the blood",
      "Neutralize the poison in the blood",
      "Increase the digestive process and eliminate the poison",
    ],
    answer: 0,
  },
  {
    question:
      "The best treatment for preventing traumatic shock after an accident is to ________?",
    options: [
      "Have the victim exercise to increase circulation",
      "Keep the victim from electrical equipment",
      "Keep the victim warm and dry while lying down",
      "Apply ice packs and avoid excitement",
    ],
    answer: 2,
  },
  {
    question: "The proper stimulant for an unconscious person is?",
    options: [
      "Tea",
      "Coffee",
      "Whiskey and water",
      "Ammonia inhalant",
    ],
    answer: 3,
  },
  {
    question:
      "Which danger exists to people when CO2 is discharged into a small enclosed space?",
    options: [
      "Damaged eardrums",
      "Electric shock",
      "Frostbite",
      "Respiratory arrest",
    ],
    answer: 3,
  },
  {
    question:
      "At what stage of immersion does the falling body temperature become a primary hazard?",
    options: [
      "Initial immersion",
      "Short term immersion",
      "Long term immersion",
      "Post immersion",
    ],
    answer: 2,
  },
  {
    question: "How long can a person survive in cold water (50 degrees)?",
    options: ["1.5 Hours", "2.5 Hours", "4 Hours", "7 Hours"],
    answer: 1,
  },
  {
    question:
      "How much percentage increase in your survival time in the sea if you are in huddle position?",
    options: ["20", "50", "60", "75"],
    answer: 1,
  },
  {
    question: "What will you do if the victim has no pulse and respiration?",
    options: [
      "Leave the victim as such",
      "Take him to hospital immediately",
      "Start CPR immediately",
    ],
    answer: 2,
  },
  {
    question: "At which method, heat is lost by sweating?",
    options: [
      "Evaporation",
      "Conduction",
      "Radiation",
      "Convection",
    ],
    answer: 0,
  },
  {
    question: "Humans are?",
    options: [
      "Cold animal",
      "Warm animals",
      "Adapt both warm and cold",
    ],
    answer: 1,
  },
  {
    question:
      "At which stage the person's body temperature will continue to drop as the water temperature?",
    options: [
      "Initial immersion",
      "Short term immersion",
      "Longer term immersion",
      "Post rescue immersion",
    ],
    answer: 2,
  },
  {
    question: "Water pulls heat from the body at what rate?",
    options: [
      "10 times faster than air",
      "20 times faster than air",
      "30 times faster than air",
      "25 times faster than air",
    ],
    answer: 3,
  },
  {
    question:
      "What symptom indicates a patient needs emergency care for hypothermia?",
    options: [
      "Stumbling",
      "Blueness of skin",
      "Disorientation",
      "Poor co-ordination",
    ],
    answer: 2,
  },
  {
    question: "The accepted treatment for a sprained ankle is?",
    options: [
      "Remove the shoe and check for swelling using the capillary reflex method",
      "Keep the shoe on, apply an ankle bandage for support, elevate and apply cold towels",
      "Keep the shoe on, apply an ankle splint and apply heat if possible",
      "Have the victim walk or move as soon as possible to prevent stiffness",
    ],
    answer: 1,
  },
  {
    question: "Green stick fracture is:",
    options: [
      "Fracture that happens on a twig",
      "Fracture that is hardly noticed",
      "Fracture in children",
      "An irreparable fracture",
    ],
    answer: 2,
  },
  {
    question: "What are non absorbable sutures material?",
    options: [
      "Dexon",
      "Nylon",
      "Vicryl",
    ],
    answer: 1,
  },
  {
    question: "What are the intravenous injection site except?",
    options: [
      "Veins of the dorsal",
      "Veins of the forearm",
      "Veins of the thigh",
      "Veins of the foot",
    ],
    answer: 2,
  },
  {
    question: "What is the defibrillation energy level for the third shock?",
    options: ["100 J", "200 J", "200-300 J", "360 J"],
    answer: 3,
  },
  {
    question: "Before giving CPR you should first make sure?",
    options: [
      "They are not bleeding",
      "They are conscious or unconscious",
      "Are not vomiting",
      "Are not dead",
    ],
    answer: 1,
  },
  {
    question:
      "The accepted treatment for a femor or thigh fracture is?",
    options: [
      "Place a short padded splint on each side of the leg",
      "This type of fracture is best handled by a traction splint applied by those with special training",
      "Move the victim before properly applying a leg splint",
      "Bind both legs with two long splints using two cravats, one above and one below the break",
    ],
    answer: 1,
  },
];

export default function EFAPage() {
 const [shuffledQuestions,setShufffledQuestions] = useState<Question[]>(questions);
  const [current, setCurrent] = useState(0);

  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  const [candidateName, setCandidateName] = useState("");
 const [rollNo, setRollNo] = useState("");

  const selectAnswer = (optionIndex: number) => {
    const updated = [...answers];
    updated[current] = optionIndex;
    setAnswers(updated);
  };

  const calculateScore = (): number => {
    return answers.reduce<number>((score, selected, index) => {
      return (
        score +
        (selected !== null && selected === shuffledQuestions[index].answer ? 1 : 0)
      );
    }, 0);
  };

 const submitTest = async () => {
  const score = calculateScore();

  const { error } = await supabase.from("exam_results").insert([
    {
      candidate_name: candidateName,
      candidate_no: Number(rollNo),
      course: "EFA",
      score: score,
    },
  ]);

  if (error) {
    console.error("Error saving result:", error);
  }

  setSubmitted(true);
};

  const restartTest = () => {
    setShufffledQuestions([...questions].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setAnswers(Array(questions.length).fill(null));
    setTimeLeft(TOTAL_TIME);
    setSubmitted(false);
    setCandidateName("");
    setRollNo("");
  };
useEffect(() => {
    setShufffledQuestions([...questions].sort(() => Math.random() - 0.5));
  }, []);
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

  /* ================= RESULT PAGE ================= */

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
                ELEMENTARY FIRST AID (EFA)
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
                ROLLNo.:{" "}
                <strong>{rollNo.trim() || "Not Provided"}</strong>
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

            {/* ANSWER REVIEW */}

            <section className="mt-4">
              <h3 className="mb-4 text-2xl font-bold text-slate-800">
                Answer Review
              </h3>

              <div className="space-y-4">
                {shuffledQuestions.map((q, index) => {
                  const selected = answers[index];

                  const isCorrect = selected === q.answer;

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
                          isCorrect
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
               onClick={() => window.location.href = "/stsdsd"}
                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
              >
               Next course
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

  /* ================= CBT PAGE ================= */

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white p-4 shadow-lg md:p-6">

          {/* HEADER */}

          <header className="text-center">
            <h1 className="text-3xl font-bold text-blue-700">
              YAK EDUCATION TRUST
            </h1>

            <h2 className="mt-2 text-xl font-semibold text-slate-800">
              ELEMENTARY FIRST AID (EFA)
            </h2>

            <p className="mt-1 text-slate-500">
              CBT Practice / Internal Examination
            </p>
          </header>

          {/* CANDIDATE DETAILS */}

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
              placeholder="ROLL Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* QUESTION + TIMER */}

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

          {/* MAIN AREA */}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">

            {/* QUESTION */}

            <section className="rounded-xl border bg-white p-5 shadow-sm">

              <h3 className="text-lg font-bold leading-7 text-slate-800">
                Q{current + 1}. {shuffledQuestions[current].question}
              </h3>

              {/* OPTIONS */}

              <div className="mt-5 space-y-3">
                {shuffledQuestions[current].options.map(
                  (option, optionIndex) => {

                    const selected =
                      answers[current] === optionIndex;

                    return (
                      <button
                        key={optionIndex}
                        onClick={() =>
                          selectAnswer(optionIndex)
                        }
                        className={`w-full rounded-lg border p-4 text-left transition ${
                          selected
                            ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                            : "border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50"
                        }`}
                      >
                        <span className="font-semibold">
                          {String.fromCharCode(
                            65 + optionIndex
                          )}
                          .
                        </span>{" "}
                        {option}
                      </button>
                    );
                  }
                )}
              </div>

              {/* PREVIOUS / NEXT */}

              <div className="mt-6 flex justify-between gap-3">

                <button
                  disabled={current === 0}
                  onClick={() =>
                    setCurrent((prev) =>
                      Math.max(0, prev - 1)
                    )
                  }
                  className="rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  disabled={
                    current === questions.length - 1
                  }
                  onClick={() =>
                    setCurrent((prev) =>
                      Math.min(
                        questions.length - 1,
                        prev + 1
                      )
                    )
                  }
                  className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>

              </div>
            </section>

            {/* NAVIGATOR */}

            <aside className="rounded-xl border bg-slate-50 p-5">

              <h3 className="font-bold text-slate-800">
                Question Navigator
              </h3>

              <div className="mt-4 grid grid-cols-5 gap-2">

                {questions.map((_, index) => {

                  const answered =
                    answers[index] !== null;

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

              {/* COUNTER */}

              <div className="mt-6 border-t pt-4 text-sm text-slate-600">

                <p>
                  Answered:{" "}
                  <strong>{answeredCount}</strong>
                </p>

                <p className="mt-1">
                  Remaining:{" "}
                  <strong>{remainingCount}</strong>
                </p>

                <p className="mt-1">
                  Passing:{" "}
                  <strong>{PASS_MARK}/30</strong>
                </p>

              </div>

              {/* SUBMIT */}

              <button
                onClick={submitTest}
                className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700"
              >
                Submit Test
              </button>

            </aside>
          </div>

          {/* FOOTER */}

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