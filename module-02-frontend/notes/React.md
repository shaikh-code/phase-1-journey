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

# React Concepts — Notes

## 1. React Events

### What Are Events?
- Events are user actions, such as clicking, typing, or submitting a form.
- Event handlers are functions that run in response to these actions.

### Common Events
- `onClick` — handles clicks.
- `onChange` — handles input changes.
- `onSubmit` — handles form submission.

### Important Points
- React event names use camelCase.
- Pass a function using `onClick={handleClick}`.
- Use `onClick={() => handleClick(id)}` to pass arguments.
- `event.preventDefault()` prevents the browser's default action, such as a form refreshing the page.

### Core Logic
- Event occurs → handler runs → action happens → UI updates if necessary.

## 2. Controlled Inputs & Forms

### Controlled Inputs
- A controlled input gets its value from React state.
- `value` determines what appears in the input.
- `onChange` updates the state when the user types.
- `e.target.value` reads the current input value.

### Forms
- `onSubmit` handles form submission.
- `event.preventDefault()` prevents the default page refresh.
- Use `checked` instead of `value` to control a checkbox's checked state.

### Important Syntax
- `value={state}`
- `onChange={(e) => setState(e.target.value)}`
- `onSubmit={handleSubmit}`

### Core Logic
- State controls input → user types → state updates → input displays the updated value.

## 3. Conditional Rendering

### What Is It?
- Displaying different UI depending on a condition.

### Methods
- Ternary — `condition ? A : B`
  - Use when you need one output for true and another for false.
- Logical AND — `condition && A`
  - Use when you want to display something only when the condition is true.
- Early return — `if (condition) return ...`
  - Use when the entire component's output depends on a condition.

### Important Points
- JSX supports expressions inside `{ }`, not ordinary `if/else` statements directly.
- Be careful with `0 && ...` because React may display `0`.
- Use meaningful conditions to avoid unexpected UI.

### Core Logic
- Check condition → select the appropriate UI → React renders it.

## 4. Lists & Keys

### Rendering Lists
- Use `map()` to convert array items into UI elements.
- Each item can produce a component or JSX element.

### Keys
- Keys help React identify list items between renders.
- Use stable, unique IDs whenever possible.
- Keys should be unique among siblings.
- Avoid array indexes when items may be added, deleted, or reordered.
- Do not generate random keys during rendering.

### Important Syntax
- `array.map((item) => ...)`
- `key={item.id}`

### Core Logic
- Array → `map()` → UI elements → keys help React track each item.

## 5. Lifting State / Data Flow

### Lifting State Up
- Moving state to the nearest common parent when multiple components need the same data.
- Prevents related components from maintaining separate, inconsistent copies of shared state.

### Data Flow
- Parent → Child: data passes through props.
- Child → Parent: child calls a function provided by the parent.
- Sibling → Sibling: shared data is managed by their common parent.

### Important Points
- Props are read-only.
- A child cannot directly modify its parent's state.
- A child can request an update by calling a callback passed through props.
- Keep state in the lowest common component that needs to manage it.

### Core Logic
- Parent owns shared state → passes data and callbacks through props → children use them.

## 6. useEffect + APIs

### useEffect
- `useEffect` synchronizes a component with external systems, such as APIs, timers, and event listeners.

### Dependency Array
- No array — effect runs after every committed render.
- `[]` — effect runs after the initial mount.
- `[value]` — effect runs after the initial mount and when `value` changes.

### Fetch API Workflow
- `fetch(url)` sends a request.
- `await` waits for the Promise.
- `response.ok` checks whether the HTTP response indicates success.
- `response.json()` parses the response body as JSON.
- Store the resulting data in state when it needs to appear in the UI.

### Important Points
- `fetch()` does not automatically reject for HTTP errors such as 404; check `response.ok`.
- Use `try/catch` to handle request or parsing errors.
- Do not make the effect callback itself `async`.
- Use cleanup functions for effects that create timers or event listeners.
- React Strict Mode may run effects an extra time in development.

### Important Syntax
- `useEffect(() => {}, [])`
- `useEffect(() => {}, [value])`
- `return () => cleanup()`

### Core Logic
- Effect starts request → response arrives → data enters state → React updates the UI.

## 7. Loading / Error / Empty States

### Three Essential States
- Loading — request is in progress.
- Error — request failed.
- Empty — request succeeded, but there is no data to display.

### Important Points
- Use state to track loading, errors, and fetched data.
- Set loading to false after the request succeeds or fails.
- Use `try/catch/finally` to manage request flow.
- Check loading and error before displaying normal content.
- An empty result is not the same as a failed request.
- Provide a retry action when appropriate.

### Core Logic
- Request starts → loading → success or failure → display data, empty state, or error.

## 8. useRef, Context & Custom Hooks

### A. useRef

- Stores a value between renders without triggering a re-render when the value changes.
- Commonly used to access DOM elements or store timer IDs.
- `ref={inputRef}` connects a ref to a DOM element.
- `inputRef.current` accesses the referenced element.
- Use state when a value needs to update the UI; use a ref when it does not.

### Core Logic
- State changes can trigger re-renders; changing `ref.current` does not.

### B. Context API

- Context shares data with components without passing props through every intermediate component.
- `createContext()` creates a context.
- A provider supplies a value to its descendants.
- `useContext()` reads the nearest matching provider's value.
- Common uses include themes, authentication, and shared user information.
- Context does not replace state; state can manage the value provided by Context.

### Important Syntax
- `createContext()`
- `<MyContext.Provider value={value}>`
- `useContext(MyContext)`

### Core Logic
- Provider supplies shared data → descendant components access it through Context.

### C. Custom Hooks

- Custom Hooks are functions that reuse React logic across components.
- Their names must begin with `use`, such as `useCounter` or `useUsers`.
- They can use other Hooks and return values or functions.
- Each call normally has its own independent state.
- Call Hooks only at the top level of components or other Custom Hooks, not inside conditions, loops, or event handlers.

### Core Logic
- Extract reusable logic → place it in a Custom Hook → use it in multiple components.

## 9. Routing

### What Is Routing?
- Routing connects a URL to the component that should be displayed.
- Example paths: `/`, `/about`, `/users/42`.

### React Router
- `BrowserRouter` — enables browser-based routing.
- `Routes` — groups route definitions.
- `Route` — connects a URL path to a component.
- `Link` — navigates between routes without a normal full-page link navigation.
- `useParams()` — reads dynamic route parameters.

### Important Syntax
- `<Route path="/" element={<Home />} />`
- `<Link to="/about">About</Link>`
- `useParams()`

### Important Points
- A route usually displays a component within the same application, not a separate HTML document.
- Dynamic paths use parameters, such as `/users/:id`.
- Add a not-found route to handle unknown URLs.
- Configure your hosting server to support direct navigation to client-side routes.

### Core Logic
- URL changes → router matches a route → corresponding component renders.

## Final Understanding

- Events handle user actions.
- Controlled inputs connect form values to state.
- Conditional rendering decides what appears.
- Lists turn arrays into UI; keys help React track items.
- Lifting state up allows components to share data.
- useEffect synchronizes React with external systems.
- Loading, error, and empty states handle different request outcomes.
- useRef stores values without triggering re-renders.
- Context shares data across a component tree.
- Custom Hooks reuse logic.
- Routing connects URLs to components.