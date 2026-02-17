import { useState } from 'react';
import { buildEntitiesByDomainMap, buildAppsByDomainMap } from '../utils/dataHelpers';

export default function KnowledgeDomainView({
  domains,
  entities,
  applications,
  roleIndex,
  onSelect
}) {
  const [expandedLevels, setExpandedLevels] = useState({});

  // Toggle expansion level: 0 -> 1 -> 2 -> 3 -> 0
  const toggleExpand = (domainId) => {
    setExpandedLevels(prev => {
      const current = prev[domainId] || 0;
      const next = current === 3 ? 0 : current + 1;
      return { ...prev, [domainId]: next };
    });
  };

  const expandAll = () => {
    const newLevels = {};
    domains.forEach(domain => {
      newLevels[domain.id] = 3;
    });
    setExpandedLevels(newLevels);
  };

  const collapseAll = () => {
    setExpandedLevels({});
  };

  const domainEntities = buildEntitiesByDomainMap(domains, entities);
  const domainApps = buildAppsByDomainMap(domains, applications);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Knowledge Domains</h1>
        <p className="page-subtitle">Domain structure with entities, attributes, and governance policies (click to expand)</p>
      </div>

      <div className="controls-bar">
        <div className="level-legend">
          <span className="level-label">L0: Overview</span>
          <span className="level-label">L1: Entities</span>
          <span className="level-label">L2: Attributes</span>
          <span className="level-label">L3: Policies</span>
        </div>
        <div className="toggle-group">
          <button className="toggle-btn" onClick={expandAll}>
            Expand All
          </button>
          <button className="toggle-btn" onClick={collapseAll}>
            Collapse All
          </button>
        </div>
      </div>

      <div className="domain-list">
        {domains.map(domain => {
          const level = expandedLevels[domain.id] || 0;
          const owner = roleIndex[domain.knowledgeOwnerRoleId];
          const domainEnts = domainEntities[domain.id] || [];
          const domainApplications = domainApps[domain.id] || [];

          return (
            <div key={domain.id} className={`domain-card ${level > 0 ? 'expanded' : ''}`}>
              <div
                className="domain-header"
                onClick={() => toggleExpand(domain.id)}
              >
                <span className="expand-icon">
                  {level > 0 ? '▼' : '▶'}
                </span>
                <h3 className="domain-name">{domain.name}</h3>
                <span className="domain-level-badge">L{level}</span>
              </div>

              <div className="domain-meta">
                <span className="meta-item">
                  {domainEnts.length} entit{domainEnts.length !== 1 ? 'ies' : 'y'}
                </span>
                <span className="meta-item">
                  {domainApplications.length} app{domainApplications.length !== 1 ? 's' : ''}
                </span>
                {owner && (
                  <span className="meta-item">
                    Owner: {owner.name}
                  </span>
                )}
              </div>

              {/* L1: Entity names and descriptions */}
              {level >= 1 && (
                <div className="domain-section">
                  <h4 className="section-title">Entities</h4>
                  {domainEnts.length > 0 ? (
                    <div className="entity-list">
                      {domainEnts.map(entity => (
                        <div
                          key={entity.id}
                          className="entity-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect({ type: 'entity', id: entity.id });
                          }}
                        >
                          <span className="entity-name">{entity.name}</span>
                          {entity.description && (
                            <p className="entity-description">
                              {entity.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-items">No entities defined</p>
                  )}

                  {domainApplications.length > 0 && (
                    <>
                      <h4 className="section-title" style={{ marginTop: 12 }}>Connected Applications</h4>
                      <div className="entity-list">
                        {domainApplications.map(app => (
                          <div
                            key={app.id}
                            className="entity-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelect({ type: 'application', id: app.id });
                            }}
                          >
                            <span className="entity-name">{app.name}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* L2: Attributes with types and validation */}
              {level >= 2 && (
                <div className="domain-section">
                  <h4 className="section-title">Attributes</h4>
                  {domainEnts.length > 0 ? (
                    <div className="attributes-section">
                      {domainEnts.map(entity => (
                        <div key={entity.id} className="entity-attributes">
                          <h5>{entity.name}</h5>
                          {entity.attributes && entity.attributes.length > 0 ? (
                            <table className="attribute-table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Type</th>
                                  <th>Validation</th>
                                  {level >= 3 && (
                                    <>
                                      <th>Retention</th>
                                      <th>Archiving</th>
                                    </>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {entity.attributes.map((attr, idx) => (
                                  <tr key={idx}>
                                    <td>{attr.name}</td>
                                    <td>{attr.type}</td>
                                    <td>{attr.validationRules || '—'}</td>
                                    {level >= 3 && (
                                      <>
                                        <td>{attr.retentionPolicy || '—'}</td>
                                        <td>{attr.archivingRules || '—'}</td>
                                      </>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="no-attributes">No attributes defined</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-items">No entities with attributes</p>
                  )}
                </div>
              )}

              {/* L3: Governance summary */}
              {level >= 3 && (
                <div className="domain-section">
                  <h4 className="section-title">Governance Summary</h4>
                  <div className="policies-section">
                    <div className="detail-row">
                      <span className="detail-label">Knowledge Owner:</span>
                      <span className="detail-value">{owner?.name || 'Not assigned'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Total Entities:</span>
                      <span className="detail-value">{domainEnts.length}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Total Attributes:</span>
                      <span className="detail-value">
                        {domainEnts.reduce((sum, e) => sum + (e.attributes?.length || 0), 0)}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Connected Applications:</span>
                      <span className="detail-value">{domainApplications.length}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
