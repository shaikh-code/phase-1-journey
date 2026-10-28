import { Routes, Route, Link, NavLink } from "react-router-dom"
import ProjectDetails from "./ProjectDetails"
import TaskStrip from "./TaskStrip"
import { useState ,type SubmitEvent } from "react"
import type { Project, Task, DashboardProps } from "./types"


function App() {
  const [newProjectName, setNewProjectName] = useState("")
  const [projectError,setProjectError]= useState("")
  const [searchItem, setSearchItem] = useState("")
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [editName, setEditName] = useState("")
  const [editError, setEditError] = useState("")

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, projectId: 1, title: "set up React components", completed: false },
    { id: 2, projectId: 1, title: "Build project dashboard", completed: false },
    { id: 3, projectId: 2, title: "Design the API", completed: false },
  ])

  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "AI Workspace1", description: "A workspace for AI projects", status: "active" },
    { id: 2, name: "AI Workspace2", description: "A workspace for AI projects2", status: "active" },
    { id: 3, name: "AI Workspace3", description: "A workspace for AI projects3", status: "active" },
  ])

  // Task handlers
  function handleAddTask(projectId: number, title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), projectId, title: trimmed, completed: false },
    ])
  }

  function handleToggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Deletes ONE task (filters on task.id)
  function handleDeleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // Project handlers
  // Deletes a project AND all its tasks (filters tasks on projectId)
  function handleDelete(id: number) {
    setProjects((prev) => prev.filter((project) => project.id !== id))
    setTasks((prev) => prev.filter((task) => task.projectId !== id))
  }

  function handleEdit(id: number) {
    const project = projects.find((project) => project.id === id)
    if (!project) return
    setEditingProjectId(id)
    setEditName(project.name)
    setEditError("")
  }

  function handleStatusChange(id: number, status: Project["status"]) {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, status } : project
      )
    )
  }

  function handleSave(id: number) {
    const trimmed = editName.trim()
    if (!trimmed) {
      setEditError("Project name can't be empty")
      return
    }
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, name: trimmed } : project
      )
    )
    setEditingProjectId(null)
    setEditError("")
  }

  function handleCancel() {
    setEditName("")
    setEditingProjectId(null)
    setEditError("")
  }

 function handleAddProject(e: SubmitEvent) {
  e.preventDefault()
  const trimmed = newProjectName.trim()
  if (!trimmed) {
    setProjectError("Project name can't be empty")
    return
  }
  setProjects((prev) => [
    ...prev,
    { id: Date.now(), name: trimmed, description: "", status: "active" },
  ])
  setNewProjectName("")
  setProjectError("")
}

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchItem.toLowerCase())
  )

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <span className="brand">AI Workspace</span>
          <nav className="nav">
            <NavLink to="/" end>
              Projects
            </NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </nav>
        </div>
      </header>

      <main className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="page-head">
                  <h1>Your projects</h1>
                  <p className="muted">
                    {projects.length} {projects.length === 1 ? "project" : "projects"}
                  </p>
                </div>

                <div className="toolbar">
                  <form className="add-row" onSubmit={handleAddProject}>
                  <input
                    type="text"
                    aria-label="New project name"
                    placeholder="Name a new project"
                    value={newProjectName}
                    onChange={(e) => {
                      setNewProjectName(e.target.value)
                      setProjectError("")
                    }}
                  />
                  <button type="submit" className="btn btn-primary">
                    Add project
                  </button>
                </form>
                  <input
                    className="search"
                    type="search"
                    aria-label="Search projects"
                    placeholder="Search by name"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                </div>
                 {projectError && <p className="error">{projectError}</p>}
                {projects.length === 0 && (
                  <p className="empty">Nothing here yet. Name your first project above.</p>
                )}
                {projects.length > 0 && filteredProjects.length === 0 && (
                  <p className="empty">No project matches that search.</p>
                )}

                {filteredProjects.length > 0 && (
                  <div className="project-list">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        editingProjectId={editingProjectId}
                        onEditNameChange={setEditName}
                        editName={editName}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        editError={editError}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProjectDetails
                projects={projects}
                tasks={tasks}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard projects={projects} tasks={tasks} />}
          />
          <Route
            path="*"
            element={
              <>
                <div className="page-head">
                  <h1>Page not found</h1>
                </div>
                <Link className="back-link" to="/">
                  Back to all projects
                </Link>
              </>
            }
          />
        </Routes>
      </main>
    </>
  )
}

