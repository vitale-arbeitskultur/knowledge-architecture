# Knowledge Management Architecture — Technical Specification

**Version:** 0.1 (Draft)
**Status:** In Discussion
**Last Updated:** 2026-02-13

---

## 1. Project Overview

### 1.1 Purpose

This project creates a browser-based visualization tool for the enterprise architecture of a medium-sized IT equipment rental company (~70 employees). The tool serves as the central reference for how knowledge flows through the organization — which teams perform which actions, which applications support them, which business entities are created or consumed, and where quality risks exist.

The project is framed as a **Knowledge Management Architecture**, not a traditional IT architecture. The primary lens is the customer value chain, visualized as a Service Design Blueprint. All other views (applications, integrations, knowledge domains) are accessible from this central perspective.

### 1.2 Guiding Principles

- **Customer-centric perspective**: The Service Design Blueprint is the primary view. Everything starts from the customer lifecycle.
- **Knowledge over information**: The architecture maps knowledge domains, not just data. It captures governance, quality, and organizational responsibility.
- **Risk visibility**: The tool must surface risks proactively. Unreliable integrations, immature manual processes, and strategic misalignment must be visually obvious.
- **Workshop-ready**: The data model will be populated through a series of workshops. The tool must be easy to update by editing JSON files.
- **Lightweight and self-contained**: No server, no database. A static web application served from a single repository.

### 1.3 Target Audience

| Audience | Primary Interest |
|---|---|
| Top Management | Value chain overview, strategic application classification, high-level risk landscape |
| IT | Application landscape, integration quality, technical risk, strategic roadmap |
| Knowledge Management Team | Domain governance, entity definitions, data quality rules, RACI responsibilities |
| Knowledge Owners | Their domain's entities, attributes, quality criteria, connected applications |
| Application Owners | Their application's integrations, dependent actions, strategic classification |

---

## 2. Data Model

### 2.1 Entity Overview

The data model consists of **ten entity types** organized in three layers:

**Value Chain Layer** (what the company does for the customer):
- Value Chain Stage
- Action

**Organizational Layer** (who does it):
- Team
- Role
- Person

**Knowledge & Technology Layer** (with what knowledge and tools):
- Knowledge Domain
- Business Entity
- Application
- Integration

Each entity type is stored as a separate JSON file in the `/src/data/` directory.

### 2.2 Entity Definitions

#### Value Chain Stage

Represents a major phase in the customer lifecycle. Stages are ordered sequentially and form the horizontal axis of the Service Blueprint.

```
{
  "id": "vcs-01",             // Unique identifier
  "name": "Attract",          // Display name
  "description": "...",       // What happens in this stage
  "order": 1                  // Position in the value chain (left to right)
}
```

**Demo stages for IT equipment rental:**
Attract → Qualify → Order → Contract → Fulfill → Bill → Support → Engage & Renew

#### Action

An action is a specific activity within the Service Blueprint. Each action sits in one of four swim lanes and belongs to a value chain stage. Actions carry RACI assignments (referencing teams and roles only), link to applications, and reference the business entities they interact with.

```
{
  "id": "act-301",
  "name": "Create rental order",
  "description": "Configure devices, quantities, and rental terms into a formal order",
  "lane": "frontstage",                      // customer | frontstage | backstage | support
  "valueChainStageId": "vcs-03",
  "raci": {
    "responsible": { "type": "role", "id": "role-account-executive" },
    "accountable": { "type": "role", "id": "role-sales-manager" },
    "consulted": [{ "type": "team", "id": "team-consulting" }],
    "informed": [{ "type": "team", "id": "team-management" }]
  },
  "applicationIds": ["app-hubspot", "app-erp"],
  "entityInteractions": [
    { "entityId": "be-order", "operation": "create" },
    { "entityId": "be-order-line", "operation": "create" },
    { "entityId": "be-customer", "operation": "read" },
    { "entityId": "be-product", "operation": "read" }
  ]
}
```

**Swim lanes** follow the Service Design Blueprint pattern:

