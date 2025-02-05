export async function generateStaticParams() {
  const res = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const makes = await res.json();

  const years = Array.from(
    { length: new Date().getFullYear() - 2014 },
    (_, i) => 2015 + i
  );

  return makes.Results.flatMap((make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    }))
  );
}

async function getData(makeId, year) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  if (!res.ok) throw new Error("Ошибка загрузки данных");
  return res.json();
}

export default async function ResultsPage({ params }) {
  const { makeId, year } = await params;
  let data;

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    data = await response.json();
  } catch (error) {
    console.error("Ошибка загрузки моделей:", error);
    data = { Results: [] };
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Модели автомобилей</h1>
      <ul>
        {data.Results.map((model) => (
          <li key={model.Model_ID}>{model.Model_Name}</li>
        ))}
      </ul>
    </div>
  );
}
