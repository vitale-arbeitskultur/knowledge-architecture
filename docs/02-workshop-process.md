# Workshop Process — Knowledge Management Architecture

**Version:** 0.1 (Draft)
**Status:** In Discussion
**Last Updated:** 2026-02-13

---

## Overview

The Knowledge Management Architecture is populated through a structured series of workshops. Each workshop builds on the outputs of the previous one. Between workshops, asynchronous surveys (see `03-async-surveys.md`) gather detailed data from Application Owners, Knowledge Owners, and team leads.

The workshop sequence follows a top-down approach: start with the big picture (value chain), then drill into domains and entities, then map the technology landscape, and finally validate the risk picture.

### Participants Key

| Abbreviation | Role |
|---|---|
| **KMA** | Knowledge Management Architect (facilitator for all workshops) |
| **MGT** | Top Management (CEO, COO) |
| **TL** | Team Leads (one per team) |
| **KO** | Knowledge Owners (one per domain, assigned during workshops) |
| **AO** | Application Owners (one per application, assigned during workshops) |

---

## Workshop 1: Value Chain & Service Blueprint

### Goal
Define the customer lifecycle from first contact to ongoing relationship. Map the value chain stages and identify the key actions across the four swim lanes (customer, frontstage, backstage, support).

### Participants
KMA, MGT, all TL

### Duration
Half day (3–4 hours)

### Preparation
- KMA prepares a draft value chain based on the business model (IT equipment rental: Attract → Qualify → Order → Contract → Fulfill → Bill → Support → Engage & Renew)
- Each team lead prepares a list of 5–10 key activities their team performs that are related to the customer lifecycle

### Agenda

**Block 1 — Value Chain Stages (60 min)**

Leading questions:
- What is the very first moment a potential customer comes into contact with us? What triggers it?
- What are the major milestones from a customer's perspective? When does the customer feel "something has happened"?
- Where does the customer experience end — or does it cycle? What happens after a contract expires?
- Are there stages in our process that the customer never sees but are critical to delivery?
- If you had to explain our business in 6–8 steps to a new employee, what would those steps be?

Output: Validated and ordered list of value chain stages.

**Block 2 — Customer Lane (45 min)**

Leading questions:
- At each stage, what is the customer actually doing? What action are they taking or what experience are they having?
- Where does the customer have to wait? Where are the friction points?
- What information does the customer need at each stage? What do they receive from us?
- Which touchpoints are digital (website, email, portal) and which are personal (call, meeting)?

Output: Customer actions mapped to each value chain stage.

**Block 3 — Frontstage and Backstage Lanes (60 min)**

Leading questions:
- For each customer action, what do we do that the customer can see? Who talks to the client? Who sends the email? Who runs the meeting?
- For each frontstage action, what needs to happen internally first? What preparation, data entry, or coordination happens behind the scenes?
- Where do handoffs occur between teams? Which team picks up where another leaves off?
- Are there actions where the responsible team is unclear or where multiple teams are involved?

Output: Frontstage and backstage actions mapped to each stage with preliminary team assignments.

**Block 4 — Support Lane and Boundaries (45 min)**

Leading questions:
- What systems, infrastructure, or recurring processes need to run continuously to support the value chain?
- Where do we rely on IT systems, templates, or automated workflows?
- Which support activities would cause the most disruption if they stopped?

Output: Support actions mapped. Complete draft Service Blueprint on the wall.

### Post-Workshop Actions
- KMA digitizes the blueprint into the tool's JSON data files
- KMA distributes the "Team & Role Survey" (async) to all team leads
- KMA identifies preliminary Knowledge Owner candidates based on the discussions

---

## Workshop 2: Knowledge Domains & Business Entities

### Goal
Define the knowledge domain boundaries, assign Knowledge Owners, and identify the core business entities within each domain. This workshop answers: "What knowledge exists in our company, how is it grouped, and who is responsible for it?"

### Participants
KMA, MGT, all TL, candidate KOs

### Duration
Half day (3–4 hours)

