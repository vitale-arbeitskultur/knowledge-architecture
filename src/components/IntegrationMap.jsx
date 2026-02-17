import { useState, useMemo } from 'react';
import { getMaturityInfo, getFrequencyLabel, getOperationLabel } from '../utils/dataHelpers';
import { getRiskColor, getRiskLabel, RISK_LEVELS } from '../utils/riskCalculation';

export default function IntegrationMap({
  integrations,
  applications,
  entities,
  risks,
  onSelect
}) {
  const [selectedRisks, setSelectedRisks] = useState(new Set());
  const [selectedApp, setSelectedApp] = useState('');

  // Create app index for easier lookup
  const appIndex = {};
  applications.forEach(app => {
    appIndex[app.id] = app;
  });

  // Create entity index
  const entityIndex = {};
  (entities || []).forEach(e => {
    entityIndex[e.id] = e;
  });

  // Toggle risk filter
  const toggleRiskFilter = (risk) => {
    const newSelected = new Set(selectedRisks);
    if (newSelected.has(risk)) {
      newSelected.delete(risk);
    } else {
      newSelected.add(risk);
    }
    setSelectedRisks(newSelected);
  };

  // Filter integrations by selected criteria
  const filteredIntegrations = useMemo(() => {
    return integrations.filter(int => {
      const riskLevel = risks.integrationRisks?.[int.id] || 'none';

      if (selectedRisks.size > 0 && !selectedRisks.has(riskLevel)) {
        return false;
      }

      if (selectedApp) {
        const isSource = int.sourceApplicationId === selectedApp;
        const isTarget = int.targetApplicationId === selectedApp;
        if (!isSource && !isTarget) {
          return false;
        }
      }

      return true;
    });
  }, [integrations, selectedRisks, selectedApp, risks]);

  // Sort by risk level (critical -> none)
  const riskOrder = ['critical', 'high', 'medium', 'low', 'none'];
  const sortedIntegrations = [...filteredIntegrations].sort((a, b) => {
    const riskA = risks.integrationRisks?.[a.id] || 'none';
    const riskB = risks.integrationRisks?.[b.id] || 'none';
    return riskOrder.indexOf(riskA) - riskOrder.indexOf(riskB);
  });

  // Get unique apps for filter dropdown
  const uniqueApps = Array.from(
    new Set(
      integrations.flatMap(int => [int.sourceApplicationId, int.targetApplicationId])
    )
  ).sort();

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Integration Map</h1>
        <p className="page-subtitle">System integrations sorted by risk level with quality dimensions</p>
      </div>

      <div className="controls-bar">
        <div className="risk-filters">
          <label className="filter-label">Filter by Risk:</label>
          {RISK_LEVELS.filter(r => r !== 'none').map(risk => (
            <label key={risk} className="risk-checkbox">
              <input
                type="checkbox"
                checked={selectedRisks.has(risk)}
                onChange={() => toggleRiskFilter(risk)}
              />
              <span
                className="risk-indicator-label"
                style={{ color: getRiskColor(risk) }}
              >
                {getRiskLabel(risk)}
              </span>
            </label>
          ))}
        </div>

        <div className="app-filter">
          <label className="filter-label">Application:</label>
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="app-select"
          >
            <option value="">All Applications</option>
            {uniqueApps.map(appId => {
              const app = appIndex[appId];
              return app ? (
                <option key={appId} value={appId}>
                  {app.name}
                </option>
              ) : null;
            })}
          </select>
        </div>
      </div>

      <div className="integration-list">
        {sortedIntegrations.length > 0 ? (
          sortedIntegrations.map(integration => {
            const sourceApp = appIndex[integration.sourceApplicationId];
            const targetApp = appIndex[integration.targetApplicationId];
            const riskLevel = risks.integrationRisks?.[integration.id] || 'none';
            const maturity = getMaturityInfo(integration.maturity);
            const frequency = getFrequencyLabel(integration.frequency);

            const flowingEntities = (integration.entityInteractions || [])
              .map(ei => {
                const entity = entityIndex[ei.entityId];
                return entity ? { ...entity, operation: ei.operation } : null;
              })
              .filter(Boolean);

            return (
              <div
                key={integration.id}
                className="integration-row"
                onClick={() => onSelect({ type: 'integration', id: integration.id })}
              >
                <div className="integration-flow">
                  <span className="app-name source">
                    {sourceApp?.name || 'Unknown'}
                  </span>
                  <span className="flow-arrow">→</span>
                  <span className="app-name target">
                    {targetApp?.name || 'Unknown'}
                  </span>
                </div>

                <div className="integration-badges">
                  {integration.type && (
                    <span className="type-badge">
                      {integration.type}
                    </span>
                  )}

                  <span
                    className="maturity-badge"
                    style={{ color: maturity.color }}
                  >
                    {maturity.label}
                  </span>

                  <span
                    className="reliability-badge"
                    style={{ color: getReliabilityColor(integration.reliability) }}
                  >
                    {integration.reliability}
                  </span>

                  {frequency && (
                    <span className="frequency-label">
                      {frequency}
                    </span>
                  )}

                  <span
                    className="risk-badge"
                    style={{
                      backgroundColor: riskLevel === 'none' ? '#e2e8f0' : getRiskColor(riskLevel),
                      color: riskLevel === 'none' ? '#64748b' : '#fff'
                    }}
                  >
                    {getRiskLabel(riskLevel)}
                  </span>
                </div>

                {flowingEntities.length > 0 && (
                  <div className="entity-badges">
                    {flowingEntities.map((entity, idx) => (
                      <span key={idx} className="entity-badge">
                        {entity.name}
                        <span className={`op-badge op-${entity.operation}`}>{entity.operation}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="no-results">No integrations match the selected filters</p>
        )}
      </div>
    </div>
  );
}

function getReliabilityColor(reliability) {
  const colors = {
    'high': '#22c55e',
    'medium': '#f59e0b',
    'low': '#ef4444'
  };
  return colors[reliability] || '#6b7280';
}
