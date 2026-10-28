import type { Task } from "./types"

// One small square per task: filled when the task is done.
function TaskStrip({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) return null

  const done = tasks.filter((task) => task.completed).length

  return (
    <div
      className="strip"
      role="img"
      aria-label={`${done} of ${tasks.length} tasks done`}
    >
      {tasks.map((task) => (
        <span key={task.id} className={task.completed ? "cell done" : "cell"} />
      ))}
    </div>
  )
}

export default TaskStrip