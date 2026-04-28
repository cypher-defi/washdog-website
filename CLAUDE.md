# Project Memory Instructions

This project uses **MemoryKit** for persistent memory across AI conversations.

## Before Starting Any Task

Use `retrieve_context` to check for relevant memories:
- Past decisions about the topic
- Bugs or issues encountered before
- Established patterns and conventions

## When Completing Work

Use `store_memory` to save important knowledge:
- **facts** layer: Architecture decisions, technology choices, constraints
- **episodes** layer: Bugs fixed, failed approaches, incidents
- **procedures** layer: Coding patterns, conventions, workflows

## Memory Best Practices

- Include WHY (reasoning), not just WHAT (the decision)
- Reference related files or code when relevant
- Use descriptive tags for better retrieval

## Global Skills

Custom skills live in `~/.claude/skills/software/` and `~/.claude/skills/marketing/`.
To invoke one: `Read` the file at `~/.claude/skills/[category]/[skill-name].md` and follow it.
The `Skill` tool does not work for these — always use `Read` instead.
To browse available skills: `ls ~/.claude/skills/software/` or `ls ~/.claude/skills/marketing/`.
