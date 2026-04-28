const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const description = document.getElementById("description");

const openFormBtn = document.getElementById("open-form");
const formSection = document.getElementById("form-section");
const frontPage = document.getElementById("front-page")
const form  = document.getElementById("task-form");
const addTaskBtn = document.getElementById("add-task");
const  taskList = document.getElementById("task-list");

const tasks =[];
let editingIndex = null;


function addTask(){
   let currTask={
    id:Date.now(),
    task:taskInput.value,
    date:dateInput.value,
    description:description.value
   };

   if(editingIndex!==null){
    tasks[editingIndex]=currTask;
    editingIndex=null;
   }else{
    tasks.push(currTask);
   }
   
   
   cleaninput();
   viewTasks();
}

const options = {
  weekday:"short",
  year:"numeric",
  month:"short",
  day:"numeric",
};

function viewTasks(){
  let HTML=""
    

    tasks.forEach(({id,task,date,description} ,index)=>{
      HTML+=`
                 <div class="task">

                 <div class="task-left">
                     <input type="checkbox" id="check-${index}"> 
                     <label for="check-${index}">${task}</label>
                 </div>
                 <div class="task-center">
                     <p>
                     <span class="clock-icon">🕒</span>
                     ${date ? new Date(date).toLocaleDateString("en-GB",options) : ""}</p>
                 </div>
                 <div class="task-right">
                     <button onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></button>
                     <button onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                 </div>
                 </div>
      `
    })
    taskList.innerHTML=HTML;

    formSection.style.display="none";
    taskList.style.display="block";
    frontPage.style.display="block";
}

function editTask(index){

  let currentTask=tasks[index];
  formSection.style.display="block";

  taskInput.value=currentTask.task;
  dateInput.value=currentTask.date;
  description.value=currentTask.description;

  taskList.style.display="none";
  frontPage.style.display="none";
  editingIndex = index;
}

function deleteTask(index){
  tasks.splice(index,1);
  viewTasks();
}


form.addEventListener("submit",(e)=>{
   e.preventDefault();
   addTask();
})
openFormBtn.addEventListener("click",()=>{
  const expanded = openFormBtn.getAttribute("aria-expanded")==="true";
  openFormBtn.setAttribute("aria-expanded", String(!expanded));
  formSection.hidden= expanded;

  frontPage.style.display="none";
  taskList.style.display="none";
});



function cleaninput(){
  taskInput.value="";
  dateInput.value="";
  description.value="";
 
}