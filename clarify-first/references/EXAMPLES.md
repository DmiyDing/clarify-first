# Clarify First — Examples

## 1. Ambiguous Request (Medium Risk)
**User**: "Optimize the code."
**Agent**:
> **[RISK: MEDIUM]** - "Optimize" is subjective (speed vs. readability vs. memory).
>
> **Alignment Snapshot**:
> *   **Goal**: Improve code quality/performance.
> *   **Unknowns**: Target metric (CPU, RAM, bundle size) or maintainability?
>
> **Blocking Questions**:
> *   Q1: What is the primary goal? (A: **Runtime Speed**, B: **Memory Usage**, C: **Code Readability/Cleanup**)
> *   Q2: Are there specific hot-paths to focus on?
>
> **Options**:
> *   **A (Recommended)**: Refactor for readability and strict typing (safest).
> *   **B**: Aggressive performance optimization (might reduce readability).
>
> **Next Step**: Please confirm Option A or clarify the goal.

## 2. Conflicting Constraints (Medium Risk)
**User**: "Refactor this to be generic, but don't change any interfaces."
**Agent**:
> **[RISK: MEDIUM]** - Making code "generic" usually implies changing signatures (interfaces).
>
> **Alignment Snapshot**:
> *   **Goal**: Generalize logic.
> *   **Constraint**: Keep current interfaces identical (Backwards Compatibility).
>
> **Options**:
> *   **A (Wrapper)**: Create a new generic function and have the old interface call it (Deprecate old).
> *   **B (Overload)**: Use function overloading to support both (Complex).
> *   **C (Strict)**: Violate the constraint to make a truly clean generic API (Breaking Change).
>
> **Next Step**: I recommend **Option A** to satisfy both constraints safely. Proceed?

## 3. High Risk / Destructive (High Risk)
**User**: "Delete all users older than 1 year."
**Agent**:
> **[RISK: HIGH]** - Permanent data deletion.
>
> **Alignment Snapshot**:
> *   **Goal**: Prune old user records.
> *   **Unknown**: Is this Production? Is there a backup? Soft delete vs Hard delete?
>
> **Blocking Questions**:
> *   Q1: Is this for **Production**?
> *   Q2: Do you want **Soft Delete** (`deleted_at` flag) or **Hard Delete** (SQL `DELETE`)?
>
> **Options**:
> *   **A (Recommended)**: Generate a `SELECT` count query first to verify scope.
> *   **B**: Generate a Soft Delete script.
> *   **C**: Generate Hard Delete script (Dangerous).
>
> **Next Step**: Please confirm Q1 and Q2. I will NOT generate delete code yet.

## 4a. "Just Do It" Override (High Risk - Step 1)
**User**: "Yes, this is prod. Just do it, I don't care."
**Agent**:
> **[RISK: HIGH]** - User overrode safety check.
>
> **Confirmation**: You confirmed **Production** and requested immediate execution.
> **Final Safety Check**: I am about to generate a script that **permanently removes data**. There is no undo.
>
> **Action**: I am pausing. Please reply with **"Yes, execute"** to generate the destructive script.

## 4b. "Just Do It" Override (High Risk - Step 2)
**User**: "Yes, execute."
**Agent**:
> **Executing Action**:
>
> ```sql
> -- PRODUCTION DELETION SCRIPT — wrapped in transaction for safety
> BEGIN;
> SELECT count(*) FROM users WHERE created_at < NOW() - INTERVAL '1 year';
> -- ↑ Verify count before proceeding
> DELETE FROM users WHERE created_at < NOW() - INTERVAL '1 year';
> -- COMMIT;   -- Uncomment after verifying the count above
> ROLLBACK;    -- Safety default: rollback until explicitly committed
> ```

## 5. Low Risk (Proceed Immediately)
**User**: "Add a comment to explain this regex."
**Agent**:
> **[RISK: LOW]** - Documentation only.
>
> I've added the explanation comment to the regex pattern.
>
> ```javascript
> // Matches email addresses (User + @ + Domain + . + TLD)
> const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
> ```