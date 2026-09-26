<!--
Sync Impact Report
Version change: uninitialized -> 1.0.0 (initial project constitution)
Modified principles: none; all five principles are newly established
Added sections: Core Principles, Technical Constraints, Development Workflow, Governance
Removed sections: none
Follow-up TODO: Confirm the original ratification date.
-->
# Course Web Application Constitution

## Core Principles

### I. Specification First
Define each feature's user-visible behavior and acceptance criteria before implementation. Keep
the specification current when decisions or scope change. This gives students a clear target and
makes progress reviewable.

### II. Student Ownership
AI tools may assist with any project activity, but each student MUST understand, explain, and take
responsibility for all submitted work, including AI-generated code. Verify suggestions and never
submit code whose behavior or purpose you cannot describe.

### III. Incremental Delivery
Implement one small, specified behavior at a time. Keep the application runnable, and check each
change against its acceptance criteria before starting dependent work. Small steps make defects
easier to find and demonstrate progress.

### IV. Clear Project History
Use meaningful Git commits that describe a focused change. Record important design decisions and
their rationale in project documentation so future work can follow the reasoning.

### V. Working, Understandable Quality
Check changed behavior in the browser and use automated tests where practical. Keep HTML semantic,
interfaces usable with keyboard and assistive technology, and code simple enough for the team to
maintain. Fix defects that block specified behavior before marking a feature complete.

## Technical Constraints

Build the application with HTML, CSS, and JavaScript. Keep dependencies and abstractions minimal;
introduce them only when they solve a demonstrated project need. Do not commit credentials or
private student data.

## Development Workflow

For each feature, write or update its specification, implement it in small steps, verify the
result against acceptance criteria, and commit the completed change with a meaningful message.
Update decision documentation when a significant design choice is made. Before submission, check
that the application runs and that documented behavior matches the implementation.

## Governance

This constitution governs project planning and implementation. Amend it when course requirements
or team decisions change; document the reason and record the amendment in Git. Use semantic
versioning: MAJOR for incompatible rule changes, MINOR for new or materially expanded rules, and
PATCH for clarifications that do not change obligations. Review compliance when planning and
accepting features, and explain any exception in the project documentation. Students remain
accountable for the correctness and understanding of submitted work, regardless of tool use.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2026-09-26