| Lane | Description |
|---|---|
| **Customer** | Actions visible to and performed by the customer |
| **Frontstage** | Company actions directly visible to the customer |
| **Backstage** | Internal actions not visible to the customer |
| **Support** | Infrastructure, systems, and support processes |

**RACI rules:**
- **Responsible (R):** The team or role that performs the work. Can be one or more.
- **Accountable (A):** The single role or team with ultimate ownership. Always exactly one. Always visible on the blueprint card.
- **Consulted (C):** Teams or roles whose input is sought. Zero or more.
- **Informed (I):** Teams or roles who are kept updated. Zero or more.
- RACI entries reference teams or roles, never persons.
- Persons are maintained in the model for team composition but do not appear in the Service Blueprint.

**Entity interactions** on actions use CRUD-like operations:
- `create` — the action produces a new instance of this entity
- `read` — the action consumes/references this entity
- `update` — the action modifies an existing instance
- `archive` — the action moves this entity to archived state

#### Team

An organizational unit with members and defined roles.

```
{
  "id": "team-sales",
  "name": "Sales",
  "description": "Client acquisition, relationship management, and revenue generation",
  "roleIds": ["role-sales-manager", "role-account-executive"]
}
```

#### Role

A defined responsibility within a team. Roles can also carry governance responsibilities (Knowledge Owner, Application Owner). Roles are first-class entities, referenced by teams and RACI assignments.

```
{
  "id": "role-sales-manager",
  "name": "Sales Manager",
  "type": "functional",                    // functional | governance
  "teamId": "team-sales",
  "personIds": ["person-mueller"],
  "governanceScope": null                  // null for functional roles
}
```

Governance roles carry a scope:

```
{
  "id": "role-ko-client-management",
  "name": "Knowledge Owner – Client Management",
  "type": "governance",
  "teamId": "team-sales",
  "personIds": ["person-mueller"],
  "governanceScope": {
    "type": "knowledgeDomain",
    "id": "kd-client-management"
  }
}
```

```
{
  "id": "role-ao-hubspot",
  "name": "Application Owner – HubSpot",
  "type": "governance",
  "teamId": "team-sales",
  "personIds": ["person-mueller"],
  "governanceScope": {
    "type": "application",
    "id": "app-hubspot"
  }
}
```

