 export type Project = {
  id: number
  name: string
  description: string
  status: "active" | "completed" | "paused"
}

 export type Task = {
  id: number
  projectId: number
  title: string
  completed: boolean
}
export type DashboardProps = {
  projects:Project[];
  tasks:Task[]
}