### Preparation
- KMA prepares a draft domain cut (9 domains based on the technical specification)
- Each team lead reviews the draft and notes which domains their team interacts with
- Async survey results from the "Team & Role Survey" are available

### Agenda

**Block 1 — Domain Landscape Overview (45 min)**

Leading questions:
- If you think about all the data and knowledge in the company, what are the big categories? How would you group them?
- Which data is shared across multiple teams? Which data lives only within one team?
- Where do you see the most overlap or ambiguity in data ownership today?
- If a data quality issue occurs in customer data, who do people go to today? What about device data? What about contract data?

Output: Validated list of knowledge domains with agreed boundaries.

**Block 2 — Knowledge Owner Assignment (30 min)**

Leading questions:
- For each domain, who has the deepest understanding of this knowledge area?
- Who should be the single point of accountability for data quality in this domain?
- Does the Knowledge Owner need to be in a specific team, or could this role sit anywhere?
- Are there domains where no natural owner exists today? How do we handle that?

Output: Knowledge Owner role assignments for each domain.

**Block 3 — Business Entity Identification (90 min)**

Work through each domain one by one. For each domain:

Leading questions:
- What are the core "things" in this domain? If you had to list the 3–5 most important types of records or objects, what would they be?
- For each entity, can you describe it in one sentence? What makes it different from the other entities?
- Which entities in this domain reference entities from other domains? (e.g., an Order references a Customer and a Device)
- Are there entities that could belong to more than one domain? How do we decide where they live?
- Is there an entity that acts as the "master" for this domain — the one that everything else connects to?

Specific probing questions for the IT equipment rental context:
- When does a Lead become a Customer? Is there a clear trigger or is it gradual?
- A Device moves through many states (in-stock, deployed, returned, retired). Does the Device entity belong to one domain throughout its lifecycle, or does ownership transfer?
- Where does the line between an Order and a Contract sit? When does one end and the other begin?
- What happens to a Support Ticket after it's resolved? Does it just close, or does it create knowledge (a known issue, a FAQ entry)?

Output: Entity list per domain with one-line descriptions and cross-domain references noted.

**Block 4 — Cross-Domain Relationships (30 min)**

Leading questions:
- Which entities are referenced most often from other domains? (Likely: Customer, Device)
- For these heavily-referenced entities, who is the single source of truth?
- When an entity is updated in one system, how does that change reach the other systems that reference it?

Output: Cross-domain dependency map. List of "master entities" that need the strictest quality governance.

### Post-Workshop Actions
- KMA creates the domain and entity JSON files
- KMA distributes the "Knowledge Owner Survey" (async) to all assigned Knowledge Owners
- KMA distributes the "Business Entity Detail Survey" (async) to Knowledge Owners for their domain

---

## Workshop 3: Entity Attributes & Data Governance

### Goal
Define the key attributes for each business entity, including validation rules, retention policies, and archiving rules. This is the deepest and most detailed workshop.

### Participants
KMA, all KOs, relevant TL

### Duration
Full day (split into two half-days if needed)

### Preparation
- Async "Business Entity Detail Survey" results are available
- Each Knowledge Owner has reviewed their domain's entities and drafted initial attribute lists
- KMA prepares attribute templates and examples

### Agenda

**Block 1 — Attribute Definition Method (30 min)**

Explain the approach: for each entity, we define key attributes (not every field, but the ones that matter for governance). Each attribute gets a type, a validation rule, a retention policy, and archiving rules.

Leading questions to calibrate the level of detail:
- Are we mapping every field in every system, or focusing on the attributes that matter for business decisions and compliance?
- What level of detail does management need vs. what the KM team needs?
- Are there regulatory requirements (GDPR, industry-specific) that dictate retention or archiving?

**Block 2 — Domain-by-Domain Attribute Workshop (3–4 hours)**

Work through each domain with its Knowledge Owner. For each entity within the domain, for each key attribute:

Leading questions:
- What is this attribute? What does it represent in business terms?
- Where is this attribute first created? In which application? By which team?
- What makes this attribute valid? What would make it invalid? Are there format rules, uniqueness constraints, or dependency rules?
- How long must we keep this data? Are there legal or contractual requirements?
- When the retention period ends, what happens? Full deletion, anonymization, or long-term archive?
- Is this attribute ever manually re-entered in another system? If yes, that's an integration risk.

