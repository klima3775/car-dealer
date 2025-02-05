"use client";

import React, { useState, useEffect } from "react";
import { getModels } from "../api/getModels";

export default function CarModels({ makeId, year }) {
  const [data, setData] = useState({ Results: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getModels(makeId, year);
        setData(result);
      } catch (error) {
        console.error("Error loading car models:", error);
        setData({ Results: [] });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [makeId, year]);

  if (loading) {
    return <div>Loading car models...</div>;
  }

  return (
    <ul className="w-full max-w-md bg-white p-4 border border-gray-300 rounded shadow-md space-y-2">
      {data.Results.map((model, index) => (
        <li
          key={`${model.Model_ID}-${index}`}
          className="p-2 border-b last:border-none text-foreground"
        >
          {model.Model_Name}
        </li>
      ))}
    </ul>
  );
}
