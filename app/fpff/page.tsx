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
    q: "There are two disadvantages to CO2 when used as a total flooding fire fighting agent. One of these is the limited quantity available and the other is",
    options: [
      "the lack of cooling effect on heated material",
      "it breaks down under extreme heat to form poisonous gases",
      "it cannot be used in a dead ship situation without electrical power available to the CO2 pump",
      "there is no effect on a Class A fire even in an enclosed space",
    ],
    answer: 0,
  },
  {
    q: "Class B fire division have the insulation such that the average temperature rise in the unexposed side will be not more than 140°C within the time limit.",
    options: ["True", "False"],
    answer: 0,
  },
  {
    q: "Which of the following should you NOT do during a fire emergency?",
    options: [
      "Evacuate through designated exit routes",
      "Keep fire doors shut to prevent the fire from spreading",
      "Crawl low under the smoke while breathing only through your nose",
      "Abandon ship without the permission of authorities",
    ],
    answer: 3,
  },
  {
    q: "Radiation is transfer of heat through the physical movement of particles from hotter to colder zone.",
    options: ["True", "False"],
    answer: 1,
  },
  {
    q: "Which of the tools listed is designated for connecting and disconnecting fire hose coupling?",
    options: ["Vise grip", "Channel locks", "C spanner", "Pipe wrench"],
    answer: 2,
  },
  {
    q: "Class B fires are those fires that occur involving paper and wood.",
    options: ["True", "False"],
    answer: 1,
  },
  {
    q: "Oil, grease and chemical are classified as",
    options: [
      "Class A Fire",
      "Class B Fire",
      "Class C Fire",
      "Class D Fire",
    ],
    answer: 1,
  },
  {
    q: "Putting fire out by removing fuel is called inhibition.",
    options: ["True", "False"],
    answer: 1,
  },
  {
    q: "Fire is a process of combustion accompanied by the rapid release of heat and ............... in varying intensities.",
    options: ["Light", "Energy", "Destruction", "None of the above"],
    answer: 0,
  },
  {
    q: "Class A fire involves",
    options: [
      "Fire involving solid material",
      "Fire involving liquid",
      "Fire involving gas or electrical",
      "Fire involving metal",
    ],
    answer: 0,
  },
  {
    q: "How do you direct a fire nozzle under full water pressure?",
    options: [
      "Blowing",
      "Two hoses for each vertical fire zone",
      "One hose for every second fire hydrant",
      "One hose for each 30 metre length of ship + 1 spare; hoses for engine and boiler room in additional",
    ],
    answer: 3,
  },
  {
    q: "Oily rags and metal twist pose a particular fire hazard because",
    options: ["Metal", "Gas", "Liquid", "Electricity"],
    answer: 0,
  },
  {
    q: "Class A-60 can prevent flame only for 60 minutes.",
    options: ["True", "False"],
    answer: 1,
  },
  {
    q: "Signaling communication through life line – repeated pull means",
    options: [
      "I am alright",
      "Give me more slack",
      "Pick up slack",
      "Pull me out / Come out",
    ],
    answer: 3,
  },
  {
    q: "The fire signal on a ship must be continuous blast of the whistle or electrical bell or not less than … seconds.",
    options: ["10", "15", "20", "None of the above"],
    answer: 1,
  },
  {
    q: "Which of the following statement is not correct about high expansion foam?",
    options: ["Foam", "Dry Powder – Dry Chemical", "CO2", "Water"],
    answer: 1,
  },
  {
    q: "How often must fixed CO2 fire extinguishing system be inspected to confirm the cylinders are within 10% of the stamp full charge weight?",
    options: ["Quarterly", "Semi-annually", "Annually", "Bi-annually"],
    answer: 2,
  },
  {
    q: "Ratio of Hi expansion foam is 1 : 1000.",
    options: ["True", "False"],
    answer: 0,
  },
  {
    q: "Which of the following procedures reduce the possibility of an interior ventilation duct fire from rapidly spreading?",
    options: [
      "Having a portable CO2 ready at each duct opening",
      "Keeping the duct interior clean",
      "Having a fire hose charged at each duct opening",
      "Keeping the duct exterior clean",
    ],
    answer: 1,
  },
  {
    q: "When fighting an electrical fire which of the following should NOT be used?",
    options: [
      "Water fire extinguisher",
      "Foam fire extinguisher",
      "Dry powder",
      "Neither A nor B should be used",
    ],
    answer: 3,
  },
  {
    q: "During a fire emergency you should close all doors behind you to slow the spread of a fire.",
    options: ["True", "False"],
    answer: 0,
  },
  {
    q: "After a fire has been extinguished in an enclosed space, personnel may safely enter the space when",
    options: [
      "Smoke density has decreased sufficiently to see the bulkhead opposite the compartment entrance",
      "All smoke and toxic fumes are removed and an adequate oxygen supply is present",
      "None of the above",
    ],
    answer: 1,
  },
  {
    q: "Which side of the fire triangle most commonly causes a fire?",
    options: ["Foam", "Paper", "Wood", "Steel"],
    answer: 1,
  },
  {
    q: "Hazards in engine room",
    options: [
      "Fuel and lube oil",
      "Hot surfaces",
      "Defective lagging",
      "All of the above",
    ],
    answer: 3,
  },
  {
    q: "Where should you aim a fire institution/nozzle when putting out a fire?",
    options: [
      "Top of the fire",
      "At the base of the fire",
      "At the centre of the fire",
      "Away from the fire",
    ],
    answer: 1,
  },
  {
    q: "The basic communications inside ships are",
    options: [
      "Walkie-talkie",
      "Public address systems",
      "Telephones",
      "All the above",
    ],
    answer: 3,
  },
  {
    q: "How many emergency sources are required for fire detection and fire alarm systems?",
    options: ["Two", "None", "1", "3"],
    answer: 0,
  },
  {
    q: "The use of Halon in fire extinguishing systems and equipment is already prohibited for",
    options: [
      "Cargo ship",
      "Existing ship",
      "New build ship",
      "All the above",
    ],
    answer: 2,
  },
  {
    q: "Class C fire extinguishers are used to put out combustible metal and metal alloy fires.",
    options: ["True", "False"],
    answer: 1,
  },

  // Question 30 – additional YAK practice question
  {
    q: "Which element of the fire triangle must be removed to extinguish a fire?",
    options: ["Fuel", "Fresh water", "Sea water", "Smoke"],
    answer: 0,
  },
];

