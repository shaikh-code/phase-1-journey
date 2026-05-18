

const todoForm = document.getElementById("todoForm")
const input = document.getElementById("taskInput")
const taskList = document.getElementById("taskList")
const cancelBtn = document.getElementById("cancelBtn")



let tasks = []
let editingId = null
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    // console.log("submitted")
 
    const val = input.value.trim()
    if(!val){
        return 
    }
  if(editingId !== null){
    console.log("saving edit",val,editingId)
    saveEdit(val)
  }
  else{
    addTask(val)
  }
  input.value =""
})

function addTask(text){
     const taskObj = {
        id: Date.now(),
        text:text ,
        completed: false
     }
     tasks.push(taskObj)
    console.log(tasks)
    renderTask()

}


function renderTask (){
    taskList.innerHTML = "";
    tasks.forEach((taskObj) =>{
          
  const li = document.createElement("li")

  const checkbox = document.createElement("input")

  checkbox.type = "checkbox"
  checkbox.dataset.id = taskObj.id
  checkbox.checked = taskObj.completed

  const span = document.createElement("span")
  span.innerText = taskObj.text

 if (taskObj.completed) {
    li.classList.add("completed")
} else {
    li.classList.remove("completed")
}
  const editBtn = document.createElement("button")
  editBtn.innerText = "Edit"
  editBtn.dataset.id = taskObj.id

  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "Delete"
  deleteBtn.dataset.id = taskObj.id

  li.append(checkbox)
  li.append(span)
  li.append(editBtn)
  li.append(deleteBtn)

  taskList.append(li)

          
    })
 
}

function deleteTask (id){
     tasks =  tasks.filter(task =>{
       return task.id !== Number(id)
     })
     renderTask()

}

taskList.addEventListener("click",(e)=>{
    console.log(e.target)
    if(e.target.tagName === "BUTTON" && e.target.innerText === "Delete"){
    const id = e.target.dataset.id
    deleteTask(id)
    }

    else if(e.target.type === "checkbox"){
        const id = e.target.dataset.id
        toggleTask(id)
    }
    else if(e.target.tagName === "BUTTON" && e.target.innerText === "Edit"){
        const id = e.target.dataset.id
        editTask(id)
    }

   
})

function toggleTask(id){
    console.log("toggle called", id)
   tasks =tasks.map(task => {
    if(task.id === Number(id)){
        return {...task, completed : !task.completed}
    }
    return task
   })
   console.log(tasks)
   renderTask()
}

function editTask(id){
   const  task = tasks.find((task)=>{
      return  task.id  === Number(id)
    })
    input.value = task.text
    editingId = task.id
    cancelBtn.style.display = "block"
   

}

function saveEdit(val){
    tasks = tasks.map(task => {
        if(task.id === editingId){
            return {...task, text : val}
        
        }
        else {
            return task
        }

    })
            editingId = null


    renderTask()

}

cancelBtn.addEventListener("click",()=>{
    editingId = null
    input.value = ""
    cancelBtn.style.display = "none"


})
