import { getModels } from "../../../../api/getModels";

export default async function ResultsPage({ params }) {
  const { makeId, year } = params;

  let data;
  try {
    data = await getModels(makeId, year);
  } catch (error) {
    console.error("Error loading car models:", error);
    data = { Results: [] };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Car models</h1>
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
    </div>
  );
}
