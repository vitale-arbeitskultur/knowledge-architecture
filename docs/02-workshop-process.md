# Knowledge Management Architecture — Process Concept

**Version:** 0.2 (Draft)
**Status:** In Discussion
**Last Updated:** 2026-02-19

---

## Roles

| Abbreviation | Role | Description |
|---|---|---|
| **KA** | Knowledge Architect | Specialist for knowledge architecture. Designs the data model, migrates workshop results into the tool, and provides subject-matter expertise on knowledge structures. |
| **KF** | Knowledge Facilitator | Facilitator and coordinator for all workshops. Manages scheduling, communication, survey distribution, and ensures the process stays on track. |
| **MGT** | Top Management | CEO, COO. Provides strategic direction, validates the value chain, and assigns Knowledge Owner roles. |
| **IT Lead** | IT Lead | Responsible for the application landscape. Assigns Application Owner roles. |
| **TL** | Team Leads | One per team. Contribute operational knowledge about their team's activities, data usage, and processes. |
| **KO** | Knowledge Owners | One per knowledge domain. Accountable for data quality and governance within their domain. Assigned during Phase 2. |
| **AO** | Application Owners | One per application. Accountable for their application's configuration, integrations, and strategic classification. Assigned during Phase 2. |

---

## The Documentation Tool

The Knowledge Management Architecture is documented in a browser-based visualization tool. It serves as the central reference for how knowledge flows through the organization: which teams perform which actions along the customer value chain, which applications support them, which business entities are created or consumed, and where quality risks exist.

The tool is organized around the Service Design Blueprint as its primary view. From this central perspective, all other views are accessible: the application landscape, integrations between applications, knowledge domains and their business entities, and the risk landscape.

During the process, the tool is populated step by step. After each workshop, the KA migrates the results into the tool's data files. The tool then provides an always-current, interactive view of the architecture as it grows. At the end of the process, the tool becomes the living documentation of the organization's knowledge architecture.

Participants use the tool primarily for orientation and validation. The detailed technical specification of the tool is maintained separately.

---

## Process Overview

The process is structured in five phases. Each phase builds on the outputs of the previous one.

| Phase | Activity | Key Participants |
|---|---|---|
| **Phase 1** | Workshop: Service Blueprint & Knowledge Domains | MGT, all TL, KA, KF |
| **Phase 2** | Role Assignment (AO and KO) | IT Lead, MGT, KA, KF |
| **Phase 3** | Kickoff with all Owners | KA, KF, all KO, all AO |
| **Phase 4** | Research: Business Entity & Integration Survey | All KO, all AO |
| **Phase 5** | Workshops: Analysis & Optimization Mapping | KA, KF, KO, AO, TL, MGT |

---

## Phase 1 — Workshop: Service Blueprint & Knowledge Domains

### Goal
Define the service blueprint with its steps, actions, and responsibilities (RACI). Map the data objects and entities touched by each action. Cut the knowledge domains based on the resulting landscape.

### Participants
MGT, all TL, KA, KF

### Duration
4 hours (remote). Option to schedule a follow-up session if needed, as management availability is limited.

### Preparation
- KA prepares a draft value chain based on the business model (IT equipment rental: Attract → Qualify → Order → Contract → Fulfill → Bill → Support → Engage & Renew)
- Each team lead prepares a list of 5–10 key activities their team performs that are related to the customer lifecycle

### Guiding Questions
- What are the steps a customer is going through in the service design blueprint?
- What are the actions in each step?
- Who is accountable, responsible, consulted and informed (RACI) in each of these actions?
- Which data objects and entities are touched by each action?

### Tools
Whiteboard (physical or digital) to collect all data during the workshop. Results are migrated into the tool afterwards.

### Agenda

**Block 1 — Value Chain Stages (30 min)**

Define and validate the high-level stages of the value chain from the customer's perspective.

Output: Validated and ordered list of value chain stages.

**Block 2 — Customer Lane (45 min)**

Map the customer actions, touchpoints, and experience at each stage.

