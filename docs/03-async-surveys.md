# Asynchronous Surveys — Knowledge Management Architecture

**Version:** 0.1 (Draft)
**Status:** In Discussion
**Last Updated:** 2026-02-13

---

## Overview

These surveys are designed to be completed asynchronously between workshops. They gather detailed information from specific role holders that would be too time-consuming to collect in a group setting. Each survey feeds into a specific workshop.

### How to Use These Surveys

Each survey can be distributed as a form (e.g., Microsoft Forms, Google Forms) or as a structured document (Word/Confluence template). Respondents should receive the survey at least one week before the workshop that depends on its results. The KM Architect collects and consolidates responses before the workshop.

---

## Survey 1: Team & Role Survey

**Distributed after:** Workshop 1 (Value Chain & Service Blueprint)
**Feeds into:** Workshop 2 (Knowledge Domains & Business Entities)
**Respondents:** All Team Leads
**Estimated time:** 20–30 minutes per team lead

### Purpose
Capture the complete team structure, roles within each team, and how each team interacts with the value chain and with data/knowledge.

### Questions

#### Section A: Team Basics

1. **Team name:**
2. **Team lead name and email:**
3. **Number of team members (including team lead):**
4. **Brief description of your team's purpose** (2–3 sentences — what is your team responsible for?):

#### Section B: Roles within Your Team

For each distinct role in your team, please fill in one block. A role is a defined responsibility, not a person — one person can hold multiple roles, and one role can be held by multiple people.

| # | Role Name | Brief Description | Number of People in This Role | Names (optional) |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

#### Section C: Value Chain Involvement

For each value chain stage, indicate your team's level of involvement:

| Value Chain Stage | Not Involved | Informed | Consulted | Responsible for Actions | Accountable for Outcomes |
|---|---|---|---|---|---|
| Attract | | | | | |
| Qualify | | | | | |
| Order | | | | | |
| Contract | | | | | |
| Fulfill | | | | | |
| Bill | | | | | |
| Support | | | | | |
| Engage & Renew | | | | | |

#### Section D: Knowledge & Data Interaction

5. **Which types of data or knowledge does your team create or maintain?** (free text — e.g., "We create and maintain customer contact data in HubSpot, and we write meeting notes in Confluence")

6. **Which types of data or knowledge does your team consume but not own?** (free text — e.g., "We read device availability data from the ERP but don't maintain it")

7. **Where does your team most often encounter data quality problems?** (free text — describe specific situations where data was wrong, missing, or outdated)

8. **Are there situations where your team enters the same data into multiple systems?** If yes, please describe which data and which systems.

---

## Survey 2: Knowledge Owner Survey

**Distributed after:** Workshop 2 (Knowledge Domains & Business Entities)
**Feeds into:** Workshop 3 (Entity Attributes & Data Governance)
**Respondents:** All assigned Knowledge Owners
**Estimated time:** 30–45 minutes per Knowledge Owner

### Purpose
Capture detailed information about each knowledge domain from the assigned Knowledge Owner's perspective. This survey bridges the domain-level discussion from Workshop 2 to the attribute-level detail needed in Workshop 3.

### Questions

#### Section A: Domain Overview

1. **Your name and role:**
2. **Knowledge domain you are responsible for:**
3. **In your own words, what does this domain cover?** (3–5 sentences describing the scope and boundaries of the knowledge in this domain)
4. **Which teams interact with this domain's data?** Please list all teams that create, read, update, or reference data in your domain.

| Team | Creates Data | Reads Data | Updates Data | Deletes/Archives Data |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

#### Section B: Business Entities

For each business entity in your domain (as identified in Workshop 2), answer the following:

**Entity name:** _______________

5. **One-sentence description:** What is this entity in business terms?

6. **Where is the master record?** In which application is the "single source of truth" for this entity? If there is no clear single source, please state that.

7. **What are the 5–10 most important attributes of this entity?** List the key fields/properties — focus on the ones that matter for business decisions, not every technical field.

| # | Attribute Name | What It Represents | Where It's First Created |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |
| 9 | | | |
| 10 | | | |

8. **Which other entities does this entity reference?** (e.g., "An Order references a Customer and one or more Devices")

9. **Are there known data quality issues with this entity today?** If yes, describe the most common problems (duplicates, missing values, outdated records, inconsistencies between systems).

