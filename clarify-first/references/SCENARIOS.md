# Clarify First — Scenarios

## 1. Bug Reports
*   **Missing Repro**: User says "It crashes" but gives no logs/code. -> **Ask for logs.**
*   **Environment Mismatch**: User says "It works on my machine" but fails in CI. -> **Ask for diffs.**
*   **Vague Error**: "500 Error". -> **Ask for stack trace.**

## 2. Feature Requests (RFCs)
*   **XY Problem**: User asks for "A" (Solution) but really needs "B" (Problem Solved). -> **Clarify the underlying need.**
*   **Scope Creep**: Request grows vague ("also add auth"). -> **Ask to separate tasks.**
*   **Design Choice**: "Add a chart." -> **Ask: Bar? Line? Pie? Library?**

## 3. NFRs (Non-Functional Requirements)
*   **Performance**: "Make it fast." -> **Define "fast" (ms/RPS).**
*   **Scale**: "It needs to scale." -> **100 users or 1M users?**
*   **Security**: "Make it secure." -> **Auth? Encryption? Compliance?**

## 4. High-Risk Operations (Critical)
*   **Deployment**: "Deploy this to prod." -> **Clarify: Canary? Blue/Green? Downtime allowed?**
*   **Data Migration**: "Migrate the schema." -> **Clarify: Backwards compat? Data loss acceptable during migration? Rollback plan?**
*   **Incident Response**: "System is down! Fix it!" -> **Time-pressure scenario. Bias toward read-only investigation first. Ask only 1 blocking question: Rollback to last known good, or fix forward? Then act.**
*   **Secrets**: "Update the API keys." -> **Clarify: Storage location? Rotation policy?**