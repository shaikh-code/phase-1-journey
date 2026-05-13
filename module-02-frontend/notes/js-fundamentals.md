# JavaScript — Arrays, Objects, Error Handling, DOM
## Quick Reference Notes

---

# Arrays

## What is an Array?
An ordered list of values stored in a single variable. Each value has a position called an **index** starting at 0. Arrays can hold any mix of types including objects, other arrays, functions.

---

## Adding and Removing
- `push(item)`  add to end
- `pop()`  remove from end
- `unshift(item)`  add to start
- `shift()`  remove from start
- `push` and `pop` are fast. `shift` and `unshift` are slow, they reindex everything

---

## slice vs splice

| | `slice` | `splice` |
|---|---|---|
| Mutates original? | **No** | **Yes** |
| Purpose | Copy, extract | Delete, insert, replace |
| Returns | New array | Removed items |

```js
arr.slice(1, 3)       // index 1 and 2, end not included
arr.slice(-2)         // last 2 elements
arr.slice()           // full copy
arr.splice(1, 2)      // remove 2 from index 1
arr.splice(1, 0, 99)  // insert 99 at index 1
arr.splice(1, 1, 99)  // replace index 1 with 99
```

> Never use splice in React state. Always copy first with slice() or spread

---

## map, filter, reduce
All three return new arrays. None mutate the original. These replace most loops in React.

| Method | Purpose | Returns |
|---|---|---|
| `map` | Transform every element | Same length new array |
| `filter` | Keep elements matching condition | Smaller new array |
| `reduce` | Collapse into single value | Number, object, anything |

```js
nums.map(n => n * 2)
nums.filter(n => n % 2 === 0)
nums.reduce((sum, n) => sum + n, 0)
products.filter(p => p.inStock).map(p => p.name)
```

---

## Searching
- `find(fn)` returns **first matching element** or `undefined`
- `findIndex(fn)` returns **index of first match** or `-1`
- `includes(val)` returns `true` or `false`
- `some(fn)` is `true` if at least one matches
- `every(fn)` is `true` only if all match

---

## Spread and flat
```js
const copy = [...arr]             // shallow copy
const merged = [...arr1, ...arr2] // merge arrays
arr.flat()                        // flatten one level
arr.flat(Infinity)                // flatten all levels
Math.max(...nums)                 // spread as function args
```

---

## Most Important Rules
> - splice mutates, slice does not. Never mix them up in React
> - map, filter, reduce never mutate, they always return new arrays
> - find returns the element, findIndex returns the position
> - Always provide a starting value in reduce, never skip it
> - Chain methods confidently, each returns a new array for the next to work on

---
---

# Objects

## What is an Object?
An unordered collection of **key-value pairs**. Keys are strings, values can be anything. Objects represent a single entity with named properties. Arrays are for lists, objects are for one thing with multiple attributes.

---

## Shorthand and Computed Keys
```js
const name = "Moiz", age = 20;
const user = { name, age }         // shorthand, same as { name: name, age: age }
const obj = { [variable]: value }  // computed key, dynamic key name
```

---

## Object.keys / values / entries

| Method | Returns |
|---|---|
| `Object.keys(obj)` | Array of key names |
| `Object.values(obj)` | Array of values |
| `Object.entries(obj)` | Array of `[key, value]` pairs |
| `Object.fromEntries(arr)` | Converts pairs array back to object |

```js
// Loop through object
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}

// Transform object values
const boosted = Object.fromEntries(
  Object.entries(scores).map(([name, score]) => [name, score + 10])
);

// Filter object keys
const passing = Object.fromEntries(
  Object.entries(scores).filter(([name, score]) => score >= 60)
);
```

---

## Optional Chaining ?.
Safely access deeply nested properties. If anything in the chain is null or undefined it returns undefined instead of crashing.

```js
user?.address?.city                // undefined if address missing, no crash
response?.data?.user?.name         // safe nested access
arr?.[0]?.name                     // safe array index access
user?.contact?.phone ?? "No phone" // combine with ?? for fallback
```

> Without ?. accessing property on null throws TypeError. With ?. returns silent undefined

---

## Cloning

| Method | Type | Nested objects |
|---|---|---|
| `{ ...obj }` | Shallow | Still shared, changing nested in copy affects original |
| `structuredClone(obj)` | Deep | Fully independent, no shared references |

```js
const shallow = { ...original }        // nested still linked
const deep = structuredClone(original) // fully independent
```

---

## Most Important Rules
> - Object.entries + array methods + Object.fromEntries = transform any object
> - Optional chaining ?. is non-negotiable when working with API data in React
> - Spread is shallow. Use structuredClone when you need to modify nested data safely
> - Use "key" in obj to check existence, not obj.key
> - Property shorthand is used everywhere in modern JS and React, know it cold

---
---

# Error Handling

## Why it Matters
Without error handling one failed API call crashes the entire app. With it you catch the failure, respond gracefully, keep the app running.

