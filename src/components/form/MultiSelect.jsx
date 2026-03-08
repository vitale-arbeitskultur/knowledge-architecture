export default function MultiSelect({ value = [], onChange, options }) {
  const toggle = (optValue) => {
    if (value.includes(optValue)) {
      onChange(value.filter(v => v !== optValue))
    } else {
      onChange([...value, optValue])
    }
  }

  return (
    <div className="multi-select">
      {options.map(opt => (
        <label key={opt.value} className="multi-select-option">
          <input
            type="checkbox"
            checked={value.includes(opt.value)}
            onChange={() => toggle(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
