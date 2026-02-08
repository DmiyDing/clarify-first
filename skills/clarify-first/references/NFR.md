# Non-Functional Requirements (NFR) — Clarification Checklist

When the request touches performance, scale, deployment, or quality attributes, ask these (as relevant) before locking scope.

## Scale & load

- **QPS / RPS**: Expected requests per second? Peak vs average?
- **Data volume**: How much data (rows, size)? Growth rate?
- **Concurrency**: How many simultaneous users or connections?

## Latency & timeliness

- **Response time**: P95/P99 in ms? Real-time vs batch?
- **SLA**: Uptime or availability target (e.g. 99.9%)?
- **Freshness**: How stale can data be (e.g. eventually consistent within X seconds)?

## Compatibility & evolution

- **Backward compatibility**: Must support which old versions or clients?
- **Deprecation**: Any APIs or formats being retired? Timeline?
- **Upgrade path**: Rollout strategy (big-bang, canary, feature flags)?

## Resilience & fallback

- **Failure mode**: If this service/component fails, what should happen (degrade, fail-open, circuit breaker)?
- **Fallback**: Is there a read-only or cached fallback? Manual runbook?
- **Data**: Backup/restore and RPO/RTO if applicable?

## Security & compliance

- **Auth**: Who can access? SSO, API keys, scope?
- **Data**: PII/sensitive? Encryption at rest/transit? Retention?
- **Audit**: Any logging or audit requirements?

Use only the bullets that apply; combine with the main Quick Question Bank and risk triage in SKILL.md.
