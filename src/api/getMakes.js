export async function getMakes() {
  try {
    const res = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );

    if (!res.ok) throw new Error("Error in fetch");

    const data = await res.json();
    return data.Results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
