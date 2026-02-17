import React from 'react'

export default function HelpGuide() {
  return (
    <div className="page">
      <div className="help-guide">
        <div className="page-header">
          <h1 className="page-title">Guide</h1>
          <p className="page-subtitle">
            How this tool maps enterprise architecture across four interconnected views
          </p>
        </div>

        <section className="help-section">
          <h2>Overview</h2>
          <p>
            This tool models the enterprise architecture of a B2B equipment rental business
            across four views: a service blueprint, an application landscape, knowledge domains
            with business entities, and an integration map with risk assessment.
          </p>
          <p>
            Each view captures a different dimension of the same system. Actions in the
            blueprint reference applications and entities. Domains own entities that flow
            through integrations. Applications serve domains and appear in actions. Risk
            propagates from integrations up through applications to value chain stages.
          </p>
        </section>

        <section className="help-section">
          <h2>Service Blueprint</h2>
          <p>
            The Blueprint tab implements a{' '}
            <a
              href="https://en.wikipedia.org/wiki/Service_blueprint"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              service design blueprint
            </a>
            , a method introduced by G. Lynn Shostack in 1984 for mapping customer-facing and
            internal processes across swimlanes.
          </p>

          <div className="concept-card">
            <h3>The Four Lanes</h3>
            <dl className="concept-list">
              <div className="concept-item">
                <dt>Customer Actions</dt>
                <dd>What the customer does at each stage of the journey</dd>
              </div>
              <div className="concept-item">
                <dt>Frontstage</dt>
                <dd>Employee actions visible to the customer</dd>
              </div>
              <div className="concept-item">
                <dt>Backstage</dt>
                <dd>Employee actions hidden from the customer</dd>
              </div>
              <div className="concept-item">
                <dt>Support</dt>
                <dd>Systems, policies, and infrastructure that enable the service</dd>
              </div>
            </dl>
          </div>

          <p>
            Between the lanes, the <strong>line of interaction</strong> separates customer
            actions from frontstage, and the <strong>line of visibility</strong> separates
            what the customer can see from backstage operations.
          </p>

          <p>
            Columns represent value chain stages from <em>Attract</em> through{' '}
            <em>Engage &amp; Renew</em>, mapping the full customer lifecycle.
          </p>

          <div className="concept-card">
            <h3>RACI Assignments</h3>
            <p>
              Each action carries a{' '}
              <a
                href="https://en.wikipedia.org/wiki/Responsibility_assignment_matrix"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                RACI matrix
              </a>{' '}
              assignment linking roles to responsibilities:
            </p>
            <dl className="concept-list">
              <div className="concept-item">
                <dt>R — Responsible</dt>
                <dd>Does the work</dd>
              </div>
              <div className="concept-item">
                <dt>A — Accountable</dt>
                <dd>Owns the outcome, has final authority</dd>
              </div>
              <div className="concept-item">
                <dt>C — Consulted</dt>
                <dd>Provides input before the work is done</dd>
              </div>
              <div className="concept-item">
                <dt>I — Informed</dt>
                <dd>Notified after the work is done</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="help-section">
          <h2>Application Landscape</h2>
          <p>
            The Applications tab shows the portfolio of systems that support the business,
            grouped by functional category (CRM, Communication, Documentation, etc.) and
            classified using the TIMEK model for strategic portfolio management.
          </p>

          <div className="concept-card">
            <h3>TIMEK Classification</h3>
            <p>
              Each application is assigned a strategic disposition that drives investment
              and migration decisions:
            </p>
            <dl className="concept-list">
              <div className="concept-item">
                <dt>Tolerate</dt>
                <dd>Accepted as-is, no active investment planned</dd>
              </div>
              <div className="concept-item">
                <dt>Invest</dt>
                <dd>Strategically important, actively funded for growth</dd>
              </div>
              <div className="concept-item">
                <dt>Migrate</dt>
                <dd>Being replaced, transition to a new system underway</dd>
              </div>
              <div className="concept-item">
                <dt>Eliminate</dt>
                <dd>Scheduled for decommission and removal</dd>
              </div>
              <div className="concept-item">
                <dt>Keep</dt>
                <dd>Stable and adequate, maintained but not expanded</dd>
              </div>
            </dl>
          </div>

          <p>
            Applications connect to knowledge domains they serve and to actions in the
            blueprint where they are used. This makes it possible to trace the impact of
            retiring or replacing a system across the value chain.
          </p>
        </section>

        <section className="help-section">
          <h2>Knowledge Domains</h2>
          <p>
            The Domains tab organizes business knowledge into bounded contexts, following{' '}
            <a
              href="https://en.wikipedia.org/wiki/Domain-driven_design"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              domain-driven design
            </a>{' '}
            principles. Each domain groups related business entities under a knowledge owner
            responsible for governance.
          </p>

          <div className="concept-card">
            <h3>Business Entities</h3>
            <p>
              Each entity defines the data objects within a domain — their attributes,
              validation rules, and retention policies. Entities are linked to actions
              through CRUD operations (Create, Read, Update, Archive), making it clear
              which processes interact with which data.
            </p>
          </div>

          <p>
            Knowledge owners are accountable for data quality, access policies, and lifecycle
            governance within their domain. The domain structure also drives how integrations
            are assessed — entities that cross domain boundaries via integrations carry
            inherent risk.
          </p>
        </section>

        <section className="help-section">
          <h2>Integration Map</h2>
          <p>
            The Integrations tab maps system-to-system data flows, showing which applications
            exchange data, what entities are transferred, and how the integration is
            implemented (API, sync, file transfer, etc.).
          </p>

          <div className="concept-card">
            <h3>Risk Scoring Model</h3>
            <p>
              Each integration is scored across multiple dimensions to produce a composite
              risk level:
            </p>
            <dl className="concept-list">
              <div className="concept-item">
                <dt>Maturity</dt>
                <dd>How established and proven the integration is</dd>
              </div>
              <div className="concept-item">
                <dt>Reliability</dt>
                <dd>How consistently it operates without failure</dd>
              </div>
              <div className="concept-item">
                <dt>Frequency</dt>
                <dd>How often data flows — real-time carries different risk than batch</dd>
              </div>
              <div className="concept-item">
                <dt>Data Entities</dt>
                <dd>Which business entities cross system boundaries</dd>
              </div>
            </dl>
          </div>

          <p>
            Integration risk propagates upward: risky integrations increase the risk profile
            of the connected applications, which in turn affect the value chain stages those
            applications support.
          </p>
        </section>

        <section className="help-section">
          <h2>How It All Connects</h2>
          <p>
            The four views are not isolated — they form an interconnected model of the
            enterprise:
          </p>
          <div className="connections-grid">
            <div className="connection-item">
              <strong>Actions → Apps &amp; Entities</strong>
              <span>
                Blueprint actions reference the applications used and the entities operated on,
                making dependencies visible at the process level.
              </span>
            </div>
            <div className="connection-item">
              <strong>Domains → Entities</strong>
              <span>
                Domains own business entities. When an entity appears in an integration,
                you can trace it back to its governing domain and knowledge owner.
              </span>
            </div>
            <div className="connection-item">
              <strong>Apps → Domains</strong>
              <span>
                Applications serve one or more knowledge domains. This links the technical
                portfolio to the business capability it supports.
              </span>
            </div>
            <div className="connection-item">
              <strong>Risk flows upward</strong>
              <span>
                Integration risk → application risk → stage risk. A fragile integration
                between two systems can elevate the risk of an entire value chain stage.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