10. **Are there legal or regulatory requirements for this entity's data?** (e.g., GDPR, tax retention requirements, industry-specific regulations)

_(Repeat Section B for each entity in the domain)_

---

## Survey 3: Business Entity Detail Survey

**Distributed after:** Workshop 2, alongside Survey 2
**Feeds into:** Workshop 3 (Entity Attributes & Data Governance)
**Respondents:** Knowledge Owners (with input from team members who work with the data daily)
**Estimated time:** 45–60 minutes per Knowledge Owner

### Purpose
Capture detailed attribute-level governance rules for each business entity. This is the most detailed survey and provides the raw material for the data governance layer.

### Questions

Complete one copy of this section **per business entity** in your domain.

#### Entity: _______________
#### Knowledge Domain: _______________

For each key attribute of this entity (as listed in Survey 2, question 7):

**Attribute: _______________**

1. **Data type:** (text, number, date, email, enum/choice list, currency, reference to another entity, file/document)

2. **Validation rules — what makes this attribute valid?**
   - Is it required or optional?
   - Are there format rules? (e.g., email format, specific ID pattern)
   - Are there uniqueness constraints? (must be unique within the system/domain)
   - Are there allowed values? (if it's an enum, list them)
   - Are there dependency rules? (e.g., "End Date must be after Start Date")
   - Are there range constraints? (min/max for numbers, max length for text)

3. **Retention policy — how long must we keep this data?**
   - What is the minimum retention period?
   - What triggers the start of the retention period? (e.g., "after contract ends," "after last activity," "from creation date")
   - Are there legal or regulatory requirements driving the retention period?
   - If there is no formal retention policy today, what do you think it should be?

4. **Archiving rules — what happens when retention ends?**
   - Should the data be fully deleted?
   - Should it be anonymized (personal data removed, statistical data kept)?
   - Should it be moved to a long-term archive (cold storage, read-only)?
   - Are there specific fields that must be removed vs. retained in the archive?

5. **Quality assessment — current state:**
   - How would you rate the current data quality of this attribute? (Excellent / Good / Acceptable / Poor / Unknown)
   - What is the most common quality problem? (missing values, wrong format, outdated, inconsistent across systems, duplicates)

_(Repeat for each attribute of the entity)_

---

## Survey 4: Application Owner Survey

**Distributed after:** Workshop 3 (Entity Attributes & Data Governance)
**Feeds into:** Workshop 4 (Application Landscape & Strategic Classification)
**Respondents:** All Application Owners (or candidates)
**Estimated time:** 20–30 minutes per Application Owner

### Purpose
Gather a complete profile of each application from the person who knows it best.

### Questions

#### Section A: Application Basics

1. **Application name:**
2. **Your name and role:**
3. **Application category:** (CRM, Communication, Documentation/Wiki, ERP/Finance, Marketing, HR, Project Management, Logistics, Support/Ticketing, Other: ___)
4. **Brief description** (2–3 sentences — what does this application do in our company?):
5. **URL or access point:**
6. **Vendor/provider:**
7. **Licensing model:** (SaaS subscription, perpetual license, open source, free tier, internal/custom-built)
8. **Approximate number of users** (how many employees use this application regularly?):
9. **Which teams use this application?** List all teams:

#### Section B: Knowledge Domain Connection

10. **Which knowledge domains does this application store or process data for?** (Select all that apply)

| Domain | Stores Master Data | Processes/Transforms Data | Displays/Reports Data |
|---|---|---|---|
| Client Management | | | |
| Sales | | | |
| Order Management | | | |
| Asset Management | | | |
| Contract Management | | | |
| Finance & Billing | | | |
| Support & Service | | | |
| Internal Knowledge | | | |
| HR | | | |

11. **Which specific business entities does this application manage?** (e.g., "HubSpot manages Lead, Customer, Contact, Opportunity, and Quote")

#### Section C: Strategic Assessment

12. **How would you classify this application's strategic role?**
   - [ ] **Invest** — This is a core platform we should expand and build upon
   - [ ] **Keep** — It works well, no need for change
   - [ ] **Tolerate** — It's not ideal but acceptable for now
   - [ ] **Migrate** — It should be replaced (if so, with what? _____)
   - [ ] **Eliminate** — It should be decommissioned (if so, when? _____)

13. **Rationale for your classification** (2–3 sentences — why did you choose this?):

14. **What are the biggest limitations or pain points of this application?**

15. **If you could change one thing about how this application is used in the company, what would it be?**

#### Section D: Integration Awareness

16. **Does this application send data to other systems?** If yes, list them:

| Target Application | What Data Is Sent | How (API/Manual/File/Other) |
|---|---|---|
| | | |
| | | |
| | | |

17. **Does this application receive data from other systems?** If yes, list them:

| Source Application | What Data Is Received | How (API/Manual/File/Other) |
|---|---|---|
| | | |
| | | |
| | | |

18. **Are there integrations that you wish existed but don't today?** Describe what would be helpful.

---

## Survey 5: Integration Detail Survey

**Distributed after:** Workshop 4 (Application Landscape)
**Feeds into:** Workshop 5 (Integration Mapping & Quality Assessment)
**Respondents:** Application Owners (each AO covers integrations where their application is source or target)
**Estimated time:** 15–20 minutes per integration

### Purpose
Gather detailed quality and maturity data for each known integration. This survey is filled out per integration, not per application.

### Questions

#### Integration Identification

1. **Source application** (where the data comes from):
2. **Target application** (where the data goes to):
3. **Integration name/description** (in your own words, what does this integration do?):

#### Data Flow

4. **Which business entities flow through this integration?** For each entity, indicate the operation:

| Business Entity | Created in Target | Read from Source | Updated in Target | Other (describe) |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |

5. **Are there specific attributes that are transferred, or is it the full entity?** (e.g., "Only the customer name and email are sent, not the full customer record")

#### Quality Assessment

6. **Integration type:**
   - [ ] API (system-to-system, fully programmatic)
   - [ ] Webhook (event-triggered automatic call)
   - [ ] File-based (CSV/Excel export-import)
   - [ ] Manual (human copies data between systems)

7. **Maturity:**
   - [ ] **Automated** — No human involvement. Data flows automatically without anyone needing to do anything.
   - [ ] **Semi-automated** — System triggers the process, but a human needs to validate, approve, or complete a step.
   - [ ] **Manual with template** — A human performs the transfer following a documented process, checklist, or template.
   - [ ] **Manual ad-hoc** — A human copies data when they think of it, with no standardized process.

8. **Reliability** — How often does this integration produce correct, complete data?
   - [ ] **High** — Rarely fails. Data is consistently correct.
   - [ ] **Medium** — Occasional issues. Maybe once a month something goes wrong.
   - [ ] **Low** — Regular problems. Data inconsistencies are found weekly or more often.

9. **Frequency:**
   - [ ] Real-time (immediate, within seconds)
   - [ ] Event-triggered (happens when a specific action occurs, but not instant)
   - [ ] Daily (batch process once a day)
   - [ ] Weekly (batch process once a week)
   - [ ] On-demand (happens when someone triggers it manually)

10. **What happens when this integration fails?** Who notices? How is it fixed? How long until the problem is detected?

11. **Is there documentation for this integration?** (e.g., API docs, process description, checklist)
    - [ ] Yes, well-documented
    - [ ] Partially documented
    - [ ] No documentation — knowledge is in one person's head
    - [ ] No documentation — nobody fully understands it

12. **Single point of failure:** Is there only one person who understands this integration? If yes, who?

---

## Survey Distribution Schedule

| Survey | Distributed After | Due Before | Respondents | Est. Responses |
|---|---|---|---|---|
| 1: Team & Role | Workshop 1 | Workshop 2 (1 week before) | Team Leads | ~7 |
| 2: Knowledge Owner | Workshop 2 | Workshop 3 (1 week before) | Knowledge Owners | ~9 |
| 3: Entity Detail | Workshop 2 | Workshop 3 (1 week before) | Knowledge Owners | ~9 |
| 4: Application Owner | Workshop 3 | Workshop 4 (1 week before) | Application Owners | ~15–25 |
| 5: Integration Detail | Workshop 4 | Workshop 5 (1 week before) | Application Owners | ~20–40 |

### Tips for High Response Rates

- Keep the introduction brief: explain why their input matters and how it will be used
- Give at least 5 working days to complete
- Send one reminder 2 days before the deadline
- Make it clear that rough/incomplete answers are better than no answers — gaps can be filled in the workshop
- For surveys 3 and 5 (the most detailed), offer a 15-minute optional "office hour" call where respondents can ask the KM Architect questions while filling it out
