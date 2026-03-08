import RaciRefPicker from './RaciRefPicker'

const EMPTY_REF = { type: '', id: '' }

export default function RaciEditor({ value, onChange, teams }) {
  const raci = value || { accountable: null, responsible: null, consulted: [], informed: [] }

  const update = (field, val) => {
    onChange({ ...raci, [field]: val })
  }

  const updateArrayItem = (field, idx, val) => {
    const arr = [...(raci[field] || [])]
    arr[idx] = val
    onChange({ ...raci, [field]: arr })
  }

  const addToArray = (field) => {
    onChange({ ...raci, [field]: [...(raci[field] || []), { ...EMPTY_REF }] })
  }

  const removeFromArray = (field, idx) => {
    onChange({ ...raci, [field]: (raci[field] || []).filter((_, i) => i !== idx) })
  }

  return (
    <div className="raci-editor">
      <div className="raci-editor-section">
        <span className="raci-editor-label">Accountable</span>
        <RaciRefPicker
          value={raci.accountable || EMPTY_REF}
          onChange={val => update('accountable', val)}
          teams={teams}
        />
      </div>

      <div className="raci-editor-section">
        <span className="raci-editor-label">Responsible</span>
        <RaciRefPicker
          value={raci.responsible || EMPTY_REF}
          onChange={val => update('responsible', val)}
          teams={teams}
        />
      </div>

      <div className="raci-editor-section">
        <span className="raci-editor-label">Consulted</span>
        {(raci.consulted || []).map((ref, idx) => (
          <RaciRefPicker
            key={idx}
            value={ref}
            onChange={val => updateArrayItem('consulted', idx, val)}
            teams={teams}
            onRemove={() => removeFromArray('consulted', idx)}
          />
        ))}
        <button type="button" className="btn-add-row" onClick={() => addToArray('consulted')}>
          + Add consulted
        </button>
      </div>

      <div className="raci-editor-section">
        <span className="raci-editor-label">Informed</span>
        {(raci.informed || []).map((ref, idx) => (
          <RaciRefPicker
            key={idx}
            value={ref}
            onChange={val => updateArrayItem('informed', idx, val)}
            teams={teams}
            onRemove={() => removeFromArray('informed', idx)}
          />
        ))}
        <button type="button" className="btn-add-row" onClick={() => addToArray('informed')}>
          + Add informed
        </button>
      </div>
    </div>
  )
}
