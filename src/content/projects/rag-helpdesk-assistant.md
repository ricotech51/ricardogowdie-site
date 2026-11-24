---
title: Helpdesk ticket assistant (RAG)
tag: AI
where: Consulting work
summary: "I built a retrieval-augmented generation (RAG) chat assistant that answers plain-English questions about helpdesk tickets and helps draft reports."
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
result: "I can ask any question about the ticket data and get high-quality answers quickly, instead of building a new spreadsheet view for each one."
featured: true
draft: false
order: 0
---

## How it works

1. **Export.** Tickets are exported from the helpdesk system to Excel: the problem, the steps taken, the resolution and the ticket's details.
2. **Prepare.** The app loads the export and turns each ticket into one record, so the problem and its fix stay together.
3. **Retrieve.** For each question, the app finds the tickets that matter most, so the model reads the right evidence instead of the whole file.
4. **Answer.** The model answers using those tickets, in a chat window in the browser.

Questions like "What were the most common printer issues last quarter, and how were they fixed?" or "Draft a summary of this month's tickets for the team lead" get a useful answer straight away.

## Why an Excel export

An export is a good way to prove the idea quickly. It needs no access to the helpdesk system and no changes to it, and the client can see exactly which data the assistant uses.

## What I'd do next for production

- **Connect to the ticketing system's API** instead of a manual export, with a scheduled sync so answers stay current.
- **Remove personal data before it reaches the model**: names, email addresses, phone numbers and anything a user pasted into a ticket.
- **Show the ticket numbers behind every answer**, so each claim can be checked.
- **Add access control**, so each person can only ask about tickets they are allowed to see.
- **Build a test set** of questions with known answers, and run it after every prompt or model change.
- **Calculate counts and averages in code or SQL**, and let the model write the explanation around them.
