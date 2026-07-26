# JavaScript — JSX, Components & Props

## What is JSX?
A syntax extension that lets you write HTML-like code inside JavaScript. Not valid JS by itself  it gets compiled (via Babel) into `React.createElement()` calls.

---

## JSX Rules
- Must return **one single root element** (or use a Fragment `<>...</>`)
- Use `className` instead of `class`
- Use `camelCase` for attributes  `onClick`, `tabIndex`, `htmlFor`
- Every tag must be **closed**  `<img />`, `<br />`
- Embed JS expressions using curly braces `{ }`
- No `if` statements inside `{ }`  use ternary or `&&` instead

```js
const element = <h1>Hello, {name}</h1>;             // embed expression
{isLoggedIn ? <p>Welcome</p> : <p>Login</p>}         // conditional
{isLoggedIn && <p>Welcome</p>}                       // short-circuit
<>
  <h1>Title</h1>
  <p>Text</p>
</>                                                   // fragment (no extra div)
```

---

## Components
A function that returns JSX. The building block of a React UI.

- Name must start with a **capital letter**
- Must **return** JSX (or `null`)
- Reusable anywhere, as many times as needed
- Function components (modern) vs Class components (old, rarely used)

```js
function Greeting() {
  return <h1>Hello there!</h1>;
}

const Greeting = () => <h1>Hello there!</h1>;   // arrow version

<Greeting />                                     // usage
```

---

## Props
Short for properties. How you pass data from a parent component into a child.

- Passed like HTML attributes  `<Card title="Hello" />`
- Received as a **single object** in the function parameter
- Can be **destructured** directly in the parameter
- Props are **read-only**  a component can't modify its own props
- Default values work with `=` in destructuring
- Can pass any data type  strings, numbers, arrays, objects, functions, even JSX (`children`)

```js
function Card(props) {
  return <h2>{props.title}</h2>;
}

function Card({ title, price = 0 }) {          // destructured + default
  return <h2>{title} - {price}</h2>;
}

<Card title="Laptop" price={999} />             // passing props

function Card({ children }) {                   // children prop
  return <div>{children}</div>;
}
<Card><p>Nested content</p></Card>
```

---

## Most Important Rules
> - JSX must have **one root element**  wrap multiple elements in a Fragment
> - Components **always** start with a capital letter
> - Props flow **one-way**: parent → child, never the other way
> - Props are **read-only**  never mutate `props` inside a component
> - `children` is just a special prop  whatever is nested between tags

## Practice Exercise

Built a small multi-component demo app to apply JSX/props concepts:
- `Header` — title/subtitle props
- `Profile` — renders a single user object via props
- `StatCard` — reusable stat block driven by an array (`stats.map()`)
- `UserCard` — reusable developer card with a `skills` array rendered via nested `.map()`

Reinforced passing objects/arrays as props, destructuring in function parameters, and rendering lists with proper `key` usage.