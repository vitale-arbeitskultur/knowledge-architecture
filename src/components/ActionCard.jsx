import React, { useState } from 'react'
import { resolveRaciRef } from '../utils/dataHelpers'
import { getRiskColor } from '../utils/riskCalculation'

export default function ActionCard({ action, roleIndex, teamIndex, applications, riskLevel, onSelect }) {
  const [showRaci, setShowRaci] = useState(false)

  // Resolve accountable role/team
  const accountableRef = action.raci?.accountable
  const accountableName = accountableRef ? resolveRaciRef(accountableRef, roleIndex, teamIndex) : null

  // Get application badges
  const appIds = action.applicationIds || []
  const appBadges = appIds.slice(0, 3).map(appId => {
    const app = applications.find(a => a.id === appId)
    return app
      ? {
          id: appId,
          name: app.name,
          abbr: app.name.split(' ')[0].toUpperCase()
        }
      : null
  }).filter(Boolean)

  const appOverflow = appIds.length > 3 ? appIds.length - 3 : 0

  // Resolve other RACI entries for tooltip
  const responsible = action.raci?.responsible
  const consulted = action.raci?.consulted
  const informed = action.raci?.informed

  const responsibleNames = (Array.isArray(responsible) ? responsible : [responsible])
    .filter(Boolean)
    .map(ref => resolveRaciRef(ref, roleIndex, teamIndex))
    .join(', ')

  const consultedNames = (Array.isArray(consulted) ? consulted : [consulted])
    .filter(Boolean)
    .map(ref => resolveRaciRef(ref, roleIndex, teamIndex))
    .join(', ')

  const informedNames = (Array.isArray(informed) ? informed : [informed])
    .filter(Boolean)
    .map(ref => resolveRaciRef(ref, roleIndex, teamIndex))
    .join(', ')

  return (
    <div
      className="action-card"
      onClick={() => onSelect({ type: 'action', id: action.id })}
      onMouseEnter={() => setShowRaci(true)}
      onMouseLeave={() => setShowRaci(false)}
    >
      <div className="action-card-name">{action.name}</div>

      <div className="action-card-footer">
        {accountableName && (
          <span className="accountable-badge" title="Accountable">
            {accountableName.split(' ')[0]}
          </span>
        )}

        <div className="action-card-apps">
          {appBadges.map(app => (
            <span key={app.id} className="app-badge" title={app.name}>
              {app.abbr}
            </span>
          ))}
          {appOverflow > 0 && <span className="app-overflow">+{appOverflow}</span>}
        </div>

        {riskLevel && riskLevel !== 'none' && (
          <div
            className="risk-dot"
            style={{ backgroundColor: getRiskColor(riskLevel) }}
            title={`Risk: ${riskLevel}`}
          />
        )}
      </div>

      {showRaci && (
        <div className="action-card-raci-tooltip">
          <div className="raci-row">
            <span className="raci-label">Accountable:</span>
            <span>{accountableName || '—'}</span>
          </div>
          {responsibleNames && (
            <div className="raci-row">
              <span className="raci-label">Responsible:</span>
              <span>{responsibleNames}</span>
            </div>
          )}
          {consultedNames && (
            <div className="raci-row">
              <span className="raci-label">Consulted:</span>
              <span>{consultedNames}</span>
            </div>
          )}
          {informedNames && (
            <div className="raci-row">
              <span className="raci-label">Informed:</span>
              <span>{informedNames}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
