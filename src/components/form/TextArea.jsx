export default function TextArea({ value, onChange, placeholder, rows = 3, ...rest }) {
  return (
    <textarea
      className="form-textarea"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      {...rest}
    />
  )
}
