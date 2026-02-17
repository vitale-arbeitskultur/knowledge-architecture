/**
 * Risk Calculation Engine
 *
 * Calculates risk levels based on integration quality dimensions
 * and propagates risk through the architecture layers:
 * Integration → Application → Action → Value Chain Stage
 */

// Risk levels ordered by severity
export const RISK_LEVELS = ['none', 'low', 'medium', 'high', 'critical'];

// Maturity × Reliability → Risk Level matrix
const RISK_MATRIX = {
  'automated': { high: 'none', medium: 'low', low: 'medium' },
  'semi-automated': { high: 'low', medium: 'medium', low: 'high' },
  'manual-with-template': { high: 'medium', medium: 'high', low: 'high' },
  'manual-adhoc': { high: 'high', medium: 'critical', low: 'critical' }
};

/**
 * Calculate risk level for a single integration
 */
export function calculateIntegrationRisk(integration) {
  const { maturity, reliability } = integration;
  if (!maturity || !reliability) return 'none';
  const maturityRow = RISK_MATRIX[maturity];
  if (!maturityRow) return 'none';
  return maturityRow[reliability] || 'none';
}

/**
 * Compare two risk levels, return the higher one
 */
export function higherRisk(a, b) {
  const idxA = RISK_LEVELS.indexOf(a || 'none');
  const idxB = RISK_LEVELS.indexOf(b || 'none');
  return RISK_LEVELS[Math.max(idxA, idxB)];
}

/**
 * Calculate risk for an application based on its integrations
 * App risk = highest risk among all connected integrations (source or target)
 */
export function calculateApplicationRisk(appId, integrations) {
  let worst = 'none';
  for (const int of integrations) {
    if (int.sourceApplicationId === appId || int.targetApplicationId === appId) {
      const intRisk = calculateIntegrationRisk(int);
      worst = higherRisk(worst, intRisk);
    }
  }
  return worst;
}

/**
 * Calculate risk for an action based on its applications
 * Action risk = highest risk among all referenced applications
 */
export function calculateActionRisk(action, appRisks) {
  let worst = 'none';
  for (const appId of (action.applicationIds || [])) {
    const appRisk = appRisks[appId] || 'none';
    worst = higherRisk(worst, appRisk);
  }
  return worst;
}

/**
 * Calculate risk for a value chain stage based on its actions
 * Stage risk = highest risk among all actions in the stage
 */
export function calculateStageRisk(stageId, actions, actionRisks) {
  let worst = 'none';
  for (const action of actions) {
    if (action.valueChainStageId === stageId) {
      const actRisk = actionRisks[action.id] || 'none';
      worst = higherRisk(worst, actRisk);
    }
  }
  return worst;
}

/**
 * Pre-calculate all risks across the architecture
 * Returns: { integrationRisks, appRisks, actionRisks, stageRisks }
 */
export function calculateAllRisks(integrations, applications, actions, stages) {
  // Step 1: Integration risks
  const integrationRisks = {};
  for (const int of integrations) {
    integrationRisks[int.id] = calculateIntegrationRisk(int);
  }

  // Step 2: Application risks (propagated from integrations)
  const appRisks = {};
  for (const app of applications) {
    appRisks[app.id] = calculateApplicationRisk(app.id, integrations);
  }

  // Step 3: Action risks (propagated from applications)
  const actionRisks = {};
  for (const action of actions) {
    actionRisks[action.id] = calculateActionRisk(action, appRisks);
  }

  // Step 4: Stage risks (propagated from actions)
  const stageRisks = {};
  for (const stage of stages) {
    stageRisks[stage.id] = calculateStageRisk(stage.id, actions, actionRisks);
  }

  return { integrationRisks, appRisks, actionRisks, stageRisks };
}

/**
 * Get CSS class for a risk level
 */
export function getRiskClass(level) {
  const classes = {
    none: '',
    low: 'risk-low',
    medium: 'risk-medium',
    high: 'risk-high',
    critical: 'risk-critical'
  };
  return classes[level] || '';
}

/**
 * Get display color for a risk level
 */
export function getRiskColor(level) {
  const colors = {
    none: 'transparent',
    low: '#eab308',
    medium: '#f97316',
    high: '#ef4444',
    critical: '#991b1b'
  };
  return colors[level] || 'transparent';
}

/**
 * Get display label for a risk level
 */
export function getRiskLabel(level) {
  const labels = {
    none: '—',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  };
  return labels[level] || '—';
}
