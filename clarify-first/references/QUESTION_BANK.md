# Clarify First — Question Bank

Use this toolkit to formulate **Blocking Questions**.
*   **Rule**: Pick only 1-3 questions that are *critical* for the next step.
*   **Style**: Prefer multiple-choice questions over open-ended ones to reduce user effort.

## 1. Scope & Boundaries (What is In/Out?)
*   "Do you want this change applied to **only this file** or **all similar occurrences** in the repo?"
*   "Should I implement the **full feature** now, or just a **skeleton/MVP**?"
*   "Is the scope limited to **frontend only**, or should I also mock/implement the **backend API**?"

## 2. Acceptance Criteria (Definition of Done)
*   "How should I verify this? (A: **Unit Tests**, B: **Manual Screenshot**, C: **Console Output**)"
*   "What represents success? (A: **Performance metric** < 200ms, B: **Visual match** to design, C: **Functionality** works)"
*   "For the error handling, should I **fail silently**, **log it**, or **throw an exception**?"

## 3. Constraints (Tech Stack & Environment)
*   "Are there specific library constraints? (e.g., **Lodash vs Native**, **React vs Vanilla**)"
*   "What is the target Node.js/Python version? (A: **Latest**, B: **LTS**, C: **Specific: ______**)"
*   "Must I maintain **backward compatibility** with existing clients/APIs?"

## 4. Risk & Safety (Destructive Ops)
*   "This operation will **permanently delete** data. Do you have a **backup**?"
*   "Is this environment **Production**, **Staging**, or **Local**?"
*   "If the migration fails, do you need a **rollback script** prepared?"

## 5. Context & Reproduction
*   "Can you provide a **minimal reproduction code snippet** or specific input that causes the error?"
*   "What is the **expected output** versus the **actual output** you are seeing?"
*   "Are there any **related files** or dependencies I should look at first?"

## 6. Priority & Timeline
*   "Is this a **quick fix** or a **full redesign**? (A: **Quick patch**, B: **Proper refactor**, C: **Phased approach**)"
*   "Is there a **deadline** or release date driving this? (A: **Urgent/today**, B: **This sprint**, C: **No rush**)"
*   "Should I prioritize **speed of delivery** or **long-term maintainability**?"