## Day 01
- Learned: HTTP basics
- Practiced: API request in Postman
- Problem: didn’t understand JSON deeply
- Fix: created sample JSON file

 ## Day 02
Learned: Semantic HTML structure and proper use of layout tags (header, main, section, article, footer)
Practiced: Building a basic webpage layout using HTML and applying Flexbox for navbar and card layout
Problem: Initial confusion between semantic tags and overuse of <div>
Fix: Replaced generic structure with proper semantic elements and followed clean layout hierarchy

## Day 3-4

Topic: JavaScript — Destructuring, Spread & Rest Operator

What I Learned:
- Object and array destructuring
- Renaming and default values while destructuring
- Nested object destructuring
- Spread operator for copying and merging
- Rest operator for collecting remaining elements
- Spread as function arguments

What I Practiced:
- Isolated drills on each concept
- Mini project: Student Result Processor

Mini Project:
- Pure JS, no frameworks
- Processed student data using all concepts learned
- Covered nested destructuring, spread overrides, array merging, summary object building


## Days 5–7 (Combined) | Sick Days — Stayed Consistent

---

## What I Covered

### Topics
- Variables & Data Types
- Operators
- Conditionals
- Loops

---

## Key Concepts Learned

### Variables & Data Types
- `const` by default, `let` when value changes, never `var`
- `const` is non-reassignable  not immutable. Object properties can still change
- `var` is function-scoped and hoisted as `undefined` causes silent bugs
- 7 primitives: string, number, boolean, null, undefined, symbol, bigint
- `null` = intentional absence. `undefined` = JS assigned automatically
- `typeof null === "object"` is a JS bug — null is not an object

### Operators
- `===` checks value AND type  always use this. `==` coerces types  avoid it
- `+` with a string = concatenation. `-`, `*`, `/` always force number conversion
- `&&` returns first falsy value or last value if all truthy
- `||` returns first truthy value or last value if all falsy
- `??` only falls back on `null` or `undefined`  safer than `||` when `0` or `""` are valid values

### Conditionals
- Only one block runs in an `if/else` chain  stops at first match
- `switch` uses `===` internally. Always add `break`  forgetting it causes fall-through
- The 6 falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`
- Everything else is truthy — including `[]`, `{}`, `"0"`, `"false"`

### Loops
- `for`  when count is known
- `while`  when condition-based. Must update counter inside body or infinite loop
- `do...while`  guaranteed to run at least once
- `for...of`  values of arrays and iterables
- `for...in`  keys of objects only, never on arrays
- `break` exits the loop immediately. `continue` skips current iteration
- In nested loops `break` only exits the inner loop  outer keeps going
- Each outer loop iteration creates a fresh inner loop



