import { useState } from 'react'
import FormField from './form/FormField'
import TextInput from './form/TextInput'
import TextArea from './form/TextArea'
import SelectField from './form/SelectField'
import MultiSelect from './form/MultiSelect'
import RaciEditor from './form/RaciEditor'
import EntityInteractionsEditor from './form/EntityInteractionsEditor'

const LANE_OPTIONS = [
  { value: 'customer', label: 'Customer' },
  { value: 'frontstage', label: 'Frontstage' },
  { value: 'backstage', label: 'Backstage' },
  { value: 'support', label: 'Support' }
]

function makeEmptyAction(defaults = {}) {
  return {
    id: '',
    name: '',
    description: '',
    lane: defaults.lane || '',
    valueChainStageId: defaults.valueChainStageId || '',
    raci: { accountable: null, responsible: null, consulted: [], informed: [] },
    applicationIds: [],
    entityInteractions: []
  }
}

function generateId(actions) {
  const maxNum = actions.reduce((max, a) => {
    const num = parseInt(a.id.replace('act-', ''), 10)
    return isNaN(num) ? max : Math.max(max, num)
  }, 0)
  return `act-${maxNum + 1}`
}

export default function ActionForm({
  selectedItem,
  actions,
  stages,
  applications,
  teams,
  entities,
  onSave,
  onDelete
}) {
  const isNew = selectedItem.isNew
  const existing = isNew ? null : actions.find(a => a.id === selectedItem.id)

  const [form, setForm] = useState(() => {
    if (existing) {
      return {
        ...existing,
        applicationIds: [...(existing.applicationIds || [])],
        entityInteractions: (existing.entityInteractions || []).map(ei => ({ ...ei })),
        raci: {
          accountable: existing.raci?.accountable ? { ...existing.raci.accountable } : null,
          responsible: existing.raci?.responsible ? { ...existing.raci.responsible } : null,
          consulted: (existing.raci?.consulted || []).map(r => ({ ...r })),
          informed: (existing.raci?.informed || []).map(r => ({ ...r }))
        }
      }
    }
    return makeEmptyAction(selectedItem.defaults)
  })

  const [error, setError] = useState('')

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const stageOptions = stages.map(s => ({ value: s.id, label: s.name }))
  const appOptions = applications.map(a => ({ value: a.id, label: a.name }))

  const handleSave = () => {
    if (!form.name.trim()) {
      setError('Name is required')
      return
    }
    setError('')

    const toSave = {
      ...form,
      name: form.name.trim(),
      id: isNew ? generateId(actions) : form.id
    }

    // Clean up empty RACI refs
    const cleanRef = ref => (ref && ref.type && ref.id) ? ref : null
    toSave.raci = {
      accountable: cleanRef(toSave.raci?.accountable),
      responsible: cleanRef(toSave.raci?.responsible),
      consulted: (toSave.raci?.consulted || []).filter(r => r.type && r.id),
      informed: (toSave.raci?.informed || []).filter(r => r.type && r.id)
    }

    // Clean up empty entity interactions
    toSave.entityInteractions = (toSave.entityInteractions || []).filter(
      ei => ei.entityId && ei.operation
    )

    onSave(toSave)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete action "${form.name}"?`)) {
      onDelete(form.id)
    }
  }

  return (
    <div className="detail-content">
      <h2 className="detail-header">{isNew ? 'New Action' : 'Edit Action'}</h2>

      {error && <div className="form-error">{error}</div>}

      <div className="action-form">
        <FormField label="Name" required>
          <TextInput
            value={form.name}
            onChange={val => updateField('name', val)}
            placeholder="Action name"
          />
        </FormField>

        <FormField label="Description">
          <TextArea
            value={form.description}
            onChange={val => updateField('description', val)}
            placeholder="What does this action do?"
          />
        </FormField>

        <div className="form-row-2col">
          <FormField label="Lane">
            <SelectField
              value={form.lane}
              onChange={val => updateField('lane', val)}
              placeholder="Select lane..."
              options={LANE_OPTIONS}
            />
          </FormField>

          <FormField label="Value Chain Stage">
            <SelectField
              value={form.valueChainStageId}
              onChange={val => updateField('valueChainStageId', val)}
              placeholder="Select stage..."
              options={stageOptions}
            />
          </FormField>
        </div>

        <FormField label="Applications">
          <MultiSelect
            value={form.applicationIds}
            onChange={val => updateField('applicationIds', val)}
            options={appOptions}
          />
        </FormField>

        <FormField label="RACI">
          <RaciEditor
            value={form.raci}
            onChange={val => updateField('raci', val)}
            teams={teams}
          />
        </FormField>

        <FormField label="Entity Interactions">
          <EntityInteractionsEditor
            value={form.entityInteractions}
            onChange={val => updateField('entityInteractions', val)}
            entities={entities}
          />
        </FormField>

        <div className="form-actions">
          <button type="button" className="btn-save" onClick={handleSave}>
            Save
          </button>
          {!isNew && (
            <button type="button" className="btn-delete" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
