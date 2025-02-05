export default function CarMakes({ makes, selectedMake, setSelectedMake }) {
  return (
    <select
      className="w-full p-2 border rounded text-foreground"
      value={selectedMake}
      onChange={(e) => setSelectedMake(e.target.value)}
    >
      <option value="">Select a car brand</option>
      {makes.map((make) => (
        <option key={make.MakeId} value={make.MakeId}>
          {make.MakeName}
        </option>
      ))}
    </select>
  );
}
