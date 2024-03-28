export default function Select({
  label,
  data,
  setData,
  name
}: {
  label: string,
  data: string[],
  setData: (data: any) => void,
  name: string,
}) {
  return (
    <div className="flex flex-col items-start w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <select className="appearance-none md:appearance-auto bg-white border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5" onChange={(e) => setData({ [name]: e.target.value })}>
        <option value="">Sélectionnez une option</option>
        {data.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}
