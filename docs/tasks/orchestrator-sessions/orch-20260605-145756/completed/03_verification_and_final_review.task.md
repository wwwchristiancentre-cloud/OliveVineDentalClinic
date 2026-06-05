# Task 03: Verification and Final Review

## 🔧 Agent Setup (DO THIS FIRST)
### Workflow to Follow
- Takomi workflow: `vibe-build` review/finalization pass.

### Prime Agent Context
Read these first:
- `docs/tasks/orchestrator-sessions/orch-20260605-145756/master_plan.md`
- Task 01 report
- Task 02 changed files and verification output
- `git diff --stat` and relevant `git diff` sections

### Optional Skill / Context Overlays
| Overlay | Why |
| :--- | :--- |
| `security-audit` | Re-check security and guardrail fixes. |
| `web-design-guidelines` | Confirm accessibility/site integrity was not harmed. |
| `audit-website` | Re-audit local site if crawler and server are available. |
| `nextjs-standards` | Confirm type/lint/build verification. |

## Objective
Review the completed hardening pass for correctness, regressions, and launch readiness.

## Scope
- Inspect diffs, configs, metadata route files, and security header changes.
- Re-run or validate verification commands.
- Attempt a local site audit if practical.
- Identify residual risks requiring deployment/domain decisions.

## Definition Of Done
- Final review report summarizes changed files, verification evidence, remaining issues, and recommended next actions.
- No unaddressed CRITICAL/HIGH issues remain unless explicitly blocked by missing external information.
- Residual risks are practical and actionable.

## Expected Artifacts
- Final review notes in the orchestrator summary or chat synthesis.

## Constraints
- Review task may suggest changes but should avoid broad redesign.

## Verification
- `npx tsc --noEmit`
- `pnpm lint`
- `pnpm build`
- `pnpm audit` or equivalent package audit
- Optional `squirrel audit` local/live scan when available
