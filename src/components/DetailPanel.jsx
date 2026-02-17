import { getRiskColor, getRiskLabel } from '../utils/riskCalculation';
import { resolveRaciRef, getTimekInfo, getMaturityInfo, getFrequencyLabel, getOperationLabel } from '../utils/dataHelpers';

export default function DetailPanel({
  selectedItem,
  onClose,
  data
}) {
  if (!selectedItem) {
    return null;
  }

  const {
    stages,
    actions,
    teams,
    roles,
    persons,
    applications,
    domains,
    entities,
    integrations,
    roleIndex,
    teamIndex,
    appIndex,
    domainIndex,
    entityIndex,
    personIndex,
    risks
  } = data;

  const renderActionDetail = () => {
    const action = actions.find(a => a.id === selectedItem.id);
    if (!action) return null;

    const stage = stages?.find(s => s.id === action.valueChainStageId);
    const relatedApps = (action.applicationIds || [])
      .map(appId => appIndex[appId])
      .filter(Boolean);

    const raci = action.raci || {};
    const accountable = resolveRaciRef(raci.accountable, roleIndex, teamIndex);
    const responsible = resolveRaciRef(raci.responsible, roleIndex, teamIndex);
    const consulted = (raci.consulted || []).map(ref => resolveRaciRef(ref, roleIndex, teamIndex));
    const informed = (raci.informed || []).map(ref => resolveRaciRef(ref, roleIndex, teamIndex));

    const riskLevel = risks.actionRisks?.[action.id] || 'none';

    return (
      <div className="detail-content">
        <h2 className="detail-header">{action.name}</h2>

        {action.description && (
          <p className="detail-description">{action.description}</p>
        )}

        <div className="detail-section">
          <div className="detail-badges">
            {stage && (
              <span className="stage-badge">
                Stage: {stage.name}
              </span>
            )}
            {action.lane && (
              <span className="lane-badge">
                Lane: {action.lane}
              </span>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h3 className="section-title">RACI</h3>
          {accountable !== '—' && (
            <div className="detail-row">
              <span className="detail-label">Accountable:</span>
              <span className="detail-value">{accountable}</span>
            </div>
          )}
          {responsible !== '—' && (
            <div className="detail-row">
              <span className="detail-label">Responsible:</span>
              <span className="detail-value">{responsible}</span>
            </div>
          )}
          {consulted.length > 0 && (
            <div className="detail-row">
              <span className="detail-label">Consulted:</span>
              <span className="detail-value">{consulted.join(', ')}</span>
            </div>
          )}
          {informed.length > 0 && (
            <div className="detail-row">
              <span className="detail-label">Informed:</span>
              <span className="detail-value">{informed.join(', ')}</span>
            </div>
          )}
        </div>

        {relatedApps.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Applications</h3>
            <div className="detail-list">
              {relatedApps.map(app => (
                <div key={app.id} className="list-item">
                  {app.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {action.entityInteractions && action.entityInteractions.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Entity Interactions</h3>
            <table className="interaction-table">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {action.entityInteractions.map((interaction, idx) => {
                  const entity = entityIndex[interaction.entityId];
                  return (
                    <tr key={idx}>
                      <td>{entity?.name || interaction.entityId}</td>
                      <td><span className={`op-badge op-${interaction.operation}`}>{getOperationLabel(interaction.operation)}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {riskLevel !== 'none' && (
          <div className="detail-section">
            <h3 className="section-title">Risk</h3>
            <div className="detail-row">
              <span
                className="risk-level"
                style={{ color: getRiskColor(riskLevel) }}
              >
                {getRiskLabel(riskLevel)}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderApplicationDetail = () => {
    const app = appIndex[selectedItem.id];
    if (!app) return null;

    // Domains connected via app.knowledgeDomainIds
    const relatedDomains = (app.knowledgeDomainIds || [])
      .map(did => domainIndex[did])
      .filter(Boolean);

    const inboundIntegrations = integrations.filter(
      i => i.targetApplicationId === app.id
    );
    const outboundIntegrations = integrations.filter(
      i => i.sourceApplicationId === app.id
    );

    const riskLevel = risks.appRisks?.[app.id] || 'none';
    const owner = roleIndex[app.applicationOwnerRoleId];
    const timek = getTimekInfo(app.strategicClassification);

    return (
      <div className="detail-content">
        <h2 className="detail-header">{app.name}</h2>

        {app.description && (
          <p className="detail-description">{app.description}</p>
        )}

        <div className="detail-section">
          <div className="detail-badges">
            {app.category && (
              <span className="category-badge">
                {app.category}
              </span>
            )}
            {app.strategicClassification && (
              <span className="timek-badge" style={{ backgroundColor: timek.color, color: '#fff' }}>
                {timek.label}
              </span>
            )}
          </div>
        </div>

        {owner && (
          <div className="detail-row">
            <span className="detail-label">Owner:</span>
            <span className="detail-value">{owner.name}</span>
          </div>
        )}

        {relatedDomains.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Connected Domains</h3>
            <div className="detail-list">
              {relatedDomains.map(domain => (
                <div key={domain.id} className="list-item">
                  {domain.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {inboundIntegrations.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Inbound Integrations</h3>
            <div className="detail-list">
              {inboundIntegrations.map(int => {
                const sourceApp = appIndex[int.sourceApplicationId];
                return (
                  <div key={int.id} className="list-item">
                    {sourceApp?.name || 'Unknown'} → {app.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {outboundIntegrations.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Outbound Integrations</h3>
            <div className="detail-list">
              {outboundIntegrations.map(int => {
                const targetApp = appIndex[int.targetApplicationId];
                return (
                  <div key={int.id} className="list-item">
                    {app.name} → {targetApp?.name || 'Unknown'}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {riskLevel !== 'none' && (
          <div className="detail-section">
            <h3 className="section-title">Risk</h3>
            <div className="detail-row">
              <span
                className="risk-level"
                style={{ color: getRiskColor(riskLevel) }}
              >
                {getRiskLabel(riskLevel)}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDomainDetail = () => {
    const domain = domainIndex[selectedItem.id];
    if (!domain) return null;

    // Entities belong to domain via entity.knowledgeDomainId
    const domainEntities = entities.filter(e => e.knowledgeDomainId === domain.id);

    // Apps connected via app.knowledgeDomainIds
    const connectedApps = applications.filter(a =>
      (a.knowledgeDomainIds || []).includes(domain.id)
    );

    const owner = roleIndex[domain.knowledgeOwnerRoleId];

    return (
      <div className="detail-content">
        <h2 className="detail-header">{domain.name}</h2>

        {domain.description && (
          <p className="detail-description">{domain.description}</p>
        )}

        {owner && (
          <div className="detail-row">
            <span className="detail-label">Knowledge Owner:</span>
            <span className="detail-value">{owner.name}</span>
          </div>
        )}

        {domainEntities.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Entities</h3>
            <div className="detail-list">
              {domainEntities.map(entity => (
                <div key={entity.id} className="list-item">
                  {entity.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {connectedApps.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Connected Applications</h3>
            <div className="detail-list">
              {connectedApps.map(app => (
                <div key={app.id} className="list-item">
                  {app.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderIntegrationDetail = () => {
    const integration = integrations.find(i => i.id === selectedItem.id);
    if (!integration) return null;

    const sourceApp = appIndex[integration.sourceApplicationId];
    const targetApp = appIndex[integration.targetApplicationId];
    const riskLevel = risks.integrationRisks?.[integration.id] || 'none';
    const maturity = getMaturityInfo(integration.maturity);
    const frequency = getFrequencyLabel(integration.frequency);

    return (
      <div className="detail-content">
        <h2 className="detail-header">Integration</h2>

        <div className="detail-section">
          <div className="integration-header">
            <span>{sourceApp?.name || 'Unknown'}</span>
            <span className="arrow">→</span>
            <span>{targetApp?.name || 'Unknown'}</span>
          </div>
        </div>

        {integration.description && (
          <div className="detail-section">
            <p>{integration.description}</p>
          </div>
        )}

        <div className="detail-section">
          <h3 className="section-title">Quality Dimensions</h3>
          <div className="detail-row">
            <span className="detail-label">Type:</span>
            <span className="detail-value">{integration.type || '—'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Maturity:</span>
            <span className="detail-value" style={{ color: maturity.color }}>{maturity.label}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Reliability:</span>
            <span className="detail-value">{integration.reliability || '—'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Frequency:</span>
            <span className="detail-value">{frequency || '—'}</span>
          </div>
        </div>

        {integration.entityInteractions && integration.entityInteractions.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Entity Interactions</h3>
            <table className="interaction-table">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {integration.entityInteractions.map((ei, idx) => {
                  const entity = entityIndex[ei.entityId];
                  return (
                    <tr key={idx}>
                      <td>{entity?.name || ei.entityId}</td>
                      <td><span className={`op-badge op-${ei.operation}`}>{getOperationLabel(ei.operation)}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {riskLevel !== 'none' && (
          <div className="detail-section">
            <h3 className="section-title">Risk</h3>
            <div className="detail-row">
              <span
                className="risk-level"
                style={{ color: getRiskColor(riskLevel) }}
              >
                {getRiskLabel(riskLevel)}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEntityDetail = () => {
    const entity = entityIndex[selectedItem.id];
    if (!entity) return null;

    const domain = domainIndex[entity.knowledgeDomainId];

    // Find actions that interact with this entity
    const relatedActions = actions.filter(a =>
      (a.entityInteractions || []).some(ei => ei.entityId === entity.id)
    );

    // Find apps that have this entity's domain
    const relatedApps = domain
      ? applications.filter(a => (a.knowledgeDomainIds || []).includes(domain.id))
      : [];

    return (
      <div className="detail-content">
        <h2 className="detail-header">{entity.name}</h2>

        {domain && (
          <div className="detail-row">
            <span className="detail-label">Domain:</span>
            <span className="detail-value">{domain.name}</span>
          </div>
        )}

        {entity.description && (
          <p className="detail-description">{entity.description}</p>
        )}

        {entity.attributes && entity.attributes.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Attributes</h3>
            <table className="attribute-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Validation</th>
                  <th>Retention</th>
                </tr>
              </thead>
              <tbody>
                {entity.attributes.map((attr, idx) => (
                  <tr key={idx}>
                    <td>{attr.name}</td>
                    <td>{attr.type}</td>
                    <td>{attr.validationRules || '—'}</td>
                    <td>{attr.retentionPolicy || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {relatedActions.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Used in Actions</h3>
            <div className="detail-list">
              {relatedActions.map(action => (
                <div key={action.id} className="list-item">
                  {action.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedApps.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Related Applications</h3>
            <div className="detail-list">
              {relatedApps.map(app => (
                <div key={app.id} className="list-item">
                  {app.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedItem.type) {
      case 'action':
        return renderActionDetail();
      case 'application':
        return renderApplicationDetail();
      case 'domain':
        return renderDomainDetail();
      case 'integration':
        return renderIntegrationDetail();
      case 'entity':
        return renderEntityDetail();
      default:
        return null;
    }
  };

  return (
    <>
      <div className="detail-overlay" onClick={onClose} />
      <div className="detail-panel">
        <button
          className="detail-close"
          onClick={onClose}
          aria-label="Close detail panel"
        >
          ×
        </button>
        {renderContent()}
      </div>
    </>
  );
}
