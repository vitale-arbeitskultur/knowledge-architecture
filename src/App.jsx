import React, { useState, useEffect, useMemo } from 'react'
import Navigation from './components/Navigation'
import ServiceBlueprint from './components/ServiceBlueprint'
import ApplicationLandscape from './components/ApplicationLandscape'
import KnowledgeDomainView from './components/KnowledgeDomainView'
import IntegrationMap from './components/IntegrationMap'
import HelpGuide from './components/HelpGuide'
import DetailPanel from './components/DetailPanel'
import { calculateAllRisks } from './utils/riskCalculation'
import { buildIndex, buildRoleIndex } from './utils/dataHelpers'

import stages from './data/valueChainStages.json'
import actions from './data/actions.json'
import teams from './data/teams.json'
import roles from './data/roles.json'
import persons from './data/persons.json'
import applications from './data/applications.json'
import domains from './data/knowledgeDomains.json'
import entities from './data/businessEntities.json'
import integrations from './data/integrations.json'

export default function App() {
  const [currentView, setCurrentView] = useState('blueprint')
  const [selectedItem, setSelectedItem] = useState(null)

  // Calculate risks and build indexes on mount
  const risks = useMemo(() => {
    return calculateAllRisks(integrations, applications, actions, stages)
  }, [])

  const roleIndex = useMemo(() => {
    return buildRoleIndex(teams, roles)
  }, [])

  const teamIndex = useMemo(() => buildIndex(teams), [])
  const appIndex = useMemo(() => buildIndex(applications), [])
  const entityIndex = useMemo(() => buildIndex(entities), [])
  const domainIndex = useMemo(() => buildIndex(domains), [])
  const personIndex = useMemo(() => buildIndex(persons), [])

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'blueprint'
      const viewMap = {
        blueprint: 'blueprint',
        applications: 'applications',
        domains: 'domains',
        integrations: 'integrations',
        guide: 'guide'
      }
      setCurrentView(viewMap[hash] || 'blueprint')
      setSelectedItem(null) // Clear detail panel on navigation
    }

    handleHashChange() // Set initial view
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Render current view based on currentView state
  const renderView = () => {
    const commonProps = {
      risks,
      roleIndex,
      teamIndex,
      onSelect: (item) => setSelectedItem(item)
    }

    switch (currentView) {
      case 'applications':
        return (
          <ApplicationLandscape
            {...commonProps}
            applications={applications}
            actions={actions}
            domains={domains}
          />
        )
      case 'domains':
        return (
          <KnowledgeDomainView
            {...commonProps}
            domains={domains}
            entities={entities}
            actions={actions}
            applications={applications}
          />
        )
      case 'integrations':
        return (
          <IntegrationMap
            {...commonProps}
            integrations={integrations}
            applications={applications}
            entities={entities}
          />
        )
      case 'guide':
        return <HelpGuide />
      case 'blueprint':
      default:
        return (
          <ServiceBlueprint
            {...commonProps}
            stages={stages}
            actions={actions}
            applications={applications}
          />
        )
    }
  }

  return (
    <div className="app">
      <Navigation currentView={currentView} />
      <main className="app-main">
        {renderView()}
        {selectedItem && (
          <DetailPanel
            selectedItem={selectedItem}
            onClose={() => setSelectedItem(null)}
            data={{
              stages, actions, teams, roles, persons,
              applications, domains, entities, integrations,
              roleIndex, teamIndex, appIndex, entityIndex,
              domainIndex, personIndex, risks
            }}
          />
        )}
      </main>
    </div>
  )
}
