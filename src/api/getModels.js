export async function getModels(makeId, year) {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}
