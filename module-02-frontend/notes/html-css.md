## HTML5 + CSS Semantic Structure & Layouts

Module 02 : Frontend Engineering


Why Semantic HTML matters

Earlier people used <div> for everything, but now HTML5 gives proper tags that describe meaning, not just design.

This helps in:

Better SEO (Google understands structure)
Accessibility (screen readers rely on it)
Clean and readable code for developers
Important Semantic Tags
<header> → top part (logo, nav, intro)
<nav> → only for navigation links
<main> → main content (only one per page)
<section> → group of related content (must have heading)
<article> → independent content (can stand alone)
<aside> → sidebar or extra info
<footer> → bottom (copyright, links)
<figure> → image or diagram
<figcaption> → caption for figure
Article vs Section (easy way to think)

If you copy a block to another website:

Still makes sense → use <article>
Doesn’t → use <section>
Basic Page Structure
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page</title>
</head>
<body>

  <header>
    <nav>
      <a href="#">About</a>
      <a href="#">Projects</a>
    </nav>
  </header>

  <main>
    <section>
      <h1>Abdul Moiz</h1>
      <p>Aspiring AI Engineer</p>
    </section>

    <section>
      <h2>Projects</h2>

      <article>
        <h3>AI Document Assistant</h3>
        <p>PDF Q&A tool using AI</p>
      </article>
    </section>
  </main>

  <footer>
    <p>© 2026 Abdul Moiz</p>
  </footer>

</body>
</html>
Accessibility (very important)

Rule:
If a normal user can understand something visually, a screen reader should also understand it.

Common things to follow:

Always add alt in images
Buttons should have clear text
Inputs must have labels
Use aria-label for icon buttons
Always set <html lang="en">
Always include viewport meta

Example:

<img src="profile.jpg" alt="Profile photo">

<button aria-label="Close menu">✕</button>

<label for="email">Email</label>
<input id="email" type="email">
Day 2 — CSS Layouts
Flexbox (1D layout)

Use Flexbox when working in one direction (row OR column)

Good for:

Navbar
Buttons
Cards
Centering
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
Centering trick
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
Real-world patterns
/* Navbar */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Cards */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 280px;
}

/* Push footer down */
.card {
  display: flex;
  flex-direction: column;
}

.card-footer {
  margin-top: auto;
}
CSS Grid (2D layout)

Use Grid for full layouts (page structure)

.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
Responsive grid (no media queries needed)
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
Flexbox vs Grid (simple idea)
Flexbox → one direction
Grid → full page layout
CSS Variables
:root {
  --primary: #6C63FF;
  --radius: 8px;
}

.btn {
  background: var(--primary);
  border-radius: var(--radius);
}
Mobile First Approach

Start from mobile, then scale up.

.container {
  padding: 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
}
CSS Units (important)
rem → best for fonts & spacing
px → borders, fixed sizes
% → flexible width
vw/vh → full screen sections

Tip:
Use rem mostly. Avoid em for spacing (gets messy).

Key Points (quick revision)
Semantic HTML is important
Flexbox = 1D, Grid = 2D
Mobile-first design
Use CSS variables
Accessibility is not optional
Practice

Try making:

Basic semantic layout page
Navbar using Flexbox
Card layout
Grid-based page