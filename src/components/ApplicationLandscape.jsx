import { useState } from 'react';
import { getTimekInfo, getCategoryInfo } from '../utils/dataHelpers';
import { getRiskColor, getRiskLabel } from '../utils/riskCalculation';

export default function ApplicationLandscape({
  applications,
  domains,
  roleIndex,
  risks,
  onSelect
}) {
  const [groupBy, setGroupBy] = useState('category');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter applications by search term
  const filteredApps = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get connected domains for an app via app.knowledgeDomainIds
  const getDomainNames = (app) => {
    return (app.knowledgeDomainIds || [])
      .map(did => domains.find(d => d.id === did))
      .filter(Boolean);
  };

  // Group applications
  const groupedApps = groupBy === 'category'
    ? groupApplicationsByCategory(filteredApps)
    : groupApplicationsByTimek(filteredApps);

  const sectionOrder = groupBy === 'category'
    ? ['CRM', 'Operations', 'Communication', 'Documentation', 'Finance', 'Analytics', 'Marketing', 'HR']
    : ['invest', 'keep', 'tolerate', 'migrate', 'eliminate'];

  const sortedSections = Object.entries(groupedApps)
    .filter(([, apps]) => apps.length > 0)
    .sort(
      ([keyA], [keyB]) => sectionOrder.indexOf(keyA) - sectionOrder.indexOf(keyB)
    );

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Application Landscape</h1>
        <p className="page-subtitle">Enterprise applications with strategic TIMEK classification and risk indicators</p>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="toggle-group">
          <button
            className={`toggle-btn ${groupBy === 'category' ? 'active' : ''}`}
            onClick={() => setGroupBy('category')}
          >
            By Category
          </button>
          <button
            className={`toggle-btn ${groupBy === 'timek' ? 'active' : ''}`}
            onClick={() => setGroupBy('timek')}
          >
            By TIMEK
          </button>
        </div>
      </div>

      <div className="app-sections">
        {sortedSections.map(([sectionName, apps]) => {
          const sectionLabel = groupBy === 'timek'
            ? getTimekInfo(sectionName).label
            : sectionName;

          return (
            <div key={sectionName} className="app-section">
              <h3 className="section-header">{sectionLabel}</h3>
              <div className="app-grid">
                {apps.map(app => {
                  const category = getCategoryInfo(app.category);
                  const timek = getTimekInfo(app.strategicClassification);
                  const connectedDomains = getDomainNames(app);
                  const riskLevel = risks.appRisks?.[app.id] || 'none';
                  const owner = roleIndex[app.applicationOwnerRoleId];

                  return (
                    <div
                      key={app.id}
                      className="app-card"
                      onClick={() => onSelect({ type: 'application', id: app.id })}
                    >
                      <div className="app-card-header">
                        <h4 className="app-name">{app.name}</h4>
                        {riskLevel !== 'none' && (
                          <div
                            className="risk-dot"
                            style={{ backgroundColor: getRiskColor(riskLevel) }}
                            title={`Risk: ${getRiskLabel(riskLevel)}`}
                          />
                        )}
                      </div>

                      <div className="app-card-badges">
                        <span className="category-badge" style={{
                          backgroundColor: category.color,
                          color: '#fff'
                        }}>
                          {app.category}
                        </span>
                        <span className="timek-badge" style={{
                          backgroundColor: timek.color,
                          color: '#fff'
                        }}>
                          {timek.label}
                        </span>
                      </div>

                      <div className="app-owner">
                        {owner ? `Owner: ${owner.name}` : 'No owner assigned'}
                      </div>

                      {connectedDomains.length > 0 && (
                        <div className="connected-domains">
                          {connectedDomains.slice(0, 3).map(domain => (
                            <span key={domain.id} className="domain-tag">
                              {domain.name}
                            </span>
                          ))}
                          {connectedDomains.length > 3 && (
                            <span className="domain-tag">
                              +{connectedDomains.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function groupApplicationsByCategory(apps) {
  const grouped = {};
  apps.forEach(app => {
    const cat = app.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(app);
  });
  return grouped;
}

function groupApplicationsByTimek(apps) {
  const grouped = {
    'invest': [],
    'keep': [],
    'tolerate': [],
    'migrate': [],
    'eliminate': []
  };
  apps.forEach(app => {
    const cls = app.strategicClassification || 'keep';
    if (grouped[cls]) {
      grouped[cls].push(app);
    }
  });
  return grouped;
}
