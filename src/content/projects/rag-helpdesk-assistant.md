---
title: Helpdesk ticket assistant (RAG)
tag: AI
where: Consulting work
summary: "I built a RAG chat assistant that answers plain-English questions about helpdesk tickets."
tech:
  - Large language model (LLM)
  - Retrieval-augmented generation
  - Visual Studio
  - Excel ticket export
artifact: ../../assets/artifacts/00-rag-helpdesk.png
artifactKind: Architecture diagram
artifactAlt: "Sample RAG design: tickets exported to Excel are loaded and split into records, the most relevant tickets are found for each question, and a large language model answers in a browser chat window. A second panel lists the next steps for a production version."
problem: "Helpdesk ticket data could answer useful questions, but getting an answer meant filtering and pivoting a spreadsheet by hand, one question at a time."
action: "I exported the helpdesk tickets to Excel and wrote an app in Visual Studio that finds the tickets relevant to each question and passes them to a large language model. It opens in the browser as a chat window, where I can ask anything about the tickets or ask for a report draft."
result: "I ask a question in plain English and get an answer straight away, instead of building a new spreadsheet view for each one."
featured: true
draft: false
order: 0
---

## How it works

1. **Export.** Tickets go from the helpdesk system to Excel. That proves the idea quickly, with no access to the helpdesk system and no changes to it.
2. **Prepare.** The app turns each ticket into one record, so the problem and its fix stay together.
3. **Retrieve.** For each question, it finds the tickets that matter most.
4. **Answer.** The model answers from those tickets in a chat window in the browser.

Ask "What were the most common printer issues last quarter, and how were they fixed?" and you get a useful answer straight away.

## What I'd do next for production

- Connect to the ticketing system's API on a schedule, instead of a manual export.
- Strip personal data before it reaches the model.
- Show the ticket numbers behind every answer.
- Let each person ask only about tickets they're allowed to see.