**Block 3 — Quality Criteria Validation (45 min)**

Leading questions:
- For each entity, which 2–3 attributes are the most critical for data quality? If these are wrong, what breaks?
- Who is currently responsible for checking data quality? Is it systematic or ad-hoc?
- Are there known data quality issues today? Where does data most often go wrong?

Output: Complete attribute definitions for all business entities with governance rules.

### Post-Workshop Actions
- KMA updates all business entity JSON files with complete attribute definitions
- KMA prepares the application inventory for Workshop 4

---

## Workshop 4: Application Landscape & Strategic Classification

### Goal
Map all ~25 applications, assign Application Owners, classify each application strategically (TIMEK), and link applications to the value chain and knowledge domains.

### Participants
KMA, IT Manager, all AOs (or candidates), relevant TL

### Duration
Half day (3–4 hours)

### Preparation
- Async "Application Owner Survey" results are available
- IT prepares a list of all known applications/SaaS tools in use
- KMA prepares the draft list of ~25 applications

### Agenda

**Block 1 — Application Inventory Completion (60 min)**

Leading questions:
- Are there tools on this list that are no longer in use or have been replaced?
- Are there tools missing from this list? Shadow IT, free tools, spreadsheets used as systems?
- For each tool, who is the person with the deepest knowledge? Who configures it? Who decides about changes?
- Which tools are used by only one team, and which are used across the company?

Output: Complete, validated application list with Application Owner assignments.

**Block 2 — Strategic Classification (60 min)**

For each application, discuss and assign a TIMEK classification:

Leading questions:
- **Invest:** Is this a platform we're building our future on? Are we actively expanding its use?
- **Keep:** Is this tool stable, doing its job, and not requiring change?
- **Tolerate:** Is this tool suboptimal but acceptable for now? What would need to happen for it to move to "Migrate" or "Eliminate"?
- **Migrate:** Is there a plan to replace this tool? What is the timeline? What replaces it?
- **Eliminate:** Is this tool scheduled for decommission? What depends on it that needs to be moved first?
- Are there tools where different teams have different opinions on the classification? How do we resolve that?

Output: All applications classified with TIMEK status and rationale.

**Block 3 — Application-to-Value-Chain Mapping (60 min)**

Leading questions:
- For each value chain stage, which applications are actively used?
- Are there stages where too many tools are in play? Where consolidation would help?
- Are there stages where a critical application is classified as "Tolerate" or "Migrate"? What's the risk?
- Which applications appear in the most stages? These are the backbone of the architecture.

Output: Application-to-stage mapping. Identification of backbone applications and risk spots.

### Post-Workshop Actions
- KMA updates application JSON files with classifications and mappings
- KMA distributes the "Integration Survey" (async) to all Application Owners
- KMA prepares integration draft for Workshop 5

---

## Workshop 5: Integration Mapping & Quality Assessment

### Goal
Map all integrations between applications, assess their maturity and reliability, identify quality risks, and connect integrations to specific business entities.

### Participants
KMA, IT Manager, all AOs, relevant TL

### Duration
Half day (3–4 hours)

### Preparation
- Async "Integration Survey" results are available
- Each Application Owner has documented their application's inbound and outbound data flows
- KMA prepares a draft integration map based on survey results

### Agenda

**Block 1 — Integration Inventory (60 min)**

Leading questions:
- For each application, what data goes in and where does it come from? What data goes out and where does it go?
- Are there integrations that only one person knows about? Single points of failure?
- Are there data flows that happen through email, chat, or verbal communication? These are "invisible integrations" that need to be captured.
- Which integrations break most often? Where do you regularly find data inconsistencies?

Output: Complete integration inventory with source, target, and data flow description.

**Block 2 — Quality Assessment (90 min)**

For each integration, assess maturity and reliability:

