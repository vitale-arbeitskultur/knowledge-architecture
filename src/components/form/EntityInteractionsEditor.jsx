import SelectField from './SelectField'

const OPERATIONS = [
  { value: 'create', label: 'Create' },
  { value: 'read', label: 'Read' },
  { value: 'update', label: 'Update' },
  { value: 'archive', label: 'Archive' }
]

export default function EntityInteractionsEditor({ value = [], onChange, entities }) {
  const entityOptions = entities.map(e => ({ value: e.id, label: e.name }))

  const updateItem = (idx, field, val) => {
    const updated = [...value]
    updated[idx] = { ...updated[idx], [field]: val }
    onChange(updated)
  }

  const addRow = () => {
    onChange([...value, { entityId: '', operation: '' }])
  }

  const removeRow = (idx) => {
    onChange(value.filter((_, i) => i !== idx))
  }

  return (
    <div className="entity-interactions-editor">
      {value.map((interaction, idx) => (
        <div key={idx} className="interaction-editor-row">
          <SelectField
            value={interaction.entityId}
            onChange={val => updateItem(idx, 'entityId', val)}
            placeholder="Entity..."
            options={entityOptions}
          />
          <SelectField
            value={interaction.operation}
            onChange={val => updateItem(idx, 'operation', val)}
            placeholder="Operation..."
            options={OPERATIONS}
          />
          <button type="button" className="btn-remove-row" onClick={() => removeRow(idx)} title="Remove">
            ×
          </button>
        </div>
      ))}
      <button type="button" className="btn-add-row" onClick={addRow}>
        + Add interaction
      </button>
    </div>
  )
}
