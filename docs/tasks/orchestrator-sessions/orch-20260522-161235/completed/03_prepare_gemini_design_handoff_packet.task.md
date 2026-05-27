# Task 03: Prepare Gemini Design Handoff Packet

## 🔧 Agent Setup (DO THIS FIRST)
### Workflow to Follow
- vibe-design

### Prime Agent Context
- `docs/tasks/orchestrator-sessions/orch-20260522-161235/master_plan.md`
- output of Task 02
- `docs/Project_Requirements.md`
- `docs/design/homepage-section-spec.md`
- any existing mockups under `docs/mockups/`

### Optional Skill / Context Overlays
| Overlay | Why it helps |
|---|---|
| 21st-dev-components | Useful for packaging component choices and placement notes clearly for a downstream design agent. |

## Objective
Package the approved homepage direction into a clean, design-agent-ready handoff that Gemini can use without re-discovering the project.

## Scope
- summarize project mission and constraints
- provide the final homepage section order
- provide component mapping
- define motion behavior rules
- define visual tone and non-goals
- capture dependencies and missing assets

## Definition Of Done
- a self-contained design handoff exists
- Gemini can start from the handoff without guessing page structure
- unresolved external inputs are clearly called out

## Expected Artifacts
- Gemini-ready design brief / handoff markdown
- asset checklist
- open questions list

## Constraints
- do not mix design handoff with implementation instructions more than necessary
- keep it focused on this launch, not the old full platform vision

## Dependencies
- Task 02

## Verification
A new design agent should be able to read only the handoff packet and produce coherent homepage design output.
