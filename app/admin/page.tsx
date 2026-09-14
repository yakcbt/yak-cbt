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
          className="mt-8 w-full border rounded-lg p-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full border rounded-lg p-3"
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
    <main className="min-h-screen bg-gray-100 p-6">
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
            className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white"
          >
            Refresh
          </button>
          <button
  onClick={handleLogout}
  className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
>
  Logout
</button>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white shadow">
          {loading ? (
            <p className="p-6">Loading results...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3 text-left">Date / Time</th>
                  <th className="p-3 text-left">Candidate Name</th>
                  <th className="p-3 text-left">INDOS / No.</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Score</th>
                  <th className="p-3 text-left">Result</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => {
                  const passed = result.score >= 18;

                  return (
                    <tr key={result.id} className="border-b">
                      <td className="p-3">
                        {new Date(result.created_at).toLocaleString()}
                      </td>
                      <td className="p-3">{result.candidate_name}</td>
                      <td className="p-3">{result.candidate_no ?? "-"}</td>
                      <td className="p-3 font-semibold">{result.course}</td>
                      <td className="p-3">{result.score}/30</td>
                      <td
                        className={`p-3 font-bold ${
                          passed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {passed ? "PASS" : "FAIL"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}