Output: Customer actions mapped to each value chain stage.

**Block 3 — Frontstage and Backstage Lanes (45 min)**

Map visible (frontstage) and internal (backstage) actions for each stage. Assign RACI roles and identify data entities touched by each action.

Output: Frontstage and backstage actions mapped to each stage with RACI assignments and entity references.

**Block 4 — Support Processes (45 min)**

Map the support processes that run continuously across the value chain. Assign RACI roles and identify data entities touched.

Output: Support actions mapped with RACI assignments and entity references.

**Block 5 — Entity Completeness Check (15 min)**

Review the full blueprint to verify that all data objects and entities have been captured across all lanes.

Output: Complete draft Service Blueprint with entities on the whiteboard.

### Post-Phase Actions
- KA migrates the whiteboard results into the tool's data files
- KA prepares a draft knowledge domain cut based on the entity landscape from the workshop

---

## Phase 2 — Role Assignment

### Goal
Assign Application Owner and Knowledge Owner roles so that every application and every knowledge domain has a named person accountable for it.

### How It Works

The **IT Lead** assigns Application Owners. For each application in use, the IT Lead identifies the person with the deepest knowledge of that application and assigns them the AO role.

**Management** assigns Knowledge Owners. Based on the knowledge domains defined in Phase 1, management identifies the person with the deepest understanding of each domain and assigns them the KO role.

The KF coordinates this process and ensures all assignments are completed before the Phase 3 kickoff.

### Output
- Complete list of Application Owners (one per application)
- Complete list of Knowledge Owners (one per knowledge domain)

---

## Phase 3 — Kickoff with All Owners

### Goal
Bring all newly assigned Application Owners and Knowledge Owners together. Introduce the project, the tool, and the upcoming research phase. Align everyone on their role and responsibilities.

### Participants
KA, KF, all KO, all AO

### Duration
1.5–2 hours (remote)

### Agenda

**Block 1 — Project Introduction (30 min)**

KF presents the project context: why the organization is building a Knowledge Management Architecture, what the tool does, and what the end result will look like. KA walks through the Service Blueprint created in Phase 1 so that all owners see where their domain or application fits into the value chain.

**Block 2 — Roles & Responsibilities (20 min)**

KF explains the Knowledge Owner and Application Owner roles: what is expected, what accountability means, and how these roles relate to the ongoing governance of the architecture.

**Block 3 — Research Phase Briefing (30 min)**

KA introduces the upcoming survey. Explains the questions, gives examples, and clarifies the expected level of detail. Participants can ask questions about how to fill in the survey for their specific domain or application.

**Block 4 — Q&A and Next Steps (10 min)**

Open questions, timeline, and support options during the research phase.

### Post-Phase Actions
- KF distributes the Business Entity & Integration Survey to all KO and AO

---

## Phase 4 — Research: Business Entity & Integration Survey

### Goal
Collect detailed information about business entities, their attributes, and the integrations between applications. This data feeds directly into the tool and prepares the ground for the optimization workshops.

### How It Works
This is a single combined survey distributed to all Knowledge Owners and Application Owners. Each person fills in the sections relevant to their domain or application. The KA offers optional office-hour calls for respondents who have questions while filling in the survey.

### Timeline
- Survey is distributed immediately after the Phase 3 kickoff
- Respondents have 2 weeks to complete it
- KF sends a reminder after 1 week
- KA consolidates results and migrates them into the tool

### Survey: Business Entity & Integration Detail

**Respondents:** All Knowledge Owners (Part A) and all Application Owners (Part B)
**Estimated time:** 45–60 minutes per respondent

#### Part A — Business Entity Detail (for Knowledge Owners)

Complete one copy of this section per business entity in your domain.

**Entity name:** _______________
**Knowledge Domain:** _______________

**A1. One-sentence description:** What is this entity in business terms?

**A2. Where is the master record?** In which application is the single source of truth for this entity? If there is no clear single source, please state that.

**A3. What are the 5–10 most important attributes of this entity?** Focus on the ones that matter for business decisions, not every technical field.

