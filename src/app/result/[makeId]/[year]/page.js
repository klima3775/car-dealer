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
    <div>
      <h1 className="text-2xl font-bold mb-4">Car models</h1>
      <ul>
        {data.Results.map((model) => (
          <li key={model.Model_ID}>{model.Model_Name}</li>
        ))}
      </ul>
    </div>
  );
}