function ProjectCard({
  project,
  onDelete,
  onEdit,
  editingProjectId,
  editName,
  onEditNameChange,
  onSave,
  onCancel,
  editError,
  onStatusChange,
}: {
  project: Project
  onDelete: (id: number) => void
  onEdit: (id: number) => void
  editingProjectId: number | null
  editName: string
  onEditNameChange: (name: string) => void
  onSave: (id: number) => void
  onCancel: () => void
  editError: string
  onStatusChange: (id: number, status: Project["status"]) => void
}) {
  const isEditing = editingProjectId === project.id

  return (
    <article className="project">
      <div className="project-top">
        <div className="project-main">
          {isEditing ? (
            <>
              <input
                className="edit-input"
                type="text"
                aria-label="Project name"
                value={editName}
                onChange={(e) => onEditNameChange(e.target.value)}
              />
              {editError && <p className="error">{editError}</p>}
            </>
          ) : (
            <h2 className="project-name">{project.name}</h2>
          )}
          {project.description && (
            <p className="project-desc">{project.description}</p>
          )}
        </div>

        <select
          className={`tag ${project.status}`}
          aria-label="Project status"
          value={project.status}
          onChange={(e) => {
            const status = e.target.value

            if (
              status === "active" ||
              status === "completed" ||
              status === "paused"
            ) {
              onStatusChange(project.id, status)
            }
          }}
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      <div className="project-actions">
        <Link className="link-btn strong" to={`/projects/${project.id}`}>
          View details
        </Link>

        {isEditing ? (
          <>
            <button className="link-btn strong" onClick={() => onSave(project.id)}>
              Save
            </button>
            <button className="link-btn" onClick={() => onCancel()}>
              Cancel
            </button>
          </>
        ) : (
          <button className="link-btn" onClick={() => onEdit(project.id)}>
            Edit
          </button>
        )}

        <button className="link-btn danger" onClick={() => onDelete(project.id)}>
          Delete
        </button>
      </div>
    </article>
  )
}

function Dashboard({ projects, tasks }: DashboardProps) {
  const totalProjects = projects.length
  const totalTasks = tasks.length

  const completedTasks = tasks.filter((task) => task.completed).length
  const incompleteTasks = tasks.filter((task) => !task.completed).length

  const completionPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  ).length
  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  ).length
  const pausedProjects = projects.filter(
    (project) => project.status === "paused"
  ).length

  return (
    <div className="dashboard">
      <div className="page-head">
        <h1>Dashboard</h1>
        <p className="muted">Where everything stands right now.</p>
      </div>

      <section className="summary">
        <p className="lead">
          {totalTasks === 0
            ? "No tasks yet."
            : `${completedTasks} of ${totalTasks} tasks done.`}
        </p>
        {totalTasks > 0 && (
          <p className="lead-sub">{Math.round(completionPercentage)}% complete</p>
        )}
        <TaskStrip tasks={tasks} />
      </section>

      <section>
        <h2 className="section-title">Projects</h2>
        <ul className="ledger">
          <li>
            <span className="swatch blank" />
            <span>All projects</span>
            <span className="leader" aria-hidden="true" />
            <strong>{totalProjects}</strong>
          </li>
          <li>
            <span className="swatch active" />
            <span>Active</span>
            <span className="leader" aria-hidden="true" />
            <strong>{activeProjects}</strong>
          </li>
          <li>
            <span className="swatch paused" />
            <span>Paused</span>
            <span className="leader" aria-hidden="true" />
            <strong>{pausedProjects}</strong>
          </li>
          <li>
            <span className="swatch completed" />
            <span>Completed</span>
            <span className="leader" aria-hidden="true" />
            <strong>{completedProjects}</strong>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="section-title">Tasks</h2>
        <ul className="ledger">
          <li>
            <span>Done</span>
            <span className="leader" aria-hidden="true" />
            <strong>{completedTasks}</strong>
          </li>
          <li>
            <span>Still to do</span>
            <span className="leader" aria-hidden="true" />
            <strong>{incompleteTasks}</strong>
          </li>
          <li>
            <span>All tasks</span>
            <span className="leader" aria-hidden="true" />
            <strong>{totalTasks}</strong>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default App