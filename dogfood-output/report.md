# Dogfood Report - fusion-starter

**Target URL:** http://localhost:3000
**Date:** Wednesday, June 10, 2026

## Summary

| Severity | Count |
|----------|-------|
| Critical | 1     |
| Major    | 0     |
| Minor    | 2     |

---

## Findings

### ISSUE-001: Signup "Continue" button non-functional on click (Critical)
**Description:** On the signup page, clicking the "Continue" button does not submit the form or trigger navigation, even when all fields are valid. The form only submits if the user presses "Enter" while focused on an input field.
**Severity:** Critical
**Repro Steps:**
1. Navigate to http://localhost:3000/signup
2. Fill in valid First Name, Last Name, Email, and Password.
3. Click the "Continue" button.
4. Observe that nothing happens (no navigation, no error message).
5. Press "Enter" in the password field.
6. Observe that the form submits and navigates to the next page.
**Evidence:**
- [Signup Screenshot](./screenshots/signup-validation.png)
- [Repro Result](./screenshots/issue-001-result.png)

### ISSUE-002: AI Refinement lowercases name in Hero section (Minor)
**Description:** When using the "Refine with AI" feature in the onboarding flow, the resulting hero section heading lowercases the user's name (e.g., "QA" becomes "qa").
**Severity:** Minor
**Repro Steps:**
1. Complete signup and reach the Work Experience section.
2. Enter "QA Tester" as the role and click "Refine with AI".
3. Reach the Theme Styles page.
4. Observe the preview hero section says "Hey, qa here" instead of "Hey, QA here".
**Evidence:**
- [Theme Styles Preview](./screenshots/publish.png)

### ISSUE-003: Signup/Login form state persists across navigation (Minor)
**Description:** Toggling between "Sign in" and "Sign up" pages does not clear the form inputs, which can be confusing for users who want a fresh start or mistakenly entered data in the wrong form.
**Severity:** Minor
**Repro Steps:**
1. Navigate to http://localhost:3000/signup
2. Fill in some data.
3. Click "Sign in" to go to the login page.
4. Observe the data is still present in the fields (mapped to login fields where applicable).
5. Click "Sign up" to go back.
6. Observe the data persists.
**Evidence:**
- (Observed during testing)

---

## Conclusion
The application is mostly functional but has a critical friction point in the signup flow that could prevent less technical users from registering. The editor and publishing flows work well, though AI content refinement could be more sensitive to capitalization.