const TOTAL_TIME = 35 * 60;
const PASS_MARK = 18;

export default function FPFFPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [name, setName] = useState("");
  const [indos, setIndos] = useState("");

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const answered = answers.filter((a) => a !== -1).length;
  const remaining = questions.length - answered;

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);
  const passed = score >= PASS_MARK;

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  function selectAnswer(optionIndex: number) {
    if (submitted) return;

    const updated = [...answers];
    updated[current] = optionIndex;
    setAnswers(updated);
  }

  function restartTest() {
    setCurrent(0);
    setAnswers(Array(questions.length).fill(-1));
    setSubmitted(false);
    setTimeLeft(TOTAL_TIME);
    setName("");
    setIndos("");
  }

  async function submitTest() {
  if (submitted) return;

  const { error } = await supabase
    .from("exam_results")
    .insert({
      candidate_name: name,
      candidate_no: Number(indos),
      course: "FPFF",
      score: score,
    });

  if (error) {
    console.error("Result save error:", error);
    alert("Result save nahi hua.");
    return;
  }

  setSubmitted(true);
}

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-blue-700">
                YAK EDUCATION TRUST
              </h1>

              <h2 className="mt-2 text-xl font-semibold">
                FIRE PREVENTION & FIRE FIGHTING (FPFF)
              </h2>

              <p className="mt-1 text-gray-500">
                CBT Practice / Internal Examination
              </p>

              <div className="my-6 border-t" />

              <p className="text-gray-700">
                Candidate:{" "}
                <strong>{name.trim() || "Not Provided"}</strong>
              </p>

              <p className="text-gray-700">
                INDOS No.:{" "}
                <strong>{indos.trim() || "Not Provided"}</strong>
              </p>

              <div className="mt-6 text-6xl font-bold text-blue-700">
                {score} / {questions.length}
              </div>

              <div className="mt-2 text-2xl font-semibold">
                {percentage}%
              </div>

              <div
                className={`mx-auto mt-5 max-w-md rounded-xl px-5 py-3 text-xl font-bold ${
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

              <button
                onClick={restartTest}
                className="mt-6 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Restart Test
              </button>
            </div>

            <div className="mt-10">
              <h2 className="mb-5 text-2xl font-bold text-gray-800">
                Answer Review
              </h2>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const correctAnswer = question.answer;
                  const isCorrect = userAnswer === correctAnswer;

                  return (
                    <div
                      key={index}
                      className={`rounded-xl border p-4 ${
                        isCorrect
                          ? "border-green-300 bg-green-50"
                          : "border-red-300 bg-red-50"
                      }`}
                    >
                      <p className="font-semibold text-gray-800">
                        Q{index + 1}. {question.q}
                      </p>

                      <p className="mt-2 text-sm">
                        <span className="font-semibold">
                          Your Answer:
                        </span>{" "}
                        {userAnswer === -1
                          ? "Not Answered"
                          : `${String.fromCharCode(65 + userAnswer)}. ${
                              question.options[userAnswer]
                            }`}
                      </p>

                      <p className="mt-1 text-sm text-green-700">
                        <span className="font-semibold">
                          Correct Answer:
                        </span>{" "}
                        {String.fromCharCode(65 + correctAnswer)}.{" "}
                        {question.options[correctAnswer]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={restartTest}
                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Restart Test
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-700">
              YAK EDUCATION TRUST
            </h1>

            <h2 className="mt-2 text-xl font-semibold">
              FIRE PREVENTION & FIRE FIGHTING (FPFF)
            </h2>

            <p className="text-gray-500">
              CBT Practice / Internal Examination
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Candidate Name"
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              value={indos}
              onChange={(e) => setIndos(e.target.value)}
              placeholder="INDOS Number"
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="font-semibold text-blue-700">
              Question {current + 1} of {questions.length}
            </div>

            <div
              className={`rounded-lg px-4 py-2 font-bold ${
                timeLeft <= 300
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              Time: {minutes}:{seconds}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold text-gray-800">
              Q{current + 1}. {questions[current].q}
            </h2>

            <div className="mt-5 space-y-3">
              {questions[current].options.map((option, index) => {
                const selected = answers[current] === index;

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full rounded-xl border-2 p-4 text-left transition ${
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <span className="font-semibold">
                      {String.fromCharCode(65 + index)}.
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
                className="rounded-lg bg-gray-200 px-6 py-3 font-semibold disabled:opacity-40"
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
                  className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submitTest}
                  className="rounded-lg bg-green-600 px-7 py-3 font-semibold text-white"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>

          <aside className="rounded-2xl bg-white p-5 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800">
              Question Navigator
            </h3>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== -1;
                const isCurrent = current === index;

                return (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`rounded-lg px-2 py-2 text-sm font-semibold ${
                      isCurrent
                        ? "bg-blue-600 text-white"
                        : isAnswered
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 border-t pt-4 text-sm">
              <p>
                Answered:{" "}
                <strong className="text-green-600">{answered}</strong>
              </p>

              <p className="mt-1">
                Remaining:{" "}
                <strong className="text-orange-600">{remaining}</strong>
              </p>

              <p className="mt-1">
                Passing:{" "}
                <strong>
                  {PASS_MARK}/{questions.length}
                </strong>
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
      </div>
    </main>
  );
}