Leading questions:
- **Maturity:** Is this fully automated (system-to-system, no human touch), semi-automated (system triggers but human validates), done manually with a template (checklist or form), or fully ad-hoc (someone copies data when they remember)?
- **Reliability:** How often does this integration fail or produce incorrect data? High (rarely fails), Medium (occasional issues), Low (regular problems)?
- **Frequency:** How often does data move? Real-time, event-triggered, daily batch, weekly, or on-demand?
- If this integration stopped working tomorrow, who would notice first? How long until it becomes a problem?
- Has anyone ever found data in the target system that didn't match the source? How often?

Output: All integrations assessed with maturity, reliability, and frequency.

**Block 3 — Entity Mapping & Risk Review (60 min)**

Leading questions:
- For each integration, which specific business entities flow through it? (Not just "customer data" but specifically: Customer entity? Contact entity? Both?)
- Which entities are most at risk due to manual or unreliable integrations?
- Are there entities that are manually re-entered in multiple systems instead of being synced? These are the highest-risk data quality points.
- Looking at the risk map now: where are the critical risks that need to be addressed first?

Output: Integration-to-entity mapping. Prioritized risk list.

### Post-Workshop Actions
- KMA completes all integration JSON files
- KMA generates the first complete risk visualization in the tool
- KMA prepares the RACI validation for Workshop 6

---

## Workshop 6: RACI Validation & Architecture Review

### Goal
Validate all RACI assignments on the Service Blueprint, review the complete architecture for gaps or inconsistencies, and agree on governance going forward.

### Participants
KMA, MGT, all TL, all KOs, all AOs

### Duration
Half day (3–4 hours)

### Preparation
- Complete architecture is loaded in the tool
- KMA prepares a printed or projected version of the full Service Blueprint with RACI
- Risk visualization is available

### Agenda

**Block 1 — Service Blueprint Walk-Through (60 min)**

Walk through the entire value chain from left to right. At each stage, review:

Leading questions:
- Is the Accountable role correct? Is there exactly one accountable party for each action?
- Is the Responsible assignment clear? Does the responsible team/role have the capacity and authority to do the work?
- Are the right teams Consulted? Are we missing critical input from a team?
- Are the right people Informed? Is anyone left out who should know?
- Are there actions where the RACI feels "forced" — where nobody really owns it today?

**Block 2 — Risk Review (60 min)**

Review the risk visualization across all views:

Leading questions:
- Where are the critical and high-risk areas? Do we agree these are genuine risks?
- For each critical risk, what is the impact if it materializes? Data loss? Billing errors? Customer-facing failures?
- Which risks should be addressed in the next 3 months? Which can wait?
- Are there risks that the tool surfaces that we were already aware of? Are there surprises?

**Block 3 — Governance & Maintenance (60 min)**

Leading questions:
- How often should this architecture be reviewed and updated? Quarterly? After every significant change?
- Who is responsible for keeping the data in the tool current?
- When a new application is introduced, what is the process for adding it to the architecture?
- When a team changes or a role is reassigned, who updates the model?
- Should this tool be the single source of truth, or should it sync with Confluence?

Output: Validated RACI assignments. Agreed risk priorities. Governance process for maintaining the architecture.

---

## Workshop Sequence & Timeline

| Workshop | Depends On | Async Survey Before | Suggested Timing |
|---|---|---|---|
| WS1: Value Chain & Blueprint | — | — | Week 1 |
| — | WS1 | Team & Role Survey | Week 1–2 |
| WS2: Knowledge Domains & Entities | WS1 | Team & Role Survey results | Week 3 |
| — | WS2 | Knowledge Owner Survey, Entity Detail Survey | Week 3–4 |
| WS3: Entity Attributes & Governance | WS2 | Entity Detail Survey results | Week 5 |
| — | WS3 | Application Owner Survey | Week 5–6 |
| WS4: Application Landscape | WS3 | Application Owner Survey results | Week 7 |
| — | WS4 | Integration Survey | Week 7–8 |
| WS5: Integration Mapping | WS4 | Integration Survey results | Week 9 |
| WS6: RACI Validation & Review | WS5 | — | Week 11 |

Total timeline: approximately 11 weeks from kickoff to validated architecture.
