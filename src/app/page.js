"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { getMakes } from "../api/getMakes";
import CarMakes from "../components/CarMakes";

export default function HomePage() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 2008; year <= currentYear; year++) {
    years.push(year);
  }

  useEffect(() => {
    getMakes()
      .then((data) => setMakes(data))
      .catch((error) => console.error("Error loading car brands:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Select a car</h1>
      <div className="w-full max-w-md space-y-4 bg-white p-4 border border-gray-300 rounded shadow-md">
        <Suspense fallback={<div>Loading car brands...</div>}>
          {makes.length === 0 ? (
            <div>Loading car brands...</div>
          ) : (
            <CarMakes
              makes={makes}
              selectedMake={selectedMake}
              setSelectedMake={setSelectedMake}
            />
          )}
        </Suspense>
        <select
          className="w-full p-2 border rounded text-foreground"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          className={`w-full p-2 rounded ${
            selectedMake && selectedYear
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
          disabled={!selectedMake || !selectedYear}
          onClick={() => router.push(`/result/${selectedMake}/${selectedYear}`)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
