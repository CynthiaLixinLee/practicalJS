//==============================================================================
//VER 4 - LOOPS OF LOGIC
var todoList = {
  todos: [],

  addToDo: function(todoText) {
    this.todos.push({
      todoText: todoText, //name of preperty: the parameter in the function
      completed: false
    });
  },
  changeToDo: function(position, todoText) { //newValue changed to todoText
    this.todos[position].todoText = todoText
  },
  removeToDo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position]; //got the variable here to avoid repeating this line of code twice
    todo.completed = !todo.completed;
  },
  toggleAll: function (){
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    this.todos.forEach(function(todo) {
      if (todo.completed === true) {   //Refers to 'todo' instead of 'i' in a for loop
      completedTodos++;
      }
    })

    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else{
        todo.completed = true;
      }
    });
  }
};

////// GETTING DATA FROM INPUTS
var handlers = {
  addToDo: function () {
    var addToDoTextInput = document.getElementById('addToDoTextInput');
    todoList.addToDo(addToDoTextInput.value);
    addToDoTextInput.value = '';
    view.displayToDos();
  },
  changeToDo: function () {
    var changeToDoPositionInput = document.getElementById('changeToDoPositionInput');
    var changeToDoTextInput = document.getElementById('changeToDoTextInput');
    todoList.changeToDo(changeToDoPositionInput.valueAsNumber, changeToDoTextInput.value);
    changeToDoPositionInput.valueAsNumber = '';
    changeToDoTextInput.value = '';
    view.displayToDos();
  },
  // deleteToDo: function () {   (Removed once the delete button is activated)
  //   var deleteToDoPositionInput = document.getElementById('deleteToDoPositionInput');
  //   todoList.removeToDo(deleteToDoPositionInput.valueAsNumber);
  //   deleteToDoPositionInput.value = '';
  //   todoList.removeToDo(deleteToDoPositionInput.valueAsNumber);
  //   view.displayToDos();
  },
  deleteToDo: function (position) {
    todoList.removeToDo(position);
    view.displayToDos();
  },
  toggleCompleted: function () {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayToDos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayToDos();
  }
};

//Displays the todo list on the web pagw
var view = {
  displayToDos: function() {
    var todosUl = document.querySelector('ul'); //Finds the ul element
    todosUl.innerHTML = ''; //clears out the HTML

    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

        if (todo.completed === true) {
          todoTextWithCompletion = '(x) ' + todo.todoText;
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText;
        }

      todoLi.id = position; //Allocates an id that is equal to that position
      todoLi.textContent = todoTextWithCompletion; // accessing the text content, and sets it to each todoLi
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this); // 'this is from the view function. It needed to be added to the callback function'
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton'
    return deleteButton;
  },
  setUpEventLIsteners: function () {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      // Get the element that was clicked on
      var elementClicked = event.target;
      // Check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        // parseInt turns the ID of te parent into a number
        handlers.deleteToDo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventLIsteners();