| # | Attribute Name | What It Represents | Where It's First Created |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

**A4. Which other entities does this entity reference?** (e.g., "An Order references a Customer and one or more Devices")

**A5. Are there known data quality issues with this entity today?** If yes, describe the most common problems (duplicates, missing values, outdated records, inconsistencies between systems).

**A6. Are there legal or regulatory requirements for this entity's data?** (e.g., GDPR, tax retention requirements, industry-specific regulations)

_(Repeat for each entity in the domain)_

#### Part B — Integration Detail (for Application Owners)

Complete one copy of this section per integration where your application is the source or the target.

**B1. Source application** (where the data comes from):
**B2. Target application** (where the data goes to):
**B3. Description:** What does this integration do in your own words?

**B4. Which business entities flow through this integration?**

| Business Entity | Created in Target | Read from Source | Updated in Target |
|---|---|---|---|
| | | | |
| | | | |

**B5. Are there specific attributes that are transferred, or is it the full entity?**

**B6. Integration type:**
- [ ] API (system-to-system, fully programmatic)
- [ ] Webhook (event-triggered automatic call)
- [ ] File-based (CSV/Excel export-import)
- [ ] Manual (human copies data between systems)

**B7. Maturity:**
- [ ] **Automated** — No human involvement. Data flows automatically.
- [ ] **Semi-automated** — System triggers the process, but a human validates or completes a step.
- [ ] **Manual with template** — A human performs the transfer following a documented process.
- [ ] **Manual ad-hoc** — A human copies data when they think of it, with no standardized process.

**B8. Reliability** — How often does this integration produce correct, complete data?
- [ ] **High** — Rarely fails. Data is consistently correct.
- [ ] **Medium** — Occasional issues, roughly once a month.
- [ ] **Low** — Regular problems, weekly or more often.

**B9. Frequency:**
- [ ] Real-time (immediate)
- [ ] Event-triggered (happens on a specific action, but not instant)
- [ ] Daily batch
- [ ] Weekly batch
- [ ] On-demand (manually triggered)

**B10. What happens when this integration fails?** Who notices? How is it fixed? How long until the problem is detected?

**B11. Is there documentation for this integration?**
- [ ] Yes, well-documented
- [ ] Partially documented
- [ ] No documentation — knowledge is in one person's head
- [ ] No documentation — nobody fully understands it

_(Repeat for each integration)_

### Post-Phase Actions
- KA consolidates all survey results and migrates them into the tool
- KA prepares the architecture views for the Phase 5 workshops

---

## Phase 5 — Workshops: Analysis & Optimization Mapping

### Goal
With the architecture now documented in the tool, the remaining workshops use it to analyze the current state and map out possible solutions for optimizations. The exact workshop agenda for this phase will be defined based on the findings from the research phase.

### Possible Workshop Topics

**Application Landscape & Strategic Classification** — Map all applications, classify each strategically (Invest, Keep, Tolerate, Migrate, Eliminate), and link applications to the value chain and knowledge domains.

**Integration Quality & Risk Assessment** — Assess integration maturity and reliability, identify quality risks, and prioritize improvements.

**RACI Validation & Architecture Review** — Walk through the complete architecture, validate all RACI assignments, review the risk landscape, and agree on governance going forward.

**Optimization Roadmap** — Based on the identified risks and gaps, define concrete optimization measures with priorities, timelines, and responsibilities.

### Participants
Varies per workshop. Typically KA, KF, and a combination of KO, AO, TL, and MGT depending on the topic.

---

## Timeline

| Phase | Activity | Suggested Timing |
|---|---|---|
| Phase 1 | Workshop: Service Blueprint & Knowledge Domains | Week 1 |
| Phase 2 | Role Assignment (AO by IT Lead, KO by MGT) | Week 2 |
| Phase 3 | Kickoff with all Owners | Week 3 |
| Phase 4 | Business Entity & Integration Survey | Week 3–5 |
| Phase 5 | Analysis & Optimization Workshops | Week 6 onwards |
