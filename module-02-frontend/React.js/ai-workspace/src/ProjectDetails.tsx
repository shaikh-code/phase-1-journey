import { useParams, Link } from "react-router-dom"
import { useState } from "react"

import type { Project, Task } from "./types"


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
    return <p>no project found</p>
  }

  const handleSubmitTask = () => {
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

  return (
    <div>
      <h1>Project details</h1>
      <p>{project.name}</p>
      <p>{project.description}</p>
      <p>{project.status}</p>
      <Link to="/">back to projects</Link>

      <h2>Tasks</h2>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => {
          setNewTaskTitle(e.target.value)
          setTaskError("")
        }}
      />
      <button onClick={handleSubmitTask}>Add a task</button>
      {taskError && <p>{taskError}</p>}

      {projectsTasks.length === 0 && <p>no tasks yet</p>}

      {projectsTasks.map((task) => (
        <div key={task.id}>
          <div className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            <p>{task.title}</p>
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
          {task.completed ? <p>Completed</p> : <p>Active</p>}
        </div>
      ))}
    </div>
  )
}

export default ProjectDetails