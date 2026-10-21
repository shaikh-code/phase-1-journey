import { useParams,Link } from "react-router-dom";
import { useState } from "react";
 type Project = {
    id:number;
    name:string;
    description:string;
    status:"active"| "completed" | "paused";
  }
  type Task = {
    id:number;
    projectId: number;
    title:string;
    completed: boolean
  }
function ProjectDetails({
  projects,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask
}: {
  projects: Project[];
  tasks: Task[];
  onAddTask: (project: number, title: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask:(id:number)=> void
}) {
  const[newTaskTitle,setNewTaskTitle] = useState("")

  const { id } = useParams();
  const project = projects.find((project)=> project.id === Number(id))
  if(!project){
    return <p>no project found</p>
  }
  const projectsTasks = tasks.filter((task)=> task.projectId === project.id)
 
 

  return (
    <div>
     
     <h1>My projects</h1>
     <p>project id: {id}</p>
     <p>{project.name}</p>
     <p>{project.description}</p>
     <p>{project.status}</p>
      <Link to="/">back to projects</Link>
      <h2>Tasks</h2>
      <input
      type="text"
      value={newTaskTitle}
      onChange={(e)=> setNewTaskTitle(e.target.value)}
      />
      <button onClick={()=>{onAddTask(Number(id), newTaskTitle)
        setNewTaskTitle("")}
       } >Add a task</button>

       {
        projectsTasks.length === 0 && <p>no task found</p>
       }
      {/* <ProjectTask  onAddTask={handleAddTask} ></ProjectTask> */}

     
      
      {projectsTasks.map((task)=>(
        <div key={task.id}>
         <div className={task.completed? "completed":""}>
            <input
      type="checkbox"
      checked={task.completed}
      onChange={()=>onToggleTask(task.id)}
        />
        <p >{task.title}</p>
       <button onClick={()=>onDeleteTask(task.id)}>Delete</button>
         </div>
         {task.completed ? (<p>Completed</p>):(<p>Active</p>)}
      
        </div>
        
      )
      )}
     
      
    </div>
  );
}


export default ProjectDetails;