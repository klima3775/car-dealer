import React, { Suspense } from "react";
import CarModels from "../../../../components/CarModels";

export default function ResultsPage({ params }) {
  const { makeId, year } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Car models</h1>
      <Suspense fallback={<div>Loading car models...</div>}>
        <CarModels makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
