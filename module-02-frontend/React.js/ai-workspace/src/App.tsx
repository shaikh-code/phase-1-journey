import {Routes,Route,Link} from "react-router-dom"
import ProjectDetails from "./ProjectDetails";
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
function App(){
  const [newProjectName, setNewProjectName] = useState("")
  const [searchItem,setSearchItem] = useState("")
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [editName,setEditName] =  useState("")
  // console.log(editingProjectId)

//   projects is the current list.
// setProjects is how we'll update that list.
// useState<Project[]>(...) tells TypeScript that the list contains project objects.
const [tasks,setTasks] = useState<Task[]>([
 { id:1,
  projectId:1,
  title:"set up React components",
  completed:false},
   {
    id: 2,
    projectId: 1,
    title: "Build project dashboard",
    completed: false,
  },
  {
    id: 3,
    projectId: 2,
    title: "Design the API",
    completed: false,
  },
])

  const [projects, setProjects]= useState<Project[]>([
    {
    id:1,
    name:"AI Workspace1",
    description:"A workspace for AI projects",
    status:"active"
  },
  {
    id:2,
    name:"AI Workspace2",
    description:"A workspace for AI projects2",
    status:"active"
  },
  {
    id:3,
    name:"AI Workspace3",
    description:"A workspace for AI projects3",
    status:"active"
  }
    
  ])
  function handleAddTask(id:number, title:string){
    setTasks((prevTasks) => [...prevTasks, {
      id: Date.now(),
      projectId: id,
      title: title,
      completed: false
    }])
          
  } 
  function handleDeleteTask(id:number){
    setTasks(tasks.filter((task)=> task.id !== id))


  }
function handleToggleTask(id: number) {
  setTasks((prevTask)=>
    prevTask.map((task) => {
    if (task.id === id) {
        // console.log(!task.completed);
      return {
        ...task,
        completed: !task.completed
      };
    } else {
      return task;
    }
  }));
}
  function handleDelete(id:number){
    setProjects(projects.filter((project)=> project.id !== id))
  }
  function handleEdit(id:number){
    const project = projects.find((project)=> project.id === id)
    if(!project)
      return;
    setEditingProjectId(id)
    setEditName(project.name)
  }
  function handleSave(id:number){
    setProjects(projects.map((project)=>
        project.id === id 
    ?
    {...project,name:editName}
    :project
    ))
    setEditingProjectId(null)

  }
  function handleCancel(id:number){
  setEditName("")
  setEditingProjectId(null)
  }
  

const filteredProjects = projects.filter((project)=>{
    return project.name.toLowerCase().includes(searchItem.toLowerCase())
  })


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
          onChange={(e)=>{setNewProjectName(e.target.value)}}
          
         />
         <button onClick={()=>{
          if(!newProjectName.trim()){
            return 
          }
          setProjects([...projects,{
            id:Date.now(),
            name: newProjectName,
            description:"",
            status:"active"
            
          }]) 
          setNewProjectName("")
           
         }}>Add project</button>
         <br />
         <br />
         
         <input
          type="text"
           placeholder="search Project"
            value={searchItem}
             onChange={(e)=>{setSearchItem(e.target.value)}}
         />

         <p> {projects.length <=1 ? `Total Project: ${projects.length}` : `Total Projects: ${projects.length}`}</p>
         <p>{filteredProjects.length ===0 &&  "no projects found"}</p>
         {filteredProjects.map((project)=>
            <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
            onEdit={handleEdit}
            editingProjectId={editingProjectId}
            onEditNameChange= {setEditName}
            editName = {editName}
            onSave = {handleSave}
            onCancel= {handleCancel}
            />
         )}
        </div>
      }
    />
    <Route
      path="/projects/:id"
      element={<ProjectDetails 
        onAddTask={handleAddTask}
        projects={projects}
        tasks = {tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask ={handleDeleteTask}/>}
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
   onCancel
   
  }:{
    project:Project;
    onDelete:(id:number)=>void;
    onEdit:(id:number)=>void;
    editingProjectId: number | null;
    editName:string;
   onEditNameChange: (name:string)=>void
   onSave: (id:number)=>void
   onCancel: (id:number)=>void
    

  }

) {
  return (
    <div>
        
      {editingProjectId === project.id ?(
        <input value={editName} onChange={(e)=> onEditNameChange(e.target.value)}/>
      ):(
        <h1>{project.name}</h1>
      )}
        <Link to={`/projects/${project.id}`}>View details</Link>

      {editingProjectId === project.id && (
        <button onClick={()=> onSave(project.id)}>Save</button>
      )}
      {editingProjectId === project.id && (
        <button onClick={()=>onCancel(project.id)}>Cancel</button>
      )}
      <p>{project.id}</p>
      <p>{project.description}</p>
      <p>{project.status}</p>
      <button onClick={()=> onDelete(project.id)}>Delete</button>
      <button onClick={()=> onEdit(project.id)}>Edit</button>


    </div>
  )
}
export default App;