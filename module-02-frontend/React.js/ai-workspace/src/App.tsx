import { Routes, Route, Link } from "react-router-dom"
import ProjectDetails from "./ProjectDetails"
import { useState } from "react"

type Project = {
  id: number
  name: string
  description: string
  status: "active" | "completed" | "paused"
}

type Task = {
  id: number
  projectId: number
  title: string
  completed: boolean
}

function App() {
  const [newProjectName, setNewProjectName] = useState("")
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

  //  Task handlers 
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

  //  Project handlers
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

  function handleAddProject() {
    const trimmed = newProjectName.trim()
    if (!trimmed) return
    setProjects((prev) => [
      ...prev,
      { id: Date.now(), name: trimmed, description: "", status: "active" },
    ])
    setNewProjectName("")
  }

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchItem.toLowerCase())
  )

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>My projects</h1>

              <input
                type="text"
                placeholder="type here"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <button onClick={handleAddProject}>Add project</button>
              <br />
              <br />

              <input
                type="text"
                placeholder="search Project"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />

              <p>
                {projects.length <= 1
                  ? `Total Project: ${projects.length}`
                  : `Total Projects: ${projects.length}`}
              </p>
              <p>{filteredProjects.length === 0 && "no projects found"}</p>

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
                />
              ))}
            </div>
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
      </Routes>
    </div>
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
}) {
  const isEditing = editingProjectId === project.id

  return (
    <div>
      {isEditing ? (
        <>
          <input
            value={editName}
            onChange={(e) => onEditNameChange(e.target.value)}
          />
          {editError && <p>{editError}</p>}
        </>
      ) : (
        <h1>{project.name}</h1>
      )}

      <Link to={`/projects/${project.id}`}>View details</Link>

      {isEditing && <button onClick={() => onSave(project.id)}>Save</button>}
      {isEditing && <button onClick={() => onCancel()}>Cancel</button>}

      <p>{project.description}</p>
      <p>{project.status}</p>
      <button onClick={() => onDelete(project.id)}>Delete</button>
      <button onClick={() => onEdit(project.id)}>Edit</button>
    </div>
  )
}

export default App