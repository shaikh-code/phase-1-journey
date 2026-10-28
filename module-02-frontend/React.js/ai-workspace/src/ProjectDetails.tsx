import { useParams, Link } from "react-router-dom"
import { useState } from "react"

import TaskStrip from "./TaskStrip"
import type { Project, Task } from "./types"
import { type SubmitEvent } from "react"


function ProjectDetails({
  projects,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}: {
  projects: Project[]
  tasks: Task[]
  onAddTask: (projectId: number, title: string) => void
  onToggleTask: (id: number) => void
  onDeleteTask: (id: number) => void
}) {
  // Hooks must stay above the early return
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [taskError, setTaskError] = useState("")

  const { id } = useParams()
  const project = projects.find((project) => project.id === Number(id))

  if (!project) {
    return (
      <>
        <div className="page-head">
          <h1>Project not found</h1>
        </div>
        <Link className="back-link" to="/">
          Back to all projects
        </Link>
      </>
    )
  }

  const handleSubmitTask = (e:SubmitEvent) => {
    e.preventDefault()
    const trimmed = newTaskTitle.trim()
    if (!trimmed) {
      setTaskError("Task title can't be empty")
      return
    }
    onAddTask(project.id, trimmed)
    setNewTaskTitle("")
    setTaskError("")
  }

  const projectsTasks = tasks.filter((task) => task.projectId === project.id)
  const doneCount = projectsTasks.filter((task) => task.completed).length

  return (
    <div>
      <Link className="back-link" to="/">
        Back to all projects
      </Link>

      <div className="page-head">
        <h1>{project.name}</h1>
        <span className={`tag ${project.status}`}>{project.status}</span>
      </div>
      {project.description && (
        <p className="project-desc">{project.description}</p>
      )}

      <h2 className="section-title">Tasks</h2>

      {projectsTasks.length > 0 && (
        <div className="progress-line">
          <TaskStrip tasks={projectsTasks} />
          <p className="muted">
            {doneCount} of {projectsTasks.length} done
          </p>
        </div>
      )}

      <div className="toolbar">
        <form className="add-row" onSubmit={handleSubmitTask}>
          <input
            type="text"
            aria-label="New task title"
            placeholder="What needs doing?"
            value={newTaskTitle}
            onChange={(e) => {
              setNewTaskTitle(e.target.value)
              setTaskError("")
            }}
          />
          <button className="btn btn-primary" type="submit">
            Add a task
          </button>
        </form>
      </div>
      {taskError && <p className="error">{taskError}</p>}

      {projectsTasks.length === 0 && (
        <p className="empty">No tasks yet. Add the first one above.</p>
      )}

      {projectsTasks.length > 0 && (
        <ul className="task-list">
          {projectsTasks.map((task) => (
            <li className="task" key={task.id}>
              <div className={`task-main ${task.completed ? "completed" : ""}`}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                  />
                  <span className="task-title">{task.title}</span>
                </label>
                <button
                  className="link-btn danger"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
              <span className={`task-state ${task.completed ? "done" : ""}`}>
                {task.completed ? "Completed" : "Active"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProjectDetails