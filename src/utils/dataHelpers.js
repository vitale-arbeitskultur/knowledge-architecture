/**
 * Data Helper Utilities
 *
 * Lookup, filter, and resolution functions for the architecture data model.
 */

/**
 * Generic lookup by ID
 */
export function getById(collection, id) {
  return collection.find(item => item.id === id) || null;
}

/**
 * Build a Map from id → item for fast lookups
 */
export function buildIndex(collection) {
  const map = {};
  for (const item of collection) {
    map[item.id] = item;
  }
  return map;
}

/**
 * Build role index from both teams (embedded roles) and governance roles
 */
export function buildRoleIndex(teams, governanceRoles) {
  const map = {};

  // Embedded functional roles from teams
  for (const team of teams) {
    for (const role of (team.roles || [])) {
      map[role.id] = { ...role, teamId: team.id, teamName: team.name, type: 'functional' };
    }
  }

  // Governance roles
  for (const role of governanceRoles) {
    map[role.id] = role;
  }

  return map;
}

/**
 * Resolve a RACI reference { type, id } to a display name
 */
export function resolveRaciRef(ref, roleIndex, teamIndex) {
  if (!ref) return '—';

  if (ref.type === 'team') {
    const team = teamIndex[ref.id];
    return team ? team.name : ref.id;
  }

  if (ref.type === 'role') {
    const role = roleIndex[ref.id];
    return role ? role.name : ref.id;
  }

  return ref.id;
}

/**
 * Resolve full RACI structure to display names
 */
export function resolveRaci(raci, roleIndex, teamIndex) {
  if (!raci) return { responsible: '—', accountable: '—', consulted: [], informed: [] };

  return {
    responsible: resolveRaciRef(raci.responsible, roleIndex, teamIndex),
    accountable: resolveRaciRef(raci.accountable, roleIndex, teamIndex),
    consulted: (raci.consulted || []).map(ref => resolveRaciRef(ref, roleIndex, teamIndex)),
    informed: (raci.informed || []).map(ref => resolveRaciRef(ref, roleIndex, teamIndex))
  };
}

/**
 * Get all actions for a specific value chain stage
 */
export function getActionsByStage(actions, stageId) {
  return actions.filter(a => a.valueChainStageId === stageId);
}

/**
 * Get actions for a specific stage and lane
 */
export function getActionsByStageAndLane(actions, stageId, lane) {
  return actions.filter(a => a.valueChainStageId === stageId && a.lane === lane);
}

/**
 * Get all applications connected to a knowledge domain
 */
export function getAppsByDomain(applications, domainId) {
  return applications.filter(app =>
    (app.knowledgeDomainIds || []).includes(domainId)
  );
}

/**
 * Get all business entities in a knowledge domain
 */
export function getEntitiesByDomain(entities, domainId) {
  return entities.filter(e => e.knowledgeDomainId === domainId);
}

/**
 * Build a map: domainId → entities[]
 */
export function buildEntitiesByDomainMap(domains, entities) {
  const map = {};
  for (const domain of domains) {
    map[domain.id] = entities.filter(e => e.knowledgeDomainId === domain.id);
  }
  return map;
}

/**
 * Build a map: domainId → applications[]
 */
export function buildAppsByDomainMap(domains, applications) {
  const map = {};
  for (const domain of domains) {
    map[domain.id] = applications.filter(app =>
      (app.knowledgeDomainIds || []).includes(domain.id)
    );
  }
  return map;
}

/**
 * Get all integrations for an application (source or target)
 */
export function getIntegrationsByApp(integrations, appId) {
  return integrations.filter(int =>
    int.sourceApplicationId === appId || int.targetApplicationId === appId
  );
}

/**
 * Get TIMEK badge info
 */
export function getTimekInfo(classification) {
  const info = {
    invest: { label: 'Invest', color: '#16a34a', bg: '#f0fdf4' },
    keep: { label: 'Keep', color: '#2563eb', bg: '#eff6ff' },
    tolerate: { label: 'Tolerate', color: '#ca8a04', bg: '#fefce8' },
    migrate: { label: 'Migrate', color: '#ea580c', bg: '#fff7ed' },
    eliminate: { label: 'Eliminate', color: '#dc2626', bg: '#fef2f2' }
  };
  return info[classification] || { label: classification, color: '#6b7280', bg: '#f9fafb' };
}

/**
 * Get lane display info
 */
export function getLaneInfo(lane) {
  const info = {
    customer: { label: 'Customer', color: 'var(--lane-customer-border)', bg: 'var(--lane-customer)' },
    frontstage: { label: 'Frontstage', color: 'var(--lane-frontstage-border)', bg: 'var(--lane-frontstage)' },
    backstage: { label: 'Backstage', color: 'var(--lane-backstage-border)', bg: 'var(--lane-backstage)' },
    support: { label: 'Support', color: 'var(--lane-support-border)', bg: 'var(--lane-support)' }
  };
  return info[lane] || { label: lane, color: '#94a3b8', bg: '#f1f5f9' };
}

/**
 * Get maturity display info
 */
export function getMaturityInfo(maturity) {
  const info = {
    'automated': { label: 'Automated', color: '#16a34a' },
    'semi-automated': { label: 'Semi-automated', color: '#ca8a04' },
    'manual-with-template': { label: 'Manual (template)', color: '#ea580c' },
    'manual-adhoc': { label: 'Manual (ad-hoc)', color: '#dc2626' }
  };
  return info[maturity] || { label: maturity, color: '#6b7280' };
}

/**
 * Get frequency display label
 */
export function getFrequencyLabel(frequency) {
  const labels = {
    'real-time': 'Real-time',
    'event-triggered': 'Event-triggered',
    'daily': 'Daily',
    'weekly': 'Weekly',
    'monthly': 'Monthly',
    'on-demand': 'On-demand'
  };
  return labels[frequency] || frequency;
}

/**
 * Get category display info for applications
 */
export function getCategoryInfo(category) {
  const info = {
    'CRM': { color: 'var(--cat-crm)', bg: '#fdf2f8' },
    'Communication': { color: 'var(--cat-communication)', bg: '#f5f3ff' },
    'Documentation': { color: 'var(--cat-documentation)', bg: '#ecfeff' },
    'Marketing': { color: 'var(--cat-marketing)', bg: '#fff7ed' },
    'Finance': { color: 'var(--cat-finance)', bg: '#f0fdf4' },
    'Operations': { color: '#0891b2', bg: '#ecfeff' },
    'Analytics': { color: '#7c3aed', bg: '#f5f3ff' },
    'HR': { color: '#be185d', bg: '#fdf2f8' }
  };
  return info[category] || { color: '#6b7280', bg: '#f9fafb' };
}

/**
 * Get operation verb for entity interactions
 */
export function getOperationLabel(operation) {
  const labels = {
    create: 'Creates',
    read: 'Reads',
    update: 'Updates',
    archive: 'Archives'
  };
  return labels[operation] || operation;
}
