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


## Day 8 | Functions

---

## What I Covered
- What a function is and why it exists
- Function declarations vs function expressions
- Arrow functions  syntax, shorthand rules, implicit return
- Default parameters
- Scope  global, function, block
- Closures  how and why inner functions remember outer variables

---

## Key Concepts Understood
- Parameters are placeholders in the definition. Arguments are actual values passed when calling
- Function declarations are hoisted  can call before defining. Expressions and arrows are not
- Arrow functions have no own `this`  they inherit from surrounding scope
- Single expression arrow functions don't need `{}` or `return`
- Returning an object from arrow function requires wrapping in `()`  `id => ({ id, name })`
- Default parameters only trigger on `undefined`  not `null`, `0`, or `""`
- `var` ignores block scope and leaks out of `{}`  never use it
- Closures keep outer variables alive in memory as long as inner function exists
- Each closure is independent  calling the same factory function twice creates two separate closures with their own variables


## Days 8–13 (Combined) | Arrays → Objects → Error Handling → DOM

---

## What I Covered

### Topics
- Arrays
- Objects
- Error Handling
- DOM Basics

---

## Key Concepts Learned

### Arrays
- `splice` mutates original. `slice` does not  critical difference
- `map`  transform every element, returns new array same length
- `filter`  keep elements matching condition, returns smaller array
- `reduce`  collapse array into single value, always provide starting value
- `find` returns element, `findIndex` returns position, `-1` if not found
- `some`  at least one matches. `every`  all must match
- Spread `[...arr]` = shallow copy. Same as `slice()`
- Chain methods  `filter` then `map` then `reduce` in one expression
- Never mutate original array in React  always return new arrays

### Objects
- Property shorthand  `{ name, age }` instead of `{ name: name, age: age }`
- Computed property names  `{ [variable]: value }` for dynamic keys
- `Object.keys()` / `Object.values()` / `Object.entries()`  convert object to array to use array methods
- `Object.fromEntries()`  convert array of pairs back to object
- Optional chaining `?.`  safe access on possibly null/undefined values
- Combine with `??` for clean fallback — `obj?.prop ?? "default"`
- Spread is shallow  nested objects still shared by reference
- `structuredClone()`  correct modern way to deep clone

### Error Handling
- `try`  code that might fail
- `catch(e)`  runs only on error. `e.name`, `e.message`, `e.stack`
- `finally`  always runs  use for cleanup, logging, hiding spinners
- Always throw `new Error("message")`  never throw plain strings
- Custom error classes  extend `Error`, set `this.name`, add custom properties
- `instanceof`  check error type to handle different failures differently
- Wrap every API call and JSON parse in try/catch  non-negotiable in production

### DOM
- DOM is a browser API  JS talks to it to manipulate the page
- `querySelector` / `querySelectorAll`  most flexible, accepts any CSS selector
- `getElementById`  fastest, use when you have an ID
- `querySelectorAll` returns NodeList  convert with `Array.from()` to use array methods
- `textContent` for plain text  safer. `innerHTML` for HTML  never use with user input (XSS)
- `classList.add/remove/toggle/contains`  preferred over inline styles
- `element.style.property` uses camelCase  `backgroundColor` not `background-color`
- `createElement` + `appendChild`  create and add elements dynamically
- `element.remove()`  modern way to remove an element
- `addEventListener`  always use this, never inline `onclick=""`
- `event.preventDefault()`  stops default browser behaviour. Critical on form submit  prevents page reload so JS handles submission
- `event.target`  element that triggered the event
- Event bubbling  events travel from child up to parent automatically
- Event delegation  one listener on parent handles all child events. Works because of bubbling. Essential for dynamically added elements

---


## Days 14-15 

- two days off just revised

---

# Days 15–18 | Todo App | Vanilla HTML/CSS/JS

## What I Built
- Full todo app in vanilla HTML, CSS, JavaScript
- Add, delete, toggle complete, edit, cancel edit
## What I Learned

- Event delegation  one listener on parent handles all child clicks
- Immutable state updates  `filter()` and `map()` return new arrays, never mutate original
- Spread operator  copying objects cleanly when updating one field
- Edit flow without data loss  storing `editingId` instead of deleting and recreating task
- Scope management  listeners at top level outside render to avoid duplicate stacking

## Weak Points and Status

- Forgot to assign `filter()` / `map()` result back to array  fixed by end of project
- Typos in variable names breaking code silently  improved, still a recurring risk

---

# Days 19(Off)

# Days 20–22 | Expense Tracker | Vanilla HTML/CSS/JS

## What I Built
Add, delete, category filter, running total, localStorage persistence. All 7 chunks completed independently with hints only, zero working code given.

## What I Learned

- Single source of truth  `expenses` array drives all rendering, DOM never patched directly
- Clear then re-render  `innerHTML = ""` before every render call
- `dataset`  storing and reading expense id on DOM elements via `dataset.id`
- Type coercion trap  `dataset` always gives a string, `Date.now()` gives a number, must use `Number(id)` before comparing or delete silently fails
- `reduce()`  summing array values into a single total
- Filter without mutation  passing filtered subset to `renderExpenses(data)` without touching `expenses`
- `localStorage`  `stringify()` on save, `parse()` on load, null check before assigning
- `e.preventDefault()`  stops page refresh on form submit

## Weak Points and Status

- `if/else` validation logic written inverted  understood and fixed
- `expenses.id` written instead of `obj.id` inside `forEach()` fixed, concept clear
- `.filter()` called on DOM element instead of array  fixed
- `renderExpenses()` placed after `return` inside callback  fixed
- `JSON.stringify()` result discarded instead of passed into `setItem()`  fixed
- Stopped mid-function multiple times without completing logic  recurring, needs discipline

# Days 23–32 | JavaScript Async Fundamentals & Fetch API

## Progress Update

After completing the Expense Tracker, I took a short break from learning due to university MID exams and a few days of illness. Once I returned, I focused on strengthening my understanding of asynchronous JavaScript before moving on to React.

## GitHub User Search application

Applied the concepts by building a GitHub User Search application using the GitHub REST API. Implemented user search, fetched and displayed profile data, handled loading and error states, and reinforced the complete Fetch API workflow through a practical project.

...

# Days 33–45 | React Fundamentals: JSX, Components & Props

## Progress Update

Moved from core async JavaScript into React, starting with the fundamentals: JSX syntax, function components, and props. Focused on understanding how JSX compiles down to JS, how components are structured and reused, and how data flows from parent to child through props.

## Key Concepts Covered

- JSX syntax rules — single root element, `className`, camelCase attributes, embedding expressions with `{ }`
- Conditional rendering using ternary and `&&` instead of `if` statements inside JSX
- Function components — capital naming convention, returning JSX
- Props — passing data as attributes, destructuring in parameters, default values, read-only nature
- `children` prop — rendering nested content passed between component tags

## Next Up

State management with `useState`, handling events in React, and building a small interactive component to apply these concepts practically.