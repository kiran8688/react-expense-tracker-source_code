## 2025-02-13 - Focus Visibility on Hover-only Elements
**Learning:** Hidden-on-hover actions (like delete buttons hidden with `opacity-0` until `group-hover:opacity-100`) completely break keyboard accessibility unless paired with equivalent focus states. Keyboard users tabbing through the UI would just see their focus disappear on the hidden element. Furthermore, indiscriminately adding `focus:outline-none` without `focus-visible:ring-x` fallbacks disables default browser focus rings entirely.
**Action:** When hiding elements visually until hover, always pair `group-hover:opacity-100` with `focus-visible:opacity-100`. Additionally, if replacing default focus outlines with `focus:outline-none`, always provide a custom visible focus indicator using `focus-visible:ring-2` (using a color appropriate for the component's context).

## 2025-02-13 - Currency Input Step Validation and Context
**Learning:** Using `step="1"` on native HTML5 `type="number"` inputs for currency fields prevents users from entering decimal amounts (like cents), resulting in poor UX and failed form submissions due to built-in browser validation. Additionally, inputs lacking visual currency context can be confusing.
**Action:** Always use `step="0.01"` and `placeholder="0.00"` for currency inputs to allow decimal entry. Combine this with an absolute positioned currency prefix (e.g., `₹`) inside a relative container with appropriate left-padding on the input to provide clear, immediate visual context that matches the application's locale.

## 2024-03-22 - Missing `type="button"` on Transaction Filter Buttons
**Learning:** Found an accessibility issue where transaction filter buttons ("All", "Income", "Expense") inside the `role="group"` lacked the explicit `type="button"` attribute. This could potentially cause unintended form submissions if these buttons were inside a form, though here they aren't. Still, it's best practice. The buttons used to select the transaction type ("Expense", "Income") in the form *do* need `type="button"` because they are inside a form and could accidentally submit it. I should add `type="button"` to all such toggle buttons.
**Action:** Add `type="button"` to toggle buttons to prevent unintended side-effects and improve semantic correctness. Added `aria-hidden="true"` to decorative required asterisks to improve screen reader experience.

## 2024-03-24 - Touch Device Discoverability of Hover Elements
**Learning:** When using Tailwind to hide elements behind a hover state (`group-hover:opacity-100`), it inherently makes the element invisible and inaccessible on touch devices that lack hover capabilities.
**Action:** Always provide a default visible state on small viewports (`opacity-100 sm:opacity-0 sm:group-hover:opacity-100`) or pair hover states with an explicit touch action or focus-visible state to ensure discoverability across all device types.

## 2025-02-14 - Actionable Empty States with Filters
**Learning:** Empty states caused by active filters ("No expense transactions") often lead to dead ends if the user forgets a filter is active or doesn't immediately see the filter controls. Just adding text like "Try changing your filter" is insufficient for keyboard or screen reader users.
**Action:** Always include a 1-click semantic `<button type="button">` to clear the filter directly within the empty state context itself. If no filter is active, provide a CTA to jump focus to the primary input form.

## 2025-02-15 - Orphaned List Items from Dynamic Components
**Learning:** When components render their own `role="listitem"` (e.g., `DisplaySec2.jsx`), dropping them directly into a parent container without explicitly assigning `role="list"` to that container creates "orphaned" list items. Screen readers struggle to announce these properly, failing to communicate list context or total item counts to the user.
**Action:** Whenever dynamically rendering components that define a list item role, always verify that the direct parent container explicitly declares `role="list"` along with an appropriate `aria-label` to establish proper list semantics.
