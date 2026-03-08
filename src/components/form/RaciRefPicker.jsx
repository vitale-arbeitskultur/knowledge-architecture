import SelectField from './SelectField'

export default function RaciRefPicker({ value, onChange, teams, onRemove }) {
  const type = value?.type || ''
  const id = value?.id || ''

  const handleTypeChange = (newType) => {
    onChange({ type: newType, id: '' })
  }

  const handleIdChange = (newId) => {
    onChange({ ...value, id: newId })
  }

  // Build ID options based on type
  const idOptions = []
  if (type === 'team') {
    teams.forEach(t => {
      idOptions.push({ value: t.id, label: t.name })
    })
  } else if (type === 'role') {
    teams.forEach(t => {
      t.roles.forEach(r => {
        idOptions.push({ value: r.id, label: `${r.name} (${t.name})` })
      })
    })
  }

  return (
    <div className="raci-ref-picker">
      <SelectField
        value={type}
        onChange={handleTypeChange}
        placeholder="Type..."
        options={[
          { value: 'team', label: 'Team' },
          { value: 'role', label: 'Role' }
        ]}
      />
      <SelectField
        value={id}
        onChange={handleIdChange}
        placeholder="Select..."
        options={idOptions}
        disabled={!type}
      />
      {onRemove && (
        <button type="button" className="btn-remove-row" onClick={onRemove} title="Remove">
          ×
        </button>
      )}
    </div>
  )
}
