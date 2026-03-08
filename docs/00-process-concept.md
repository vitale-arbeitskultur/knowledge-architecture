# Knowledge Architecture — Process Concept

**Version:** 1.0 (Draft)
**Status:** In Discussion
**Last Updated:** 2026-02-19

---

## Roles

| Abbreviation | Role | Description |
|---|---|---|
| **KA** | Knowledge Architect | Specialist for knowledge architecture. Designs the data model, migrates workshop results into the tool, and provides subject-matter expertise on knowledge structures. |
| **KF** | Knowledge Facilitator | Facilitator and coordinator for all workshops. Manages scheduling, communication, research coordination, and ensures the process stays on track. |
| **TM** | Top Management | Steffen und Sven (Manageing Directors) |
| **MM** | Middle Management | One per team. Contribute operational knowledge about their team's activities, data usage, and processes.<br />Head ofs / VPs |
| **MGT** | All Management |  |
| **HIT** | Head of Business Process and IT | Responsible for the application landscape. Assigns Application Owner roles.<br />Annika Goeres |
| **KO** | Knowledge Owners | One per knowledge domain. Accountable for data quality and governance within their domain. Assigned during Phase 2. |
| **AO** | Application Owners | One per application. Accountable for their application's configuration, integrations, and strategic classification. Assigned during Phase 2. |

---

## The Documentation Tool

The Knowledge Management Architecture is documented in a browser-based visualization tool. It serves as the central reference for how knowledge flows through the organization: which teams perform which actions along the customer value chain, which applications support them, which business entities are created or consumed, and where quality risks exist.

During the process, the tool is populated step by step. After each workshop, the KA migrates the results into the tool's data files. The tool then provides an always-current, interactive view of the architecture as it grows. At the end of the process, the tool becomes the living documentation of the organization's knowledge architecture.

Participants use the tool primarily for orientation and validation. The detailed technical specification of the tool is maintained separately.

---

## Foundational Concepts

This process builds on three established frameworks: the Service Design Blueprint for process mapping, the RACI matrix for responsibility assignment, and core enterprise architecture principles for structuring the documentation.

### Service Design Blueprint

