export default function Select({
  label,
  data,
  setData
}:
  {
    label: string,
    data: string[],
    setData: (data: string[]) => void
  }) {
  return (
    <div className="flex flex-col items-start w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <select defaultValue="default" id="countries" className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5" onChange={(e) => setData([e.target.value])}>
        {
          data.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))
        }
      </select>
    </div>
  )
}