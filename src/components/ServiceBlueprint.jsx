import React from 'react'
import ActionCard from './ActionCard'
import { getRiskColor } from '../utils/riskCalculation'

const LANES = [
  { id: 'customer', label: 'Customer' },
  { id: 'frontstage', label: 'Frontstage' },
  { id: 'backstage', label: 'Backstage' },
  { id: 'support', label: 'Support' }
]

const DIVIDERS = [
  { afterLane: 'customer', label: 'Line of Interaction', className: 'interaction-line' },
  { afterLane: 'frontstage', label: 'Line of Visibility', className: 'visibility-line' }
]

export default function ServiceBlueprint({ stages, actions, applications, roleIndex, teamIndex, risks, onSelect }) {
  const sortedStages = [...stages].sort((a, b) => a.order - b.order)
  const cols = sortedStages.length + 1 // +1 for lane labels

  const getActionsForCell = (stageId, lane) => {
    return actions.filter(a => a.valueChainStageId === stageId && a.lane === lane)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Service Design Blueprint</h1>
        <p className="page-subtitle">Customer value chain with swim lanes showing actions, responsibilities, and risk indicators</p>
      </div>

      <div className="blueprint-container">
        <div
          className="blueprint"
          style={{ gridTemplateColumns: `44px repeat(${sortedStages.length}, minmax(140px, 1fr))` }}
        >
          {/* Header row: empty corner + stage headers */}
          <div className="lane-label-col" style={{ gridRow: 1 }}></div>
          {sortedStages.map(stage => {
            const stageRisk = risks.stageRisks?.[stage.id] || 'none'
            return (
              <div key={stage.id} className="stage-header">
                {stage.name}
                {stageRisk !== 'none' && (
                  <span
                    className="risk-dot"
                    style={{
                      backgroundColor: getRiskColor(stageRisk),
                      marginLeft: 6,
                      verticalAlign: 'middle'
                    }}
                    title={`Stage risk: ${stageRisk}`}
                  />
                )}
              </div>
            )
          })}

          {/* Lane rows */}
          {LANES.map((lane, laneIdx) => {
            const divider = DIVIDERS.find(d => d.afterLane === lane.id)
            return (
              <React.Fragment key={lane.id}>
                {/* Lane label */}
                <div className="lane-label-col">
                  {lane.label}
                </div>

                {/* Cells */}
                {sortedStages.map(stage => {
                  const cellActions = getActionsForCell(stage.id, lane.id)
                  return (
                    <div
                      key={`${stage.id}-${lane.id}`}
                      className={`lane-cell lane-${lane.id}`}
                    >
                      {cellActions.map(action => (
                        <ActionCard
                          key={action.id}
                          action={action}
                          roleIndex={roleIndex}
                          teamIndex={teamIndex}
                          applications={applications}
                          riskLevel={risks.actionRisks?.[action.id] || 'none'}
                          onSelect={onSelect}
                        />
                      ))}
                      {cellActions.length === 0 && (
                        <div style={{ opacity: 0.3, fontSize: 11, color: '#94a3b8' }}>—</div>
                      )}
                    </div>
                  )
                })}

                {/* Divider after this lane if applicable */}
                {divider && (
                  <div className={`lane-divider ${divider.className}`}>
                    <span className="divider-label">{divider.label}</span>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