A [Service Design Blueprint](https://en.wikipedia.org/wiki/Service_blueprint) is a method for mapping how an organization delivers a service, introduced by G. Lynn Shostack in 1984. It visualizes the customer journey alongside the internal processes that support it.

The blueprint is organized in horizontal **lanes** separated by lines of visibility:

- **Customer Actions** — what the customer does at each stage of the journey
- **Frontstage** — employee actions visible to the customer (above the line of visibility)
- **Backstage** — employee actions hidden from the customer (below the line of visibility)
- **Support** — systems, policies, and infrastructure that enable the service

The vertical **columns** represent the stages of the customer value chain (in our case: Attract → Qualify → Order → Contract → Fulfill → Bill → Support → Engage & Renew). Each cell in the grid is an **action** — a discrete piece of work performed at a specific stage in a specific lane.

The blueprint makes it visible where handoffs happen, which teams collaborate on the same stage, and where gaps or redundancies exist.

### RACI Matrix

Each action in the blueprint carries a [RACI assignment](https://en.wikipedia.org/wiki/Responsibility_assignment_matrix) that links teams to their level of involvement:

| Letter | Role | Meaning |
|---|---|---|
| **R** | Responsible | Does the work. One or more teams can be responsible. |
| **A** | Accountable | Owns the outcome and has final decision authority. Exactly one team per action. |
| **C** | Consulted | Provides input before the work is done. Two-way communication. |
| **I** | Informed | Notified after the work is done. One-way communication. |

The RACI matrix ensures that every action has a clear owner (A) and that no action falls through the cracks. During the Phase 1 workshop, teams assign RACI roles to each action collaboratively, making implicit responsibilities explicit.

A well-formed RACI assignment follows two rules: every action has exactly one **A**, and every action has at least one **R**. If an action has no clear accountable party, that is a finding in itself.

### Enterprise Architecture Principles

The tool documents the organization's knowledge architecture across four interconnected entity types. Each type captures a different dimension of the same system:

**Actions** describe what the organization does — the processes along the value chain, who is involved, and which data and applications are used. They are the core of the service blueprint.

**Applications** describe the systems that support the work — the software portfolio, grouped by category and strategically classified (Invest, Keep, Tolerate, Migrate, Eliminate). Each application is linked to the actions where it is used and the knowledge domains it serves.

**Knowledge Domains & Business Entities** describe what the organization knows — the business data, organized into bounded domains following [domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design) principles. Each domain has a Knowledge Owner accountable for data quality and governance. Business entities (e.g., Customer, Order, Contract) define the data objects within a domain, including their attributes and lifecycle rules.

**Integrations** describe how data flows between systems — which applications exchange data, what entities are transferred, and how mature and reliable each integration is. Integration risk propagates upward: a fragile integration between two systems elevates the risk of the applications involved and, by extension, the value chain stages they support.

These four entity types are not isolated views. They form a connected graph: actions reference applications and entities, domains own entities, applications serve domains, and integrations link applications while carrying entities across boundaries. This interconnection is what makes it possible to trace the impact of a change (e.g., replacing an application) across the entire architecture.

---

## Process Overview

The process is structured in eight phases, followed by ongoing implementation. Each phase builds on the outputs of the previous one.

| Phase | Activity | Key Participants |
|---|---|---|
| **Phase 1** | Workshop: Service Blueprint & Knowledge Domains | TM, MM, KA, KF |
| **Phase 2** | Role Assignment (AO and KO) | TM, MM, KA, KF |
| **Phase 3** | Kickoff with all Owners | KA, KF, all KO, all AO |
| **Phase 4** | Research: Business Entities & Integrations | All KO, all AO |
| **Phase 5** | Workshops: Analysis & Optimizations | KA, KF, KO, AO |
| **Phase 6** | Design a basic Knowledge Architecture | KA |
| **Phase 7** | Present and Refine Knowledge Architecture Draft | TM, MM, KA, KF, KO, AO |
| **Phase 8** | Plan Implementation and Rollout | KA, KF, KO, AO |
| **Ongoing** | **Implementation, Rollout, Analysis & Optimization** | **KF, KO, AO** |

---

## Phase 1 — Workshop: Service Blueprint & Knowledge Domains

### Goal
Define the service blueprint with its steps, actions, and responsibilities (RACI). Map the data objects and entities touched by each action. Cut the knowledge domains based on the resulting landscape.

### Participants
MGT, all TL, KA, KF

### Duration
3 hours (remote). Option to schedule a follow-up session if needed, as management availability is limited.

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

**Block 2 — Customer Lane (30 min)**

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

The **HIT** assigns Application Owners. For each application in use, the HIT identifies the person with the deepest knowledge of that application and assigns them the AO role.

**TM & MM** assigns Knowledge Owners. Based on the knowledge domains defined in Phase 1, management identifies the person with the deepest understanding of each domain and assigns them the KO role.

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

### Post-Phase Actions
- KF kicks off the Phase 4 research phase with all KO and AO

---

## Phase 4 — Research: Business Entities & Integrations

### Goal
Knowledge Owners and Application Owners research and document their domains in detail. This phase builds deep, first-hand understanding.

### Responsibilities

This phase has two parallel tracks. Each person works on the track matching their role.

**Knowledge Owners** document the business entities in their domain. For each entity, this means describing what it is, where the master record lives, what its key attributes are, how those attributes are governed, and what data quality or compliance issues exist. This is detailed work — it requires consulting colleagues, checking systems, and verifying facts rather than working from memory.

**Application Owners** document the integrations where their application is the source or target. For each integration, this means describing what flows, how it works, how mature and reliable it is, and what happens when it fails. Many integrations are known only to the person who operates them — this is the phase where that knowledge gets captured.



### How It Works

KOs and AOs research and document at their own pace, consulting colleagues and checking systems as needed. Rough or incomplete answers are fine — gaps can be filled in the Phase 5 workshops.

> **Optional: structured survey.** The checklists above can be distributed as a structured survey form if that format better suits the organization. The content to be documented remains the same.

### Timeline
- Research phase begins immediately after the Phase 3 kickoff
- KA consolidates results and migrates them into the tool
- Target is to be done within a month

### Phase Completion
The phase is complete when all entity documentation (from KOs) and all integration documentation (from AOs) has been collected and migrated into the tool by the KA.

### Post-Phase Actions
- KA consolidates all research results and migrates them into the tool
- KA prepares the architecture views for the Phase 5 workshops

---

## Phase 5 — Workshops: Analysis & Optimization Mapping

### Goal
With the architecture now documented in the tool, the remaining workshops use it to analyze the current state and map out possible solutions for optimizations. The exact workshop agenda for this phase will be defined based on the findings from the research phase.

### Post-Phase Actions
- KA takes the optimization ideas from the workshops as input for the to-be architecture design

---

## Phase 6 — Design: Knowledge Architecture

### Goal
The Knowledge Architect designs a to-be knowledge architecture. This builds on everything documented so far — the as-is landscape from the research phase and the optimization ideas from the Phase 5 workshops — and produces a draft target structure.

### Responsibilities
This is primarily the KA's work. The KA designs the to-be knowledge architecture independently, drawing on the documented as-is state (business entities, integrations, domains) and the optimization opportunities identified in Phase 5.

### Outcome
A draft to-be knowledge architecture, ready to be presented and refined with the broader group in Phase 7.

---

## Phase 7 — Workshop: Present & Refine Knowledge Architecture

### Goal
The Knowledge Architect presents the draft to-be knowledge architecture to management, Knowledge Owners, and Application Owners. Together, they review, challenge, and refine it until there is a shared understanding of the target state.

### Participants
TM, MM, KA, KF, all KO, all AO

### Outcome
A refined to-be knowledge architecture that has been reviewed and agreed upon by the organization.

---

## Phase 8 — Plan: Implementation & Rollout

### Goal
With the to-be architecture agreed upon, the Knowledge Architect, Knowledge Facilitator, and all Owners jointly develop a plan for implementation and rollout. This is the final phase where the KA is involved.

### Participants
KA, KF, all KO, all AO

### Outcome
An implementation and rollout plan that the organization can execute. With this delivered, the Knowledge Architect's mission in the process is complete.

---

## Ongoing — Implementation, Rollout & Optimization

### Goal
The organization implements, rolls out, and continuously analyzes and optimizes the knowledge architecture. From this point on, the responsibility lies with the Knowledge Facilitator, Knowledge Owners, and Application Owners. The Knowledge Architect is no longer involved.

### Responsibilities
- **KF** coordinates the implementation and rollout, tracks progress, and facilitates ongoing optimization
- **KO** implement changes in their knowledge domains and maintain entity documentation
- **AO** implement integration changes and maintain integration documentation
