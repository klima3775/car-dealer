export async function getModels(makeId, year) {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    if (!response.ok) throw new Error("data loading error");
    return response.json();
  } catch (error) {
    console.error(error);
    return { Results: [] };
  }
}