---

## try / catch / finally
```js
try {
  // code that might fail
} catch (e) {
  console.log(e.name);    // TypeError, ReferenceError, SyntaxError etc
  console.log(e.message); // human readable description
  console.log(e.stack);   // full trace for debugging
} finally {
  // always runs, error or not, use for cleanup
}
```
- catch only runs if error is thrown
- finally always runs, even if try has a return
- Most common use is wrapping every API call and JSON.parse in try/catch

---

## throw
Always throw Error objects, never plain strings. Strings have no stack trace.

```js
throw new Error("something went wrong")
throw new TypeError("expected a number")
throw new RangeError("value out of range")
```

---

## Custom Error Classes
```js
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

throw new ValidationError("email", "Email is required");

catch (e) {
  if (e instanceof ValidationError) {
    console.log(`Field '${e.field}': ${e.message}`);
  } else if (e instanceof TypeError) {
    console.log("Type error:", e.message);
  } else {
    throw e; // rethrow unknown errors
  }
}
```

---

## Common Error Types

| Error | When it happens |
|---|---|
| `TypeError` | Wrong type, accessing property on null |
| `ReferenceError` | Variable does not exist |
| `SyntaxError` | Invalid JS, bad JSON parse |
| `RangeError` | Value out of allowed range |

---

## Most Important Rules
> - Wrap every API call, every JSON.parse, every await in try/catch
> - Always throw new Error(), never throw a plain string
> - finally for cleanup, hiding spinners, closing connections, logging
> - Use instanceof to handle different error types differently
> - Custom errors make your code self-documenting, name them after what failed

---
---

# DOM Basics

## What is the DOM?
When the browser loads HTML it creates a tree of objects representing every element. JavaScript uses the DOM API to read and manipulate that tree, changing content, styles, structure, and responding to user actions. Changes update the page instantly without reload.

---

## Selecting Elements

| Method | Returns | Use when |
|---|---|---|
| `getElementById("id")` | Single element or null | Have an ID, fastest |
| `querySelector("css")` | First match or null | Any CSS selector |
| `querySelectorAll("css")` | NodeList of all matches | Multiple elements |

```js
document.getElementById("btn")
document.querySelector(".card")
document.querySelectorAll("li")
Array.from(document.querySelectorAll("li")) // convert to array for array methods
```

---

## Reading and Changing Content

| Property | Use for |
|---|---|
| `element.textContent` | Plain text, safe and fast |
| `element.innerHTML` | HTML content, never use with user input (XSS) |
| `element.value` | Input field values |

```js
el.textContent = "New text"
el.innerHTML = "<strong>Bold</strong>"
input.value = ""
```

---

## Classes and Styles

```js
el.classList.add("active")
el.classList.remove("hidden")
el.classList.toggle("dark")       // add if absent, remove if present
el.classList.contains("active")   // true or false

el.style.backgroundColor = "navy" // camelCase
el.style.fontSize = "18px"
el.style.display = "none"         // hide
el.style.display = "block"        // show
```

> Always prefer classList over inline styles. Keep styling in CSS where it belongs

---

## Creating and Removing Elements

```js
const el = document.createElement("div")
el.textContent = "Hello"
el.classList.add("card")
parent.appendChild(el)   // add to end
parent.prepend(el)        // add to start
el.remove()               // remove, modern way
```

> Creating an element does not add it to the page. You must append it

---

## Events

```js
element.addEventListener("click", (e) => {
  console.log(e.target)   // element that triggered event
  e.preventDefault()      // stop default browser behaviour
})
```

| Event | When |
|---|---|
| `click` | Element clicked |
| `input` | Every keystroke |
| `change` | Input loses focus after change |
| `submit` | Form submitted |
| `keydown` | Key pressed |
| `DOMContentLoaded` | Page HTML fully loaded |

> Always use addEventListener. Never use inline onclick="" in HTML

---

## event.preventDefault()
Stops the browser default behaviour. Critical on form submit. Without it the page reloads, JS state is wiped, your handler never runs.

```js
form.addEventListener("submit", (e) => {
  e.preventDefault()
  // handle submission with JS
})
```

---

## Event Delegation
One listener on the parent handles events from all children. Works because events **bubble up** from child to parent automatically. Essential for dynamically added elements.

```js
ul.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    e.target.classList.toggle("done")
  }
})
```

> Without delegation dynamically added elements have no listeners. With delegation they are automatically covered.

---

## Most Important Rules
> - textContent for text, innerHTML only for HTML and never with user input
> - querySelectorAll returns NodeList, convert with Array.from() before using array methods
> - classList over inline styles, always
> - event.preventDefault() on every form submit, non-negotiable
> - Event delegation for dynamic lists, one parent listener beats hundreds of child listeners
> - Check element exists before manipulating, null access throws TypeError
> - Script at bottom of body or use defer so HTML is parsed before JS run