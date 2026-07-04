const todoForm = document.getElementById("todoForm")
const input = document.getElementById("taskInput")
const taskList = document.getElementById("taskList")

const filterBtn = document.querySelectorAll(".filterBtn")

// Stores all tasks
let tasks = [];

let currentFilter = "all"



// Form submit
todoForm.addEventListener("submit",(e)=>{

    // Prevent page refresh
    e.preventDefault();

    const val = input.value.trim();

    // Stop if input empty
    if(!val){
        return
    }

    addTask(val)

})



// Add new task
function addTask(text){

    const taskObj = {
        id: Date.now(), // unique id
        text: text,
        completed: false
    }

    // Add into array
    tasks.push(taskObj)

    // Clear input
    input.value = ""

    renderTask()

}



// Event delegation
taskList.addEventListener("click", (e)=>{

    // Delete button
    if(
        e.target.tagName === "BUTTON" &&
        e.target.classList.contains("Delete")
    ){

        const id = e.target.parentElement.dataset.id

        deleteTask(id)
    }


    // Checkbox click
    if(e.target.type === "checkbox"){

        const id = e.target.parentElement.dataset.id

        toggleTask(id)
    }

})




function renderTask(){

   // Filter tasks
   const filteredTask = tasks.filter((task)=>{

        if(currentFilter === "active"){

            return task.completed === false

        }else if(currentFilter === "completed"){

            return task.completed === true

        }else{

            return true
        }
   })


    // Clear old UI
    taskList.innerHTML = "";


    // Empty state message
    if(filteredTask.length === 0){

        const p = document.createElement("p")

        switch (currentFilter) {

            case "all":
                p.innerText = "no tasks"
                break;

            case "active":
                p.innerText = "no active tasks"
                break;

            case "completed":
                p.innerText = "no completed tasks"
        }

        taskList.append(p)

        return;
    }



    // Loop tasks
    filteredTask.forEach((taskObj) =>{

        const li = document.createElement("li")

        li.innerText = taskObj.text

        // Store task id
        li.dataset.id = taskObj.id

        taskList.append(li)
      

        // Delete button
        const deleteBtn = document.createElement("button")

        deleteBtn.innerText = "delete"

        deleteBtn.classList.add("Delete")

        li.append(deleteBtn)



        // Checkbox
        const checkbox = document.createElement("input")

        checkbox.type = "checkbox"

        checkbox.checked = taskObj.completed

        li.prepend(checkbox)



        // Completed class
        if(taskObj.completed){

            li.classList.add("completed")

        }else{

            li.classList.remove("completed")
        }



        // Edit elements
        const input2 = document.createElement("input")

        const save = document.createElement("button")

        const edit = document.createElement("button")

        const cancel = document.createElement("button")



        save.textContent = "Save"

        edit.textContent = "Edit"

        cancel.textContent = "Cancel"



        // Hide initially
        input2.style.display= "none"

        save.style.display= "none"

        cancel.style.display= "none"        



        li.append(input2)

        li.append(save)

        li.append(edit)

        li.append(cancel)
          


        // Edit click
        edit.addEventListener("click",()=>{

            input2.style.display = "block"

            save.style.display = "block"

            cancel.style.display = "block"

            edit.style.display = "none"

            input2.value = taskObj.text

        })
     


        // Cancel click
        cancel.addEventListener("click",()=>{

            input2.style.display = "none"

            save.style.display = "none"

            cancel.style.display = "none"

            edit.style.display = "block"

            input2.value = taskObj.text

        })


        // Save click
        save.addEventListener("click",()=>{

            input2.style.display = "none"

            save.style.display = "none"

            cancel.style.display = "none"

            edit.style.display = "block"

            updatedTask(taskObj.id, input2.value)

        })

    })

}



function deleteTask(id){

    // Remove matching task
    tasks = tasks.filter(task =>{

        return task.id !== Number(id)

    })

    renderTask()

}



function toggleTask(id){

   // Toggle completed state
   tasks = tasks.map(task =>{

        if(task.id === Number(id)){

            return {
                ...task,
                completed: !task.completed
            }

        }else{

            return task;
        }

    })

    renderTask()

}



function updatedTask(id,newText){

    // Update task text
    tasks = tasks.map(task=>{

        if(task.id === Number(id)){

            return {
                ...task,
                text:newText
            }

        }else{

            return task
        }
    })

    renderTask()

}



// Filter buttons
filterBtn.forEach((btn)=>{

    btn.addEventListener("click",(e)=>{

        switch (e.target.id){

            case "filterAll":
                currentFilter = "all";
                break;

            case "activeFilter":
                currentFilter = "active"
                break;

            case "completedFilter":
                currentFilter = "completed"
                break;
        }

        renderTask()
    })
})