This separates functional roles (what you do in your team) from governance roles (what architectural entity you're accountable for).

#### Person

An individual employee. Persons belong to a team and are assigned to roles. Persons do NOT appear in the Service Blueprint or in RACI assignments — they exist for reference and team composition only.

```
{
  "id": "person-mueller",
  "name": "Stefan Mueller",
  "email": "s.mueller@company.de",
  "teamId": "team-sales"
}
```

#### Knowledge Domain

A grouping of related business entities under a single governance responsibility. Each domain has a Knowledge Owner (a governance role).

```
{
  "id": "kd-client-management",
  "name": "Client Management",
  "description": "All client-related knowledge including prospects, active clients, and contacts",
  "knowledgeOwnerRoleId": "role-ko-client-management"
}
```

**Draft domain cut (9 domains):**

| Domain | Core Entities | Boundary Note |
|---|---|---|
| Client Management | Lead, Customer, Contact | The "who" — all identity and relationship data |
| Sales | Opportunity, Quote | The commercial process before an order exists |
| Order Management | Order, Order Line, Delivery, Return | The transactional process of getting devices to/from customers |
| Asset Management | Product, Device, Accessory | The "what" — catalog items and individual tracked units |
| Contract Management | Rental Contract, Contract Line, Terms & Conditions | The legal and commercial frame around a rental |
| Finance & Billing | Invoice, Invoice Line, Payment, Credit Note | Everything about money |
| Support & Service | Support Ticket, Incident, Replacement Request | Post-deployment issue handling |
| Internal Knowledge | Knowledge Article, Process Template, Training Material | Organizational know-how in Confluence |
| HR | Employee, Employment Contract | Employee-related data |

#### Business Entity

A specific type of business data within a knowledge domain. Business entities carry detailed attributes with governance rules. Attributes have three toggleable detail layers: validation rules, retention policy, and archiving rules.

```
{
  "id": "be-device",
  "name": "Device",
  "description": "An individual tracked unit of IT equipment with serial number and lifecycle state",
  "knowledgeDomainId": "kd-asset-management",
  "attributes": [
    {
      "name": "Serial Number",
      "type": "string",
      "description": "Manufacturer serial number uniquely identifying this unit",
      "validationRules": "Required. Unique across all devices. Format per manufacturer spec.",
      "retentionPolicy": "Permanent while device exists in system",
      "archivingRules": "Retained in asset archive after device retirement"
    },
    {
      "name": "Lifecycle State",
      "type": "enum",
      "description": "Current state of the device",
      "validationRules": "Required. One of: in-stock, reserved, deployed, returned, refurbishment, retired. State transitions must follow defined lifecycle rules.",
      "retentionPolicy": "Current state always maintained. State history retained for 5 years.",
      "archivingRules": "Full state history archived with device record"
    }
  ]
}
```

**Detail toggle levels** for the Knowledge Domain view:
- **Level 0 (default):** Domain name, Knowledge Owner, list of entity names
- **Level 1:** Entity names with descriptions
- **Level 2:** Entity attributes with types and validation rules
- **Level 3:** Full detail including retention and archiving rules

These levels are toggled globally or per-domain in the UI.

#### Application

A software tool or system used by the company. Applications carry a strategic classification and link to the knowledge domains they serve.

```
{
  "id": "app-hubspot",
  "name": "HubSpot",
  "description": "CRM platform for managing client relationships, deals, and marketing automation",
  "category": "CRM",
  "url": "https://hubspot.com",
  "applicationOwnerRoleId": "role-ao-hubspot",
  "knowledgeDomainIds": ["kd-client-management", "kd-sales"],
  "strategicClassification": "invest"
}
```

**Strategic classification (TIMEK model):**

| Classification | Meaning | Visual Indicator |
|---|---|---|
| **Tolerate** | Legacy tool, acceptable for now, no investment | Grey |
| **Invest** | Strategic platform, actively developed and expanded | Green |
| **Migrate** | Being replaced, migration planned or underway | Orange |
| **Eliminate** | Scheduled for decommission | Red |
| **Keep** | Stable, no change needed, does its job | Blue |

#### Integration

A data connection between two applications. Integrations reference specific business entities that flow through them and carry quality indicators.

```
{
  "id": "int-03",
  "name": "HubSpot to ERP – Order Handover",
  "sourceApplicationId": "app-hubspot",
  "targetApplicationId": "app-erp",
  "type": "manual",
  "maturity": "manual-with-template",
  "reliability": "medium",
  "frequency": "on-demand",
  "entityInteractions": [
    { "entityId": "be-customer", "operation": "read" },
    { "entityId": "be-order", "operation": "create" }
  ],
  "description": "When a deal is won in HubSpot, order details are manually transferred to ERP using a standardized template"
}
```

**Integration quality dimensions:**

| Dimension | Values | Purpose |
|---|---|---|
| **Type** | api, webhook, file, manual | Technical mechanism |
| **Maturity** | automated, semi-automated, manual-with-template, manual-adhoc | Process maturity of the integration |
| **Reliability** | high, medium, low | How often does it fail or produce errors |
| **Frequency** | real-time, event-triggered, daily, weekly, on-demand | How often data moves |

---

## 3. Risk Model

### 3.1 Risk Scoring

Risk is calculated at the integration level and propagates upward through the model.

**Integration risk** is derived from the combination of maturity and reliability:

| | Reliability: High | Reliability: Medium | Reliability: Low |
|---|---|---|---|
| **Automated** | No risk | Low risk | Medium risk |
| **Semi-automated** | Low risk | Medium risk | High risk |
| **Manual with template** | Medium risk | High risk | High risk |
| **Manual ad-hoc** | High risk | Critical risk | Critical risk |

### 3.2 Risk Propagation

- **Integration → Application:** An application's risk level equals the highest risk among all integrations where it is either source or target.
- **Application → Action:** An action's risk level equals the highest risk among all applications it references.
- **Action → Value Chain Stage:** A stage's risk level equals the highest risk among all actions within it.

### 3.3 Risk Visualization

Risk levels map to visual indicators across all views:

| Risk Level | Color | Indicator |
|---|---|---|
| No risk | — | No indicator |
| Low risk | Yellow | Small dot |
| Medium risk | Orange | Border highlight + dot |
| High risk | Red | Strong border + dot + label |
| Critical risk | Dark red | Pulsing border + prominent label |

---

## 4. Architecture & Technology

### 4.1 Technical Stack

| Component | Technology | Purpose |
|---|---|---|
| Framework | React 18 | UI components and state management |
| Build Tool | Vite 5 | Development server and static build |
| Language | JavaScript (JSX) | Application logic |
| Data Storage | JSON files in `/src/data/` | All architectural entities |
| Styling | CSS (custom, no framework) | Visual design |
| Hosting | Any static file server | `npx vite preview` or any web server |

### 4.2 Repository Structure

```
knowledge-architecture/
├── index.html
├── package.json
├── vite.config.js
├── docs/
│   ├── 01-technical-specification.md
│   ├── 02-workshop-process.md
│   └── 03-async-surveys.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   ├── valueChainStages.json
│   │   ├── actions.json
│   │   ├── teams.json
│   │   ├── roles.json
│   │   ├── persons.json
│   │   ├── applications.json
│   │   ├── knowledgeDomains.json
│   │   ├── businessEntities.json
│   │   └── integrations.json
│   ├── components/
│   │   ├── ServiceBlueprint.jsx
│   │   ├── ActionCard.jsx
│   │   ├── ApplicationLandscape.jsx
│   │   ├── KnowledgeDomainView.jsx
│   │   ├── IntegrationMap.jsx
│   │   ├── DetailPanel.jsx
│   │   └── Navigation.jsx
│   └── styles/
│       └── index.css
└── dist/                  (generated by build)
```

### 4.3 Data Update Workflow

1. Edit the relevant JSON file(s) in `/src/data/`
2. Run `npm run build` to produce the static output
3. Deploy the `/dist/` folder or run `npm run preview` to serve locally

All data changes are version-controlled through the repository. No runtime data editing is planned for v1.

### 4.4 Views

**Service Blueprint** (main view): Horizontal grid with value chain stages as columns and swim lanes as rows. Action cards inside each cell. Accountable role always visible on cards. R/C/I shown on click/hover. Entity interactions shown on click. Risk indicators on cards when underlying integrations are fragile. Divider lines between lanes ("line of interaction" between customer and frontstage, "line of visibility" between frontstage and backstage).

**Application Landscape**: Card grid of all applications. Grouped or filterable by category and strategic classification. Each card shows name, category, TIMEK classification, Application Owner role, connected knowledge domains, and aggregated risk from integrations.

**Knowledge Domain View**: Expandable list of domains with nested business entities. Toggleable detail levels (0–3) for validation, retention, and archiving rules. Each domain shows its Knowledge Owner role and linked applications.

**Integration Map**: List or network view of all integrations. Each integration shows source/target applications, type, maturity, reliability, frequency, and connected business entities. Color-coded by risk level. Sortable/filterable by risk to surface the worst gaps first.

**Detail Panel**: A side panel that opens when clicking any entity across views. Shows all attributes and relationships of the selected entity in context.

---

## 5. Open Questions

These items are deferred to the workshop process:

1. Exact boundaries between knowledge domains (especially Order Management vs. Contract Management, and the cross-domain references of Customer and Device entities)
2. Complete list of ~25 applications and their classifications
3. Full RACI assignments for all actions
4. Complete business entity definitions with all attributes and governance rules
5. Full integration inventory with quality assessments
6. Whether feedback loops in the value chain need visual representation in v2
7. Whether the tool should support Confluence export or embedding
8. Whether a diff/changelog view is needed to track architecture evolution over time
