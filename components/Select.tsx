export default function Select({
  label,
  data,
  setData,
  name
}: {
  label: string,
  data: string[] | { name: string, characteristics: string }[],
  setData: (data: any) => void,
  name: string,
}) {
  const renderOption = (item: string | { name: string, characteristics: string }, index: number) => {
    if (typeof item === 'string') {
      return (
        <option key={index} value={item}>{item}</option>
      );
    } else {

      return (
        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
      );
    }
  };

  // Adjusted onChange handler to account for object values
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    try {
      const parsedValue = JSON.parse(value);
      setData({ [name]: parsedValue });
    } catch {
      setData({ [name]: value });
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <select
        className="appearance-none md:appearance-auto bg-white border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        onChange={handleChange}
      >

        <option value="">Sélectionnez une option</option>
        {data.map(renderOption)}
      </select>
    </div>
  );
}
