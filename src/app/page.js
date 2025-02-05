"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMakes } from "../api/getMakes";

export default function HomePage() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: new Date().getFullYear() - 2009 },
    (_, i) => 2010 + i
  );

  useEffect(() => {
    getMakes()
      .then((data) => setMakes(data))
      .catch((error) => console.error("Error loading car brands:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <h1 className="text-2xl font-bold mb-4">Select a car</h1>
      <div className="w-full max-w-md space-y-4">
        <select
          className="w-full p-2 border rounded"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option value="">Select a car brands</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded "
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
              ? "bg-blue-500 text-black"
              : "bg-gray-300 "
          }`}
          disabled={!selectedMake || !selectedYear}
          onClick={() => router.push(`/result/${selectedMake}/${selectedYear}`)}
        >
          Далее
        </button>
      </div>
    </div>
  );
}
