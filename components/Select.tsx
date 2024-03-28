export default function Select({ label, data, setData, name, disabled }: { label: string; data: string[] | { name: string; characteristics: string }[]; setData: (data: any) => void; name: string; disabled?: boolean }) {

  const renderOption = (item: string | { name: string; characteristics: string }, index: number) => {
    if (typeof item === "string") {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      )
    } else {
      return (
        <option key={index} value={JSON.stringify(item)}>
          {item.name}
        </option>
      )
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    try {
      const parsedValue = JSON.parse(value)
      setData({ [name]: parsedValue })
    } catch {
      setData({ [name]: value })
    }
  }


  return (
    <div className="flex flex-col items-start w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <select className={`${disabled ? "cursor-not-allowed bg-gray-100" : "cursor-pointer bg-white"} appearance-none md:appearance-auto border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5`} onChange={handleChange} disabled={disabled}>
        <option value={name === "temperatureType" ? "1" : ""}>Sélectionnez une option</option>
        {data.map(renderOption)}
      </select>
    </div>
  )
}
