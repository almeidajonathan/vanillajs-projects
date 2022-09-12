const inputOnTodoArea = document.querySelector(".todo-input-area .todo-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const checkbox = document.querySelectorAll("input[type='checkbox']");

checkbox.forEach((cb) => {
    cb.addEventListener("change", function() {
        const text = cb.nextElementSibling;    
        if (this.checked) {
            text.style.textDecoration = "line-through";
        } else {
            text.style.textDecoration = "none";
        }
    })
})


       


function addTask(){
    const inputTextTask = addTaskBtn.previousElementSibling.value;
    // console.log(inputTextTask.value);
    const task = document.querySelector('.task.second-row label');
    task.innerHTML = inputTextTask;
}

addTaskBtn.addEventListener("click", addTask);