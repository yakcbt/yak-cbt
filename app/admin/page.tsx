"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ExamResult = {
  id: number;
  created_at: string;
  candidate_name: string;
  candidate_no: number | null;
  course: string;
  score: number;
};

export default function AdminPage() {
 const [results, setResults] = useState<ExamResult[]>([]);
const [loading, setLoading] = useState(true);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [authLoading, setAuthLoading] = useState(true);
const [loginError, setLoginError] = useState("");

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setIsLoggedIn(!!session);
    setAuthLoading(false);

    if (session) {
      fetchResults();
    }
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setIsLoggedIn(!!session);

    if (session) {
      fetchResults();
    } else {
      setResults([]);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);
  async function fetchResults() {
    setLoading(true);

    const { data, error } = await supabase
      .from("exam_results")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching results:", error);
    } else {
      setResults(data || []);
    }

    setLoading(false);
  }
  async function deleteResult(id: number) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this result?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("exam_results")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Result delete nahi hua.");
    console.error(error);
    return;
  }

  setResults((prev) => prev.filter((result) => result.id !== id));
}
async function handleLogin(e: React.FormEvent) {
  e.preventDefault();
  setLoginError("");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setLoginError("Invalid email or password");
  }
}

async function handleLogout() {
  await supabase.auth.signOut();
}

if (authLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

if (!isLoggedIn) {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          YAK CBT Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-8 w-full border rounded-lg p-3 print:p-1"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full border rounded-lg p-3 print:p-1"
          required
        />

        {loginError && (
          <p className="mt-3 text-red-600">{loginError}</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-700 p-3 font-bold text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}
return (
  <>
    <style jsx global>{`
      @media print {
        @page {
          size: A4 landscape;
          margin: 3mm;
        }
          table {
  font-size: 11px !important;
  line-height: 1 !important;
}

th, td {
  padding: 0 !important;
  height: auto !important;
}
      }
    `}</style>

    <main className="min-h-screen bg-gray-100 p-6 print:min-h-0 print:bg-white print:p-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              YAK CBT Admin Panel
            </h1>
            <p className="text-gray-600">Candidate Exam Results</p>
          </div>

          <button
            onClick={fetchResults}
className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white print:hidden"
          >
            Refresh
          </button>
        
          <button
  onClick={() => window.print()}
className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white print:hidden"
>
  Print Results
</button>
<button
  onClick={handleLogout}
className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 print:hidden">
  Logout
</button>
        </div>

       <div className="overflow-x-auto rounded-xl bg-white shadow print:overflow-visible print:rounded-none print:shadow-none">
          {loading ? (
            <p className="p-6">Loading results...</p>
          ) : (

<table className="w-full text-sm print:table-fixed print:text-[9px]">
  <thead>
                <tr>
                  <th className="p-3 text-left">Date / Time</th>
                  <th className="p-3 text-left">Candidate Name</th>
<th className="p-3 text-left">Roll No.</th>

                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Score</th>.
                  <th className="p-3 text-left print:hidden">Delete</th>
                  <th className="p-3 text-left">Result</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => {
                  const passed = result.score >= 15;

                  return (
                    <tr key={result.id} className="border-b">
<td className="p-3 print:p-1">
                        {new Date(result.created_at).toLocaleString()}
                      </td>
                      <td className="p-3 print:p-1">{result.candidate_name}</td>
                      <td className="p-3 print:p-1">{result.candidate_no ?? "-"}</td>
                      <td className="p-3 print:p-1 font-semibold">{result.course}</td>
                      <td className="p-3 print:p-1">{result.score}/30</td>
                      <td
                        className={`p-3 print:p-1 font-bold ${
                          passed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {passed ? "PASS" : "FAIL"}
                      </td>
                      <td className="p-3 print:hidden">
  <button
    onClick={() => deleteResult(result.id)}
    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
  >
    Delete
  </button>
</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main></>
  );
}