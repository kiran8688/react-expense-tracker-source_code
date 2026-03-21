
## 2025-02-13 - Focus Visibility on Hover-only Elements
**Learning:** Hidden-on-hover actions (like delete buttons hidden with `opacity-0` until `group-hover:opacity-100`) completely break keyboard accessibility unless paired with equivalent focus states. Keyboard users tabbing through the UI would just see their focus disappear on the hidden element. Furthermore, indiscriminately adding `focus:outline-none` without `focus-visible:ring-x` fallbacks disables default browser focus rings entirely.
**Action:** When hiding elements visually until hover, always pair `group-hover:opacity-100` with `focus-visible:opacity-100`. Additionally, if replacing default focus outlines with `focus:outline-none`, always provide a custom visible focus indicator using `focus-visible:ring-2` (using a color appropriate for the component's context).

## 2025-02-13 - Currency Input Step Validation and Context
**Learning:** Using `step="1"` on native HTML5 `type="number"` inputs for currency fields prevents users from entering decimal amounts (like cents), resulting in poor UX and failed form submissions due to built-in browser validation. Additionally, inputs lacking visual currency context can be confusing.
**Action:** Always use `step="0.01"` and `placeholder="0.00"` for currency inputs to allow decimal entry. Combine this with an absolute positioned currency prefix (e.g., `₹`) inside a relative container with appropriate left-padding on the input to provide clear, immediate visual context that matches the application's locale.
