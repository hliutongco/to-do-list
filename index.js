let todos=[];

function addToDos(text){
  todos.push({
    ToDoText: text,
    Completed: false
  });
}

function changeToDo(id, newText){
  todos.forEach(function(todo,index){
    if(id===index){
      todo.ToDoText=newText;
    }
  });
}

function deleteToDo(id){
  todos.forEach(function(todo,index){
    if(index===id){
      todos.splice(index,1);
    }
  })
}

function toggleCompleted(id){
  todos.forEach(function(todo,index){
    if(id===index){
      todo.Completed = !todo.Completed;
    }
  })
}

function countCompleted(){
  let counter=0;
  todos.forEach(function(todo){
    if(todo.Completed===true){
      counter++; 
    }
  });
  return counter;
}

function toggleAll(){
  const counter=countCompleted();
  
  todos.forEach(function(todo){
    if(counter===todos.length){
      todo.Completed = false;
    }
    else{
      todo.Completed = true;
    }
  })
}

const view = {
  displayToDos: function(){
    const todosOl=document.querySelector("ol");
    let ToDoTextCompleted="";
    
    todosOl.innerHTML='';
    
    todos.forEach(function(todo,index){
      const todosLi=document.createElement('li');
      if(todo.Completed===true){
        ToDoTextCompleted = `[x] ${todo.ToDoText}`
      }
      else {
        ToDoTextCompleted = `[ ] ${todo.ToDoText}`
      }
      todosLi.id=index;
      todosLi.textContent=ToDoTextCompleted;
      todosLi.appendChild(view.createTextField());
      todosLi.appendChild(view.createChangeButton());
      todosLi.appendChild(view.createCheckButton());
      todosLi.appendChild(view.createDeleteButton());
      todosOl.appendChild(todosLi);
    })
  },
  createDeleteButton: function(){
    const deleteButton=document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.className="deleteButton";
    return deleteButton;
  },
  createCheckButton: function(){
    const checkButton=document.createElement("button");
    checkButton.textContent="Check";
    checkButton.className="checkButton";
    return checkButton;
  },
  createChangeButton: function(){
    const changeButton=document.createElement("button");
    changeButton.textContent="Change";
    changeButton.className="changeButton";
    return changeButton;
  },
  createTextField: function(){
    const textField=document.createElement("input");
    textField.type="text";
    return textField;
  },
  setupEventListeners: function(){
    const todosOl = document.querySelector("ol");
    todosOl.addEventListener('click', function(event) {
      const clickedEvent = event.target;
      const id=parseInt(clickedEvent.parentNode.id);
      const textValue=clickedEvent.previousSibling.value;
      if(clickedEvent.className==="deleteButton"){
        handlers.deleteToDo(id);
      }
      else if(clickedEvent.className==="checkButton"){
        handlers.toggleCompleted(id);
      }
      else if(clickedEvent.className==="changeButton" && textValue!==""){
        handlers.changeToDo(id,textValue);
      }
    })
  }
}

view.setupEventListeners();

const handlers={
  toggleCompleted: function(id){
    toggleCompleted(id);
    view.displayToDos();
  },
  toggleAll: function(){
    toggleAll();
    view.displayToDos();
  },
  addToDos: function(){
    const text=document.getElementById('addToDoText');
    if(text.value==="" || text.value==="You didn't write anything."){
      text.value="You didn't write anything.";
    }
    else{
      addToDos(text.value);
      text.value="";
      view.displayToDos();
    }
  },
  changeToDo: function(id,textValue){
    changeToDo(id,textValue);
    view.displayToDos();
  },
  deleteToDo: function(id){
    deleteToDo(id);
    view.displayToDos();
  }
};

