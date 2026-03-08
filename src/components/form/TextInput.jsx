export default function TextInput({ value, onChange, placeholder, ...rest }) {
  return (
    <input
      type="text"
      className="form-input"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      {...rest}
    />
  